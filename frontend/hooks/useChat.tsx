import { useState, useCallback, useRef, useEffect } from "react";
import { Message, ToolOutput } from "@/types/types";
import { useSSE } from "./useSSE";

export const useChat = (sessionId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [pendingTool, setPendingTool] = useState<string | null>(null);
  const [toolOutputs, setToolOutputs] = useState<ToolOutput[]>([]);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const { processSSEStream } = useSSE(
    setMessages,
    setToolOutputs,
    setPendingTool
  );

  const cleanup = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsTyping(false);
    setPendingTool(null);
  }, []);

  useEffect(() => cleanup, [cleanup]);

  const sendMessage = useCallback(
    async (query: string) => {
      if (!query.trim()) return;
      cleanup();
      setError(null);
      setIsTyping(true);

      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "user",
        text: query,
      };

      setMessages((prev) => [...prev, newMessage]);

      try {
        abortControllerRef.current = new AbortController();
        const response = await fetch(`http://localhost:8000/query`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
          },
          body: JSON.stringify({ query, session_id: sessionId }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        await processSSEStream(response);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Unknown error occurred"
        );
      } finally {
        cleanup();
      }
    },
    [sessionId, cleanup, processSSEStream]
  );

  return { messages, isTyping, pendingTool, error, sendMessage, toolOutputs };
};
