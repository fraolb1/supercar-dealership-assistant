import { motion } from "framer-motion";
import InteractiveToolOutput from "./InteractiveToolOutPut";
import ToolUsageIndicator from "./ToolUsageIndicator";

interface ChatBubbleProps {
  message: {
    id: string;
    sender: string;
    text: string;
    isUsingTool?: boolean;
    toolName?: string | null;
  };
  relatedToolOutput?: { messageId: string; name: string; output: string };
  onToolInteraction: (toolName: string, data: any) => void;
}

const ChatBubble = ({
  message,
  relatedToolOutput,
  onToolInteraction,
}: ChatBubbleProps) => {
  return (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`max-w-[75%] p-4 rounded-2xl shadow-sm ${
        message.sender === "user"
          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white self-end ml-auto mr-2"
          : "bg-slate-500 border border-gray-100 text-white self-start ml-2"
      } mb-3 relative hover:shadow-md transition-shadow duration-200`}
    >
      {/* Sender label */}
      <div className="flex items-center mb-1.5">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-2 ${
            message.sender === "user"
              ? "bg-blue-300 text-blue-800"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {message.sender === "user" ? "Y" : "A"}
        </div>
        <span
          className={`text-sm font-medium ${
            message.sender === "user" ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {message.sender === "user" ? "You" : "Assistant"}
        </span>
      </div>

      {/* Message content */}
      <div
        className={`${
          message.sender === "user" ? "text-white" : "text-gray-800"
        } text-base leading-relaxed`}
      >
        {message.isUsingTool ? (
          <ToolUsageIndicator
            toolName={message.toolName}
            sender={message.sender}
          />
        ) : (
          <div className="whitespace-pre-wrap break-words">{message.text}</div>
        )}

        {/* Tool output */}
        {relatedToolOutput && !message.isUsingTool && (
          <div className="mt-3 pt-3 border-t border-opacity-20 border-gray-300">
            <InteractiveToolOutput
              toolOutput={relatedToolOutput}
              onInteraction={onToolInteraction}
            />
          </div>
        )}
      </div>

      {/* Message tail */}
      <div
        className={`absolute w-3 h-3 transform rotate-45 ${
          message.sender === "user"
            ? "bg-blue-600 right-[-5px]"
            : "bg-slate-500 left-[-5px]"
        } top-4`}
      />
    </motion.div>
  );
};

export default ChatBubble;
