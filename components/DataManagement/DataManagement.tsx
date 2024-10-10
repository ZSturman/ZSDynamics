import { motion } from "framer-motion";
import { entranceAnimation } from "../../lib/animations";
import { Button } from "@/components/ui/button";
import { Upload, Download, Share2 } from "lucide-react";
import { downloadUserData } from "@/lib/utils";
import { useUser } from "@/context/UserContext";

const DataManagement = () => {
  const { user } = useUser();

  const exportUserData = () => {
    if (user) {
      downloadUserData(user);
    } else {
      console.error("No user data to export");
    }
  }

  return (

  <motion.div {...entranceAnimation} className=" transition-shadow duration-300">


        <div className="flex space-x-4">
          <Button variant="outline" className="hover:bg-indigo-50 transition-colors">
            <Upload className="mr-2 h-4 w-4 text-indigo-600" />
            Upload Results
          </Button>
          <Button variant="outline" onClick={exportUserData} className="hover:bg-indigo-50 transition-colors">
            <Download className="mr-2 h-4 w-4 text-indigo-600" />
            Download Results
          </Button>
          <Button variant="outline" className="hover:bg-indigo-50 transition-colors">
            <Share2 className="mr-2 h-4 w-4 text-indigo-600" />
            Share Results
          </Button>
        </div>

  </motion.div>
);
}
export default DataManagement;