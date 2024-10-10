import { User } from "firebase/auth";


type DemoUserData = {
  email: string;
  name: { first: string; last: string };
  picture: { large: string };
}

export const getDemoUser = async (): Promise<User> => {
  // Fetch a random user from the Random User API
  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();
  const userData: DemoUserData = data.results[0];

  // Populate the DemoUser object with data from Random User API
  const DemoUser: User = {
    providerId: "firebase",
    uid: "demo-user",
    email: userData.email,
    displayName: "Demo User",
    //displayName: `${userData.name.first} ${userData.name.last}`,
    emailVerified: false,
    isAnonymous: false,
    metadata: {
      creationTime: undefined,
      lastSignInTime: undefined,
    },
    providerData: [],
    refreshToken: "",
    tenantId: null,
    phoneNumber: null,
    photoURL: userData.picture.large,
    delete: async () => {},
    getIdToken: async () => "",
    getIdTokenResult: async () => ({
      authTime: "",
      expirationTime: "",
      issuedAtTime: "",
      signInProvider: null,
      signInSecondFactor: null,
      token: "",
      claims: {},
    }),
    reload: async () => {},
    toJSON: () => ({}),
  };

  return DemoUser;
};

