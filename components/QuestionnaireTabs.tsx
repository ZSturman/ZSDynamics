import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { personalityQuestions } from "@/data/personalityQuestions";
import { politicalQuestions } from "@/data/politicalQuestions";
import { spiritualQuestions } from "@/data/spiritualQuestions";
import { motion } from "framer-motion";
import { entranceAnimation } from "./animations";
import { useState } from "react";

type Category = "personality" | "political" | "spiritual" | "friendQuestions";

interface Question {
  id: string;
  text: string;
  type: "multipleChoice" | "trueFalse" | "shortAnswer" | "scale";
  options?: string[];
  points: number;
}

interface QuestionnaireTabsProps {
  activeTab: Category;
  setActiveTab: (value: Category) => void;
  handleAnswerChange: (
    category: Category,
    questionId: string,
    answer: string | number
  ) => void;
  updateCompletion: (category: Category, value: number) => void;
  askFriend: (question: Question) => void;
  handleFriendAnswer: (questionId: string) => void;
  friendQuestions: Question[];
}

const QuestionnaireTabs = ({
  activeTab,
  setActiveTab,
  handleAnswerChange,
  updateCompletion,
  askFriend,
  handleFriendAnswer,
  friendQuestions,
}: QuestionnaireTabsProps) => {
  const [answeredQuestions, setAnsweredQuestions] = useState<{ [key in Category]: Set<string> }>({
    personality: new Set(),
    political: new Set(),
    spiritual: new Set(),
    friendQuestions: new Set(),
  });

  const handleQuestionAnswered = (category: Category, questionId: string) => {
    setAnsweredQuestions((prev) => {
      // Create a new Set from the previous set to avoid mutation
      const updatedSet = new Set(prev[category]);
      updatedSet.add(questionId);
      return {
        ...prev,
        [category]: updatedSet,
      };
    });
  };

  const renderQuestionInput = (question: Question, category: Category) => {
    const handleAnswer = (answer: string | number) => {
      handleAnswerChange(category, question.id, answer);
      handleQuestionAnswered(category, question.id);
      updateCompletion(category, question.points);
    };

    switch (question.type) {
      case "scale":
        return (
          <Input
            type="range"
            min="1"
            max="10"
            className="w-full"
            onChange={(e) => handleAnswer(parseInt(e.target.value))}
          />
        );
      case "multipleChoice":
        return (
          <select
            className="w-full p-2 border rounded"
            onChange={(e) => handleAnswer(e.target.value)}
          >
            <option value="" disabled selected>
              Select an option
            </option>
            {question.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "trueFalse":
        return (
          <div className="flex space-x-2">
            <Button onClick={() => handleAnswer("true")}>True</Button>
            <Button onClick={() => handleAnswer("false")}>False</Button>
          </div>
        );
      case "shortAnswer":
        return (
          <Input
            type="text"
            placeholder="Write your answer here"
            className="w-full"
            onBlur={(e) => handleAnswer(e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  const renderQuestions = (questions: Question[], category: Category) => {
    const visibleQuestion = questions.find(
      (question) => !Array.from(answeredQuestions[category]).includes(question.id)
    );

    return (
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-indigo-600">
            {category.charAt(0).toUpperCase() + category.slice(1)} Questions
          </CardTitle>
          <CardDescription className="text-gray-500">
            Answer the questions below to earn points.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {visibleQuestion ? (
              <motion.div key={visibleQuestion.id} layout>
                <p className="text-gray-700">{visibleQuestion.text}</p>
                {renderQuestionInput(visibleQuestion, category)}
                <Button
                  onClick={() => askFriend(visibleQuestion)}
                  className="mt-2 hover:bg-indigo-200 transition-colors"
                >
                  Ask a Friend
                </Button>
              </motion.div>
            ) : (
              <p className="text-gray-500">You have answered all questions in this category.</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => updateCompletion(category, 10)}
            className="hover:bg-indigo-600 transition-colors text-white"
          >
            Submit Answers
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const renderFriendQuestions = () => (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-indigo-600">Questions from Friends</CardTitle>
        <CardDescription className="text-gray-500">
          Answer these questions to earn points.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {friendQuestions.map((question) =>
            !answeredQuestions.friendQuestions.has(question.id) ? (
              <motion.div key={question.id} layout>
                <p className="text-gray-700">{question.text}</p>
                {renderQuestionInput(question, "friendQuestions")}
                <Button
                  onClick={() => {
                    handleFriendAnswer(question.id);
                    handleQuestionAnswered("friendQuestions", question.id);
                  }}
                  className="mt-2 hover:bg-indigo-200 transition-colors"
                >
                  Answer
                </Button>
              </motion.div>
            ) : null
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <motion.div {...entranceAnimation} className="mb-8">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as Category)}
        className="mb-8"
      >
        <TabsList className="flex space-x-2">
          <TabsTrigger value="personality" className="hover:text-indigo-600">
            Personality
          </TabsTrigger>
          <TabsTrigger value="political" className="hover:text-indigo-600">
            Political
          </TabsTrigger>
          <TabsTrigger value="spiritual" className="hover:text-indigo-600">
            Spiritual
          </TabsTrigger>
          <TabsTrigger value="friendQuestions" className="hover:text-indigo-600">
            Friend Questions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="personality">
          {renderQuestions(personalityQuestions, "personality")}
        </TabsContent>
        <TabsContent value="political">
          {renderQuestions(politicalQuestions, "political")}
        </TabsContent>
        <TabsContent value="spiritual">
          {renderQuestions(spiritualQuestions, "spiritual")}
        </TabsContent>
        <TabsContent value="friendQuestions">
          {renderFriendQuestions()}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default QuestionnaireTabs;