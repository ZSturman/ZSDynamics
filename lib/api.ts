import { generateRandomUserMetrics } from "./utils";
import { db } from "@/firebase/clientApp";
import { doc, setDoc, getDoc } from "firebase/firestore";



export const getRandomCommunityMembers = async (): Promise<KnownCommunityMember[] | []> => {
  try {
    const response = await fetch("/api/randomuser?results=4");
    if (!response.ok) {
      console.error(`Error fetching users: ${response.status}`);
      return [];
    }
    const data = await response.json();
    return data.results.map((userData: { name: { first: string; last: string }; picture: { large: string }; login: { uuid: string } }) => ({
      displayName: `${userData.name.first} ${userData.name.last}`,
      photoURL: userData.picture.large,
      uid: userData.login.uuid,
      userMetrics: generateRandomUserMetrics(),
    }));
  } catch (error) {
    console.error("Failed to fetch community members:", error);
    return [];
  }
};

export const fetchMyPersonalityUserFromFirebase = async (uid: string): Promise<MyPersonalityUser | null> => {
  const docRef = doc(db, "users", uid); 
  try {
    const userDoc = await getDoc(docRef);
    if (userDoc.exists()) {
      return userDoc.data() as MyPersonalityUser;
    } else {
      console.error("User not found in Firebase");
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch user from Firebase:", error);
    return null;
  }
}


export const addUserToFirebase = async (user: MyPersonalityUser): Promise<boolean> => {
  try {
    await setDoc(doc(db, "users", user.uid), user);
    return true;
  } catch (error) {
    console.error("Failed to add user to Firebase:", error);
    return false;
  }
}

export const updateUserInFirebase = async (user: MyPersonalityUser): Promise<boolean> => {
  try {
    await setDoc(doc(db, "users", user.uid), user);
    return true;
  } catch (error) {
    console.error("Failed to update user in Firebase:", error);
    return false;
  }
}
