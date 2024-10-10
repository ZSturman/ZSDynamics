"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { entranceAnimation } from "../../lib/animations";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import DashboardCard from "../DashboardCard/DashboardCard";
import DataManagement from "../DataManagement/DataManagement";
import UserQuestions from "../UserQuestion/UserQuestion";
import CommunityMemberCards from "../CommunityMemberCards/CommunityMemberCards";
import { FaChartBar, FaChartPie } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import { FaQuestion } from "react-icons/fa";
import { MdMobiledataOff } from "react-icons/md";
import PersonalityTraitsChart from "../UserMetrics/PersonalityTraitsChart";
import MoralFoundationChart from "../UserMetrics/MoralFoundationChart";
import MBTIChart from "../UserMetrics/MBTIChart";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const { user, userMetrics } = useUser();
  useEffect(() => {
    if (user) {
      console.log("User data reloaded:", user);
    }
  }, [user]);

  const [userHasPersonalityTraits, setUserHasPersonalityTraits] =
    useState(false);
  const [userHasMoralFoundationScores, setUserHasMoralFoundationScores] =
    useState(false);
  const [userHasMBTI, setUserHasMBTI] = useState(false);


  useEffect(() => {
    if (user && userMetrics) {
      setUserHasPersonalityTraits(
        userMetrics.personalityTraits.agreeableness > 0 &&
          userMetrics.personalityTraits.conscientiousness > 0 &&
          userMetrics.personalityTraits.extraversion > 0 &&
          userMetrics.personalityTraits.neuroticism > 0 &&
          userMetrics.personalityTraits.openness > 0
      );
      setUserHasMoralFoundationScores(
        userMetrics.moralFoundationScores.Authority > 0 &&
          userMetrics.moralFoundationScores.Harm > 0 &&
          userMetrics.moralFoundationScores.Fairness > 0 &&
          userMetrics.moralFoundationScores.Ingroup > 0 &&
          userMetrics.moralFoundationScores.Purity > 0
      );
      setUserHasMBTI(
        userMetrics.mbti.introversion > 0 &&
          userMetrics.mbti.intuition > 0 &&
          userMetrics.mbti.judging > 0 &&
          userMetrics.mbti.thinking > 0
      );

    }
  }, [user, userMetrics]);

  if (!user) {
    return null;
  }

  return (
    <motion.div
      {...entranceAnimation}
      className="flex h-screen w-screen bg-gray-100"
    >
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <motion.div className="flex-1 overflow-auto">
        <Header />

        <main className="mx-auto py-6 sm:px-6 lg:px-8">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

          <DashboardCard
              title="Question"
              content={<UserQuestions />}
              icon={<FaQuestion className="h-8 w-8 text-blue-600" />}
              size="large"
            />



            {/* Card for Personality Traits */}
            <DashboardCard
              title="Personality Traits"
              content={
                userMetrics && userHasPersonalityTraits ? (
                  <PersonalityTraitsChart
                    personalityTraits={userMetrics.personalityTraits}
                    expanded={true}
                  />
                ) : (
                  <div>
                    <p className="text-gray-500">No data available yet</p>
                    <p className="text-gray-500">
                      Answer more questions to see your scores
                    </p>
                  </div>
                )
              }
              icon={<FaChartPie className="h-8 w-8 text-green-600" />}
              tooltip="Overview of personality traits like Openness, Conscientiousness, etc."
              size="large"
            />

            {/* Card for Moral Foundation Scores */}
            <DashboardCard
              title="Moral Foundations"
              content={
                userMetrics && userHasMoralFoundationScores ? (
                  <MoralFoundationChart
                    moralFoundationScores={
                      userMetrics.moralFoundationScores
                    }
                    expanded={true}
                  />
                ) : (
                  <div>
                    <p className="text-gray-500">No data available yet</p>
                    <p className="text-gray-500">
                      Answer more questions to see your scores
                    </p>
                  </div>
                )
              }
              icon={<FaChartBar className="h-8 w-8 text-purple-600" />}
              tooltip="Scores for moral foundations such as Fairness and Authority."
              size="large"
            />

            {/* Card for MBTI Results */}
            <DashboardCard
              title="MBTI Type"
              content={
                userMetrics && userHasMBTI ? (
                  <MBTIChart mbti={userMetrics.mbti} expanded={true} />
                ) : (
                  <div>
                    <p className="text-gray-500">No data available yet</p>
                    <p className="text-gray-500">
                      Answer more questions to see your scores
                    </p>
                  </div>
                )
              }
              icon={<FaChartPie className="h-8 w-8 text-blue-600" />}
              tooltip="Detailed breakdown of MBTI type and related scores."
              size="large"
            />


            <DashboardCard
              title="Data Management"
              content={<DataManagement />}
              icon={<MdMobiledataOff className="h-8 w-8 text-blue-600" />}
              tooltip="Upload, download, or share your results"
              size="large"
            />
            <div className="col-span-4">
              <CommunityMemberCards />
            </div>
          </div>
        </main>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
