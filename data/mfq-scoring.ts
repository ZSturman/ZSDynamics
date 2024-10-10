import { mfqQuestions } from "./mfq-questions";


const foundationScores: MoralFoundationScores = {
  Harm: 0,
  Fairness: 0,
  Ingroup: 0,
  Authority: 0,
  Purity: 0,
};

// JSON Data of Questions
const questions: Question[] = mfqQuestions;

// Function to update foundation scores
export function updateScore(questionId: string, responseValue: number) {
  const question = questions.find((q) => q.id === questionId);

  if (question && question.dimension !== "Catch") {
    switch (question.dimension) {
      case "Harm":
        foundationScores.Harm += responseValue;
        break;
      case "Fairness":
        foundationScores.Fairness += responseValue;
        break;
      case "Ingroup":
        foundationScores.Ingroup += responseValue;
        break;
      case "Authority":
        foundationScores.Authority += responseValue;
        break;
      case "Purity":
        foundationScores.Purity += responseValue;
        break;
    }
  }
}

