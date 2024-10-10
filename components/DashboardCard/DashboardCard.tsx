import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { CiCircleInfo } from "react-icons/ci";

import * as React from "react";

type DashboardCard = {
  title: string;
  content: React.ReactNode;
  icon: React.ReactNode;
  tooltip?: string;
  footer?: string;
  size?: "small" | "medium" | "large";
};

const DashboardCard = ({
  title,
  content,
  icon,
  tooltip,
  footer,
  size,
}: DashboardCard) => {
  return (
    <Card
      className={`${
        size && size === "medium"
          ? "col-span-2"
          : size === "large"
          ? "col-span-4"
          : "col-span-1"
      }`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex flex-row gap-2">
          <CardTitle>{title}</CardTitle>

          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {" "}
                  <CiCircleInfo />
                </TooltipTrigger>
                <TooltipContent>{tooltip}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <div className="opacity-50">{icon}</div>
      </CardHeader>
      <CardContent>{content}</CardContent>

      {footer && (
        <CardFooter className="text-sm text-muted-foreground">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default DashboardCard;
