import { Message, ToolOutput } from "@/types/types";

export const parseSSELine = (line: string) => {
  const colonIndex = line.indexOf(":");
  if (colonIndex === -1) return null;
  return {
    field: line.slice(0, colonIndex).trim(),
    value: line.slice(colonIndex + 1).trim(),
  };
};

export const handleSSEChunk = (
  lines: string[],
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setToolOutputs: React.Dispatch<React.SetStateAction<ToolOutput[]>>,
  setPendingTool: React.Dispatch<React.SetStateAction<string | null>>,
  messageBufferRef: React.MutableRefObject<string>,
  lastMessageIdRef: React.MutableRefObject<string | null>
) => {
  let currentEvent = "";
  let currentData = "";

  for (const line of lines) {
    const parsed = parseSSELine(line);
    if (!parsed) continue;

    const { field, value } = parsed;

    if (field === "event") {
      currentEvent = value;
    } else if (field === "data") {
      currentData = value.trim();

      if (currentEvent === "chunk") {
        if (currentData) {
          messageBufferRef.current +=
            (messageBufferRef.current.length > 0 ? " " : "") + currentData;

          setMessages((prev) => {
            const updated = [...prev];
            const lastMessage = updated[updated.length - 1];

            if (lastMessage && lastMessage.sender === "assistant") {
              updated[updated.length - 1] = {
                ...lastMessage,
                text: messageBufferRef.current,
                toolName: undefined,
                isUsingTool: false,
              };
            } else {
              console.log("here");
              const newMessageId = Date.now().toString();
              lastMessageIdRef.current = newMessageId;
              updated.push({
                id: newMessageId,
                sender: "assistant",
                text: messageBufferRef.current,
              });
            }

            return updated;
          });
        }
      } else if (currentEvent === "tool_use") {
        if (currentData) {
          const currentTool = currentData;

          messageBufferRef.current = "";
          const newMessageId = Date.now().toString();
          lastMessageIdRef.current = newMessageId;

          setPendingTool(currentTool);

          setMessages((prev) => [
            ...prev,
            {
              id: newMessageId,
              sender: "assistant",
              text: currentTool,
              toolName: currentTool,
              isUsingTool: true,
            },
          ]);
        }
      } else if (currentEvent === "tool_output") {
        try {
          const parsedData = JSON.parse(currentData);
          setToolOutputs((prev) => [
            ...prev,
            {
              messageId: lastMessageIdRef.current || Date.now().toString(),
              name: parsedData.name,
              output: parsedData.output,
            },
          ]);
          setPendingTool(null);
          messageBufferRef.current = "";
        } catch (error) {
          console.log(error);
        }
      } else if (currentEvent === "end") {
        lastMessageIdRef.current = null;
      }

      currentEvent = "";
      currentData = "";
    }
  }
};
