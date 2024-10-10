type Question = {
  id: string; // Unique identifier for the question
  date?: number; // Date the question was created
  question: string; // The text of the question
  type: "multiple-choice" | "scale" | "true-false" | "short-answer" | "MBTI" | "agreement" | "relevance"; // Type of question
  choices?: string[]; // List of choices for multiple-choice questions
  dimension?: "EI" | "SN" | "TF" | "JP" | "Harm" | "Fairness" | "Ingroup" | "Authority" | "Purity" | "Catch" // Dimension of the question (e.g., "Harm", "Fairness") or "E/I", "N/S", "T/F", "J/P" for MBTI
};


// Define Response History
type UserAnswer = {
  questionId: string; // Links to the Question
  question: Question // The question that was answered
  multipleChoiceAnswer: string; // The user's multiple choice answer
  scaleAnswer: number; // The user's scale answer
  trueFalseAnswer: boolean; // The user's true/false answer
  shortAnswer: string; // The user's short answer
  mbtiAnswer: string; // The user's MBTI answer
  yourMoralsAnswer: number; // The user's YourMorals answer
  answeredAt: Date; // Timestamp of when the question was answered
};



type UserResponseHistory = {
  questionId: string; // Reference to the question
  responses: UserAnswer[]; // List of responses over time for comparison
};

// Define User Metrics
type MoralFoundationScores = {
  Harm: number;
  Fairness: number;
  Ingroup: number;
  Authority: number;
  Purity: number;
};

type PersonalityTraits = {
  openness: number; // Ranges from 0 to 1
  conscientiousness: number; // Ranges from 0 to 1
  extraversion: number; // Ranges from 0 to 1
  agreeableness: number; // Ranges from 0 to 1
  neuroticism: number; // Ranges from 0 to 1
};

type MBTIMetricType = 'INTJ' | 'ENTJ' | 'INFJ' | 'ENFJ' | 'INTP' | 'ENTP' | 'INFP' | 'ENFP' | 
        'ISTJ' | 'ESTJ' | 'ISFJ' | 'ESFJ' | 'ISTP' | 'ESTP' | 'ISFP' | 'ESFP';

type MBTIMetrics = {
  type: MBTIMetricType
  introversion: number; // Ranges from 0 to 1
  intuition: number; // Ranges from 0 to 1
  thinking: number; // Ranges from 0 to 1
  judging: number; // Ranges from 0 to 1
};

type UserMetrics = {
  personalityTraits: PersonalityTraits; // Big Five scores from YourMorals
  moralFoundationScores: MoralFoundationScores; // Scores from the Moral Foundations test
  mbti: MBTIMetrics; // MBTI scores and type
  responseHistory: UserResponseHistory[]; // Historical responses for tracking changes over time
  lastUpdated: Date; // Last time the metrics were updated
};

// Define Community and Public Structures
type KnownCommunityMember = {
  displayName: string;
  photoURL: string;
  uid: string;
  userMetrics: UserMetrics; 
};

type CommunityQuestion = {
  id: string;
  question: string;
  response: string; 
  dateAsked: Date;
  dateAnswered: Date;
};

// Define Extended User Type
type MyPersonalityUser = {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  dateJoined: Date;
  userMetrics: UserMetrics;
  communityQuestions: CommunityQuestion[];
  userQuestions: UserQuestion[];
  responses: QuestionResponse[];
  shareWithPublic: boolean;
  knownCommunityMembers: string[] // List of UIDs of known community members
};