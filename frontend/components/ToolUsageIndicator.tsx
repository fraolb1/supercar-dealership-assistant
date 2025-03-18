import { motion } from "framer-motion";
import { toolUsageText } from "@/libs/utils";

interface ToolUsageIndicatorProps {
  toolName?: string | null;
  sender: string;
}

const ToolUsageIndicator = ({ toolName, sender }: ToolUsageIndicatorProps) => {
  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className={`text-lg font-medium p-2 rounded-lg ${
        sender === "user"
          ? "bg-blue-400 bg-opacity-25"
          : "bg-green-50 text-green-600 border border-green-100"
      } flex items-center justify-center my-1`}
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
      {toolUsageText(toolName ?? "")}
    </motion.div>
  );
};

export default ToolUsageIndicator;
