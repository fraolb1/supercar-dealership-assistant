"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Mic, PaperclipIcon } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [rows, setRows] = useState(1);

  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"; // Reset height to get correct measurement
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`; // Set new height
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }
      setRows(1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <div className="flex items-end gap-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2">
        <button
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg transition-colors"
          onClick={() => {}}
          disabled={disabled}
        >
          <PaperclipIcon className="w-5 h-5" />
        </button>

        {/* Text input area */}
        <div className="flex-grow relative">
          <textarea
            ref={inputRef}
            rows={rows}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 resize-none aria-expanded:cursor-not-allowed"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            placeholder={disabled ? "Please wait..." : "Type a message..."}
            disabled={disabled}
          />
          <AnimatePresence>
            {input.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute right-2 bottom-2 text-xs text-gray-400"
              >
                {input.length} / 4000
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Send button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={disabled ? {} : { scale: 1.1 }}
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className={`p-3 rounded-lg flex items-center justify-center transition-colors ${
            disabled || !input.trim()
              ? "bg-gray-100 dark:bg-gray-700 text-gray-400"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {disabled ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </motion.button>
      </div>

      {/* Hint text */}
      <div className="absolute -bottom-6 py-5 left-0 right-0 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </motion.div>
  );
};

export default ChatInput;
