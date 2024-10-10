// The scoring model: assigns points based on the response
function getScoreFromResponse(response: string): number {
  switch (response) {
    case "Strongly Agree":
      return 2;
    case "Agree":
      return 1;
    case "Neutral":
      return 0;
    case "Disagree":
      return -1;
    case "Strongly Disagree":
      return -2;
    default:
      return 0;
  }
}

interface MyersBriggsScores {
  EI: number; // Extraversion vs. Introversion
  SN: number; // Sensing vs. Intuition
  TF: number; // Thinking vs. Feeling
  JP: number; // Judging vs. Perceiving
}

// Initialize scores
const scores: MyersBriggsScores = {
  EI: 0,
  SN: 0,
  TF: 0,
  JP: 0,
};




// Function to update the scores based on the user's response
export function updateMyersBriggsScores(response: UserAnswer): void {
  const score = getScoreFromResponse(response.mbtiAnswer);

  switch (response.question.dimension) {
    case "EI": // Extraversion (E) vs. Introversion (I)
      scores.EI += score;
      break;
    case "SN": // Sensing (S) vs. Intuition (N)
      scores.TF += score;
      break;
    case "TF": // Thinking (T) vs. Feeling (F)
      scores.SN += score;
      break;
    case "JP": // Judging (J) vs. Perceiving (P)
      scores.JP += score;
      break;
    case "Catch":
      scores.TF += score;
      break;
    default:
      break;
  }
}

