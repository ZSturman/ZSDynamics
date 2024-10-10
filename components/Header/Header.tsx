import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";

const Header = () => {
    const { user } = useUser();

    if (!user) {
        return null;
    }
    
  return (
    <header className="bg-white shadow-sm">
    <div className="mx-auto py-4 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-bold mb-4 text-indigo-600 text-nowrap">
        {user?.displayName || "User"}
      </h2>

      <motion.h1 className="text-3xl font-bold text-indigo-600">
        Dashboard
      </motion.h1>
    </div>
  </header>
  )
}

export default Header