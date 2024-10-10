"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { mfqQuestions } from "@/data/mfq-questions";
import { meyersBriggsQuestions } from "@/data/myers-briggs-questions";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";

// JSON Data of Questions
const yourMoralsQuestions: Question[] = mfqQuestions;
const mbtiQuestions: Question[] = meyersBriggsQuestions;

type MoralFoundationScores = {
  Harm: number;
  Fairness: number;
  Ingroup: number;
  Authority: number;
  Purity: number;
};

type MbtiScores = {
  EI: number;
  SN: number;
  TF: number;
  JP: number;
};

const initialFoundationScores: MoralFoundationScores = {
  Harm: 0,
  Fairness: 0,
  Ingroup: 0,
  Authority: 0,
  Purity: 0,
};

const initialMbtiScores: MbtiScores = {
  EI: 0,
  SN: 0,
  TF: 0,
  JP: 0,
};

const UserQuestions = () => {
  const { user, updateUser } = useUser();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [foundationScores, setFoundationScores] = useState(initialFoundationScores);
  const [mbtiScores, setMbtiScores] = useState(initialMbtiScores);
  const [showQuestion, setShowQuestion] = useState(true);

  const allQuestions = [...yourMoralsQuestions, ...mbtiQuestions];

  const handleAnswer = (responseValue: number) => {
    setShowQuestion(false);
    setTimeout(() => {
      const question = allQuestions[currentQuestionIndex];
      if (question) {
        if (question.type === "MBTI" && question.dimension) {
          const dimensionKey = question.dimension as keyof MbtiScores;
          setMbtiScores((prevScores) => ({
            ...prevScores,
            [dimensionKey]: prevScores[dimensionKey] + responseValue,
          }));
        } else if (question.dimension && question.dimension !== "Catch") {
          const dimensionKey = question.dimension as keyof MoralFoundationScores;
          setFoundationScores((prevScores) => ({
            ...prevScores,
            [dimensionKey]: prevScores[dimensionKey] + responseValue,
          }));
        }
        if (user) {
          const updatedResponses = [
            ...user.responses,
            {
              questionId: question.id,
              answer: responseValue,
              timestamp: new Date(),
            },
          ];
          updateUser({ responses: updatedResponses });
        }
      }
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setShowQuestion(true);
    }, 300); // delay to allow for the exit animation
  };

  const hasMoreQuestions = currentQuestionIndex < allQuestions.length;

  return (
    <div className="p-4 mx-auto">
      {hasMoreQuestions ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          key={currentQuestionIndex}
          className="text-center"
        >
          {showQuestion && (
            <>
              {allQuestions[currentQuestionIndex].type === "relevance" && (
                <h4 className="text-md font-semibold mb-2">
                  How relevant do you find the information when making a decision?
                </h4>
              )}
              {allQuestions[currentQuestionIndex].type === "agreement" && (
                <h4 className="text-md font-semibold mb-2">
                  How much do you agree with the following statement?
                </h4>
              )}
              <p className="mb-4 text-lg font-medium">
                {allQuestions[currentQuestionIndex].question}
              </p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-2"
              >
                {allQuestions[currentQuestionIndex].type === "MBTI" ? (
                  <div className="flex flex-wrap justify-center gap-2">
                    {[3, 2, 1, 0, -1, -2, -3].map((value, idx) => (
                      <Button
                        key={idx}
                        className="btn btn-primary"
                        onClick={() => handleAnswer(value)}
                      >
                        {value === 3
                          ? "Strongly Agree"
                          : value === -3
                          ? "Strongly Disagree"
                          : value === 0
                          ? "Neutral"
                          : value > 0
                          ? `Agree ${value}`
                          : `Disagree ${-value}`}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap justify-center gap-2">
                    {[0, 1, 2, 3, 4, 5].map((value) => (
                      <Button
                        key={value}
                        className="btn btn-primary"
                        onClick={() => handleAnswer(value)}
                      >
                        {["Not at all Relevant", "Not Very Relevant", "Slightly Relevant", "Somewhat Relevant", "Very Relevant", "Extremely Relevant"][value]}
                      </Button>
                    ))}
                  </div>
                )}
              </motion.div>
            </>
          )}
        </motion.div>
      ) : (
        <div className="text-center">
          <p className="mb-4 text-lg font-medium">
            Thank you for completing the questionnaire!
          </p>
          <div className="text-left">
            <h4 className="text-md font-semibold mb-2">
              Your Moral Foundation Scores:
            </h4>
            <pre className="bg-gray-100 p-2 rounded-lg">
              {JSON.stringify(foundationScores, null, 2)}
            </pre>
            <h4 className="text-md font-semibold mt-4 mb-2">
              Your MBTI Scores:
            </h4>
            <pre className="bg-gray-100 p-2 rounded-lg">
              {JSON.stringify(mbtiScores, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserQuestions;