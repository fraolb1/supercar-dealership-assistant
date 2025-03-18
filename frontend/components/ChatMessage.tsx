"use client";
import React from "react";
import ChatBubble from "./ChatBubble";
import TypingIndicator from "./TypingIndicator";

interface ChatMessageProps {
  messages: {
    id: string;
    sender: string;
    text: string;
    isUsingTool?: boolean;
    toolName?: string | null;
  }[];
  pendingTool?: any;
  isTyping: boolean;
  toolOutputs: { messageId: string; name: string; output: string }[];
  onToolInteraction: (toolName: string, data: any) => void;
}

const ChatMessages: React.FC<ChatMessageProps> = ({
  messages,
  pendingTool,
  isTyping,
  toolOutputs,
  onToolInteraction,
}) => {
  return (
    <div className="flex flex-col gap-3 p-4">
      {messages.map((message) => {
        const relatedToolOutput = toolOutputs.find(
          (output) => output.messageId === message.id
        );

        return (
          <ChatBubble
            key={message.id}
            message={message}
            relatedToolOutput={relatedToolOutput}
            onToolInteraction={onToolInteraction}
          />
        );
      })}

      {isTyping && !pendingTool && <TypingIndicator />}
    </div>
  );
};

export default ChatMessages;
