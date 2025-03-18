interface GenerateUserMessage {
  (toolName: string, selection: string): string;
}

export const generateUserMessage: GenerateUserMessage = (
  toolName,
  selection
) => {
  switch (toolName) {
    case "check_appointment_availability":
      return `I'd like to schedule an appointment for ${selection}`;
    case "get_dealership_address":
      return `I choose this dealership: ${selection}`;
    default:
      return `Selected: ${selection}`;
  }
};

export const toolUsageText = (toolName: string) => {
  switch (toolName) {
    case "check_appointment_availability":
      return `Checking appointment availability`;
    case "get_dealership_address":
      return `Getting dealership address`;
    case "get_weather":
      return "Getting Weather condition";
    case "schedule_appointment":
      return "Scheduling appointment";
    default:
      return `Using ${toolName}`;
  }
};

export function parseStringToObject(input: string): Record<string, any> | null {
  console.log("input: ", input);
  try {
    // Remove surrounding triple backticks and any extra spaces
    const cleanedStr = input.slice(4, input.length - 4).trim();

    console.log("cleanedStr", cleanedStr);

    // Replace single quotes with double quotes for JSON compatibility
    let jsonStr = cleanedStr.replace(/'/g, '"');

    // Ensure no other invalid characters are present (like backslashes, etc.)
    jsonStr = jsonStr.replace(/\\(?![\"\\])/g, "");

    console.log("utils: ", jsonStr);

    // Parse JSON string into an object
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error parsing input:", error);
    return null;
  }
}

// utils.ts
export const parseSSELine = (line: string) => {
  const colonIndex = line.indexOf(":");
  if (colonIndex === -1) return null;
  return {
    field: line.slice(0, colonIndex).trim(),
    value: line.slice(colonIndex + 1).trim(),
  };
};


