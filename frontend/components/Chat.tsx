"use client";
import { useChat } from "@/hooks/useChat";
import ChatInput from "./ChatInput";
import { generateUserMessage } from "@/libs/utils";
import ChatMessages from "./ChatMessage";
import { useState } from "react";
import { Bot, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Chat = () => {
  const [sessionId] = useState<string>(() => Math.random().toString());
  const { messages, isTyping, sendMessage, pendingTool, error, toolOutputs } =
    useChat(sessionId);

  const handleToolInteraction = (toolName: string, selection: any) => {
    const userMessage = generateUserMessage(toolName, selection);
    sendMessage(userMessage);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 py-4 px-6">
        <div className="flex items-center space-x-3">
          <Bot className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            AI Assistant
          </h1>
          {isTyping && (
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Chat Area */}
      <div
        className="flex-1 overflow-y-auto p-4 scroll-smooth"
        id="chat-messages"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400">
            <Bot className="w-12 h-12 mb-4" />
            <p className="text-lg mb-2">Start a conversation</p>
            <p className="text-sm">
              Ask me anything or try using one of the available tools
            </p>
          </div>
        ) : (
          <ChatMessages
            messages={messages}
            isTyping={isTyping}
            pendingTool={pendingTool}
            toolOutputs={toolOutputs}
            onToolInteraction={handleToolInteraction}
          />
        )}
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mx-4 mb-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0" />
            <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSend={sendMessage} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
