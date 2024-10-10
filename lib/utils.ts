import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const mbtiTypes: MBTIMetricType[] = [
  "INTJ",
  "ENTJ",
  "INFJ",
  "ENFJ",
  "INTP",
  "ENTP",
  "INFP",
  "ENFP",
  "ISTJ",
  "ESTJ",
  "ISFJ",
  "ESFJ",
  "ISTP",
  "ESTP",
  "ISFP",
  "ESFP",
];

export const generateRandomUserMetrics: () => UserMetrics = () => {
  const randomMbtiType = mbtiTypes[Math.floor(Math.random() * mbtiTypes.length)];
  
  return {
    personalityTraits: {
      openness: Math.random(),
      conscientiousness: Math.random(),
      extraversion: Math.random(),
      agreeableness: Math.random(),
      neuroticism: Math.random(),
    },
    moralFoundationScores: {
      Harm: Math.random(),
      Fairness: Math.random(),
      Ingroup: Math.random(),
      Authority: Math.random(),
      Purity: Math.random(),
    },
    mbti: {
      type: randomMbtiType,
      introversion: Math.random(),
      intuition: Math.random(),
      thinking: Math.random(),
      judging: Math.random(),
    },
    responseHistory: [],
    lastUpdated: new Date(),
  };
};

export const serealizeUserData = (user: MyPersonalityUser): string => {
  return JSON.stringify({
    ...user,
    dateJoined: user.dateJoined.toISOString(),
    userMetrics: {
      ...user.userMetrics,
      lastUpdated: user.userMetrics.lastUpdated.toISOString(),
      responseHistory: user.userMetrics.responseHistory.map((history) => ({
        ...history,
        responses: history.responses.map((response) => ({
          ...response,
          answeredAt: response.answeredAt.toISOString(),
        })),
      })),
    },
    communityQuestions: user.communityQuestions.map((question) => ({
      ...question,
      dateAsked: question.dateAsked.toISOString(),
      dateAnswered: question.dateAnswered.toISOString(),
    })),
  });
};

export const downloadUserData = (user: MyPersonalityUser) => {
  const serializedData = serealizeUserData(user);
  const blob = new Blob([serializedData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download =`${user.displayName} Personality Data.json`
  a.click();
  URL.revokeObjectURL(url);
}