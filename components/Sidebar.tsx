import { motion } from "framer-motion";
import { entranceAnimation } from "./animations";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart, Users, Settings } from "lucide-react";

const Sidebar = ({ points }: { points: number }) => (
  <motion.div {...entranceAnimation} className="w-64 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="p-4">
      <Avatar className="w-20 h-20 mx-auto mb-4">
        <AvatarImage src="/placeholder.svg?height=80&width=80" alt="User" />
        <AvatarImage src="https://picsum.photos/80" alt="User" />
        <AvatarFallback>JS</AvatarFallback>
      </Avatar>
      <h2 className="text-xl font-bold text-center mb-4 text-indigo-600">Jane Smith</h2>
      <div className="text-center mb-4 text-gray-700">
        <span className="text-2xl font-bold">{points}</span> points
      </div>
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full justify-start hover:bg-indigo-50">
          <BarChart className="mr-2 h-4 w-4 text-indigo-600" />
          Dashboard
        </Button>
        <Button variant="ghost" className="w-full justify-start hover:bg-indigo-50">
          <Users className="mr-2 h-4 w-4 text-indigo-600" />
          Friends
        </Button>
        <Button variant="ghost" className="w-full justify-start hover:bg-indigo-50">
          <Settings className="mr-2 h-4 w-4 text-indigo-600" />
          Settings
        </Button>
      </nav>
    </div>
  </motion.div>
);

export default Sidebar;