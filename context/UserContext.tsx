"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { User } from "firebase/auth";
import {
  addUserToFirebase,
  fetchMyPersonalityUserFromFirebase,
  getRandomCommunityMembers,
  updateUserInFirebase,
} from "@/lib/api";
import { defaultUserData } from "@/data/defaultUserData";
import { generateRandomUserMetrics } from "@/lib/utils";

// Type definition for the UserContext
type UserContextType = {
  user: MyPersonalityUser | null;
  communityMembers: KnownCommunityMember[];
  loading: boolean;
  userMetrics: UserMetrics | null;
  updateUser: (updatedUser: Partial<MyPersonalityUser>) => void; 
  setUserMetrics: (updatedMetrics: UserMetrics) => void;
};

// Default context values
const defaultUserContext: UserContextType = {
  user: defaultUserData,
  communityMembers: [],
  loading: true,
  userMetrics: null,
  updateUser: () => {},
  setUserMetrics: () => {},
};

// Creating the UserContext
export const UserContext = createContext<UserContextType>(defaultUserContext);

// Type definition for UserProvider props
type UserProviderProps = {
  authUser: User | null;
  isDemoUser: boolean;
  children: React.ReactNode;
};

// UserProvider Component
export const UserProvider = ({
  authUser,
  isDemoUser,
  children,
}: UserProviderProps) => {
  const [loading, setLoading] = useState(true);
  const [communityMembers, setCommunityMembers] = useState<
    KnownCommunityMember[]
  >([]);
  const [user, setUser] = useState<MyPersonalityUser>(defaultUserData);
  const [userMetrics, setUserMetrics] = useState<UserMetrics | null>(null);
  

  useEffect(() => {
    if (authUser) {
      const hasMetadata =
        authUser.metadata &&
        authUser.metadata.creationTime &&
        authUser.metadata.lastSignInTime;

      if (hasMetadata && !isDemoUser) {
        const uid = authUser.uid;
        fetchMyPersonalityUserFromFirebase(uid).then((fetchedUser) => {
          if (fetchedUser) {
            setUser(fetchedUser);
            setLoading(false);
            localStorage.setItem("user", JSON.stringify(fetchedUser));
          } else {
            console.error("User not found in Firebase");
            setLoading(false);
          }
        });
      } else if (isDemoUser) {
        setUser(defaultUserData);
        setLoading(false);
      } else {
        setUser(defaultUserData);
        addUserToFirebase(defaultUserData).then((success) => {
          if (success) {
            setLoading(false);
          } else {
            console.error("Failed to add user to Firebase");
            setLoading(false);
          }
        });
        setLoading(false);
      }
    }
  }, [authUser, isDemoUser]);

  useEffect(() => {
    if (user && !userMetrics) {
      if (isDemoUser) {
        const newMetrics = generateRandomUserMetrics()
        setUserMetrics(newMetrics);
      } else {
        setUserMetrics(user.userMetrics);
      }
    }
  }, [user, isDemoUser]);

  useEffect(() => {
    const fetchCommunityMembers = async () => {
      console.log("isDemoUser", isDemoUser);
      if (isDemoUser) {
        console.log("Fetching random community members");
        const members = await getRandomCommunityMembers();
        console.log("members", members);
        if (members) {
          console.log("Setting community members");
          setCommunityMembers(members);
        }
      }
    };

    fetchCommunityMembers();
  }, [isDemoUser]);

  // Function to update user data and persist it to Firebase
  const updateUser = (updatedUser: Partial<MyPersonalityUser>) => {
    setUser((prevUser) => {
      const newUser = { ...prevUser, ...updatedUser };
      if (!isDemoUser) {
        updateUserInFirebase(newUser); // Persist updated user data to Firebase
      }
      return newUser;
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        communityMembers,
        userMetrics,
        updateUser, 
        setUserMetrics
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the UserContext
export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
