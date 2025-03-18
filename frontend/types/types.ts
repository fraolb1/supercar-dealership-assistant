// types.ts
export type ToolState =
  | "get_weather"
  | "get_dealership_address"
  | "check_appointment_availability"
  | "schedule_appointment";

export interface Message {
  id: string;
  sender: "user" | "assistant" | "tool";
  text: string;
  toolName?: string | null;
  toolOutput?: any;
  isUsingTool?: boolean;
}

export type ToolOutput = {
  messageId: string;
  name: string;
  output: any;
};

export interface InteractiveToolOutputProps {
  toolOutput: ToolOutput;
  onInteraction: (toolName: string, data: any) => void;
}
