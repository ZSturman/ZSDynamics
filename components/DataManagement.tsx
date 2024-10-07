import { motion } from "framer-motion";
import { entranceAnimation } from "./animations";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Upload, Download, Share2 } from "lucide-react";

const DataManagement = ({ exportResponses }: { exportResponses: () => void }) => (
  <motion.div {...entranceAnimation} className="hover:shadow-lg transition-shadow duration-300">
    <Card>
      <CardHeader>
        <CardTitle className="text-indigo-600">Data Management</CardTitle>
        <CardDescription className="text-gray-500">Upload, download, or share your results</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4">
          <Button variant="outline" className="hover:bg-indigo-50 transition-colors">
            <Upload className="mr-2 h-4 w-4 text-indigo-600" />
            Upload Results
          </Button>
          <Button variant="outline" onClick={exportResponses} className="hover:bg-indigo-50 transition-colors">
            <Download className="mr-2 h-4 w-4 text-indigo-600" />
            Download Results
          </Button>
          <Button variant="outline" className="hover:bg-indigo-50 transition-colors">
            <Share2 className="mr-2 h-4 w-4 text-indigo-600" />
            Share Results
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default DataManagement;