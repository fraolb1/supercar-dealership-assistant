import { useRef } from "react";
import { handleSSEChunk } from "@/libs/ChatUtils";

export const useSSE = (
  setMessages: React.Dispatch<React.SetStateAction<any[]>>,
  setToolOutputs: React.Dispatch<React.SetStateAction<any[]>>,
  setPendingTool: React.Dispatch<React.SetStateAction<any>>
) => {
  const messageBufferRef = useRef("");
  const lastMessageIdRef = useRef<string | null>(null);

  const processSSEStream = async (response: Response) => {
    const reader = response.body?.getReader();
    if (!reader) throw new Error("No response body");

    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split(/\r\n\r\n|\n\n/);
      buffer = parts.pop() || "";

      for (const part of parts) {
        handleSSEChunk(
          part.split(/\r\n|\n/),
          setMessages,
          setToolOutputs,
          setPendingTool,
          messageBufferRef,
          lastMessageIdRef
        );
      }
    }

    if (buffer) {
      handleSSEChunk(
        buffer.split(/\r\n|\n/),
        setMessages,
        setToolOutputs,
        setPendingTool,
        messageBufferRef,
        lastMessageIdRef
      );
    }
  };

  return { processSSEStream };
};
