import { motion } from "framer-motion";
import { entranceAnimation } from "./animations";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const CompletionMeters = ({ completionPercentages }: { completionPercentages: Record<string, number> }) => (
  <motion.div {...entranceAnimation} className="grid grid-cols-3 gap-4 mb-8">
    {Object.entries(completionPercentages).map(([category, value]) => (
      <Card key={category} className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-indigo-600">{category.charAt(0).toUpperCase() + category.slice(1)}</CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={value} className="w-full" />
        </CardContent>
        <CardFooter className="text-gray-500">{value}% Complete</CardFooter>
      </Card>
    ))}
  </motion.div>
);

export default CompletionMeters;