
export const defaultUserData: MyPersonalityUser = {
    uid: "...",
    displayName: "Demo User",
    email: "demo@example.com",
    photoURL: "https://picsum.photos/80",
    dateJoined: new Date(),
    communityQuestions: [],
    userQuestions: [],
    shareWithPublic: false,
    userMetrics: {
      personalityTraits: {
        openness: 0,
        conscientiousness: 0,
        extraversion: 0,
        agreeableness: 0,
        neuroticism: 0,
      },
      moralFoundationScores: {
        Harm: 0,
        Fairness: 0,
        Ingroup: 0,
        Authority: 0,
        Purity: 0,
      },
      mbti: {
        type: "INTJ",
        introversion: 0,
        intuition: 0,
        thinking: 0,
        judging: 0,
      },
      responseHistory: [],
      lastUpdated: new Date(),
    },
    responses: [],
    knownCommunityMembers: [],
  };