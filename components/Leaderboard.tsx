import { motion } from "framer-motion";
import { entranceAnimation } from "./animations";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

const Leaderboard = ({ points }: { points: number }) => {
  const leaderboard = [
    { name: "You", points },
    { name: "Alex Johnson", points: 250 },
    { name: "Mia Chen", points: 230 },
    { name: "David Lee", points: 200 },
    { name: "Sophia Patel", points: 180 },
  ];

  return (
    <motion.div {...entranceAnimation} className="mb-8">
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-indigo-600">Leaderboard</CardTitle>
          <CardDescription className="text-gray-500">See how you rank among your friends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderboard.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-100 rounded hover:bg-indigo-50 transition-colors">
                <span className="text-gray-700">{index + 1}. {entry.name}</span>
                <span className="font-bold text-indigo-600">{entry.points} points</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Leaderboard;