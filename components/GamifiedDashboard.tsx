"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import CompletionMeters from "./CompletionMeters";
import Leaderboard from "./Leaderboard";
import DataManagement from "./DataManagement";
import QuestionnaireTabs from "./QuestionnaireTabs";
import { entranceAnimation } from "./animations";

type Category = "personality" | "political" | "spiritual" | "friendQuestions";

export const GamifiedDashboard = () => {
  const [activeTab, setActiveTab] = useState<Category>("personality");
  const [completionPercentages, setCompletionPercentages] = useState({
    personality: 60,
    spiritual: 40,
    political: 80,
  });
  const [points, setPoints] = useState<number>(320);
  const [responses, setResponses] = useState({
    personality: {},
    spiritual: {},
    political: {},
    friendQuestions: {},
  });
  const [friendQuestions, setFriendQuestions] = useState<Question[]>([]);

  const askFriend = (question: Question) => {
    setFriendQuestions((prev) => [...prev, question]);
  };

  const handleFriendAnswer = (questionId: string) => {
    const question = friendQuestions.find((q) => q.id === questionId);
    if (question) {
      setPoints((prev) => prev + question.points);
      setFriendQuestions((prev) => prev.filter((q) => q.id !== questionId));
    }
  };

  const updateCompletion = (category: Category, value: number) => {
    if (category !== "friendQuestions") {
      setCompletionPercentages((prev) => ({
        ...prev,
        [category]: Math.min(100, prev[category] + value),
      }));
    }
    setPoints((prev) => prev + value * 2);
  };

  const handleAnswerChange = (
    category: Category,
    questionId: string,
    answer: string | number
  ) => {
    setResponses((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [questionId]: answer,
      },
    }));
  };

  const exportResponses = () => {
    const blob = new Blob([JSON.stringify(responses, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "responses.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div {...entranceAnimation} className="flex h-screen bg-gray-100">
      <Sidebar points={points} />
      <div className="flex-1 p-8 overflow-auto">
        <motion.h1 className="text-3xl font-bold text-indigo-600 mb-6">
          Gamified Dashboard
        </motion.h1>
        <CompletionMeters completionPercentages={completionPercentages} />
        <QuestionnaireTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleAnswerChange={handleAnswerChange}
          updateCompletion={updateCompletion}
          askFriend={askFriend}
          handleFriendAnswer={handleFriendAnswer}
          friendQuestions={friendQuestions}
        />
        <Leaderboard points={points} />
        <DataManagement exportResponses={exportResponses} />
      </div>
    </motion.div>
  );
};