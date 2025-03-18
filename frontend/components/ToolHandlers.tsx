import React from "react";
import { motion } from "framer-motion";
import WeatherCard from "./WeatherInfo";
import AppointmentConfirmation from "./AppointmentConfirmation";
import AvailableTimes from "./AvailableTimes";
import { parseStringToObject } from "@/libs/utils";
import { InteractiveToolOutputProps } from "@/types/types";
import DealerShipAddress from "./DealerShipAddress";

const ToolHandlers: React.FC<InteractiveToolOutputProps> = ({
  toolOutput,
  onInteraction,
}) => {
  if (!toolOutput || !toolOutput.name) {
    console.warn("Invalid tool output:", toolOutput);
    return null;
  }

  const toolName = toolOutput.name;
  const output = toolOutput.output;

  switch (toolName) {
    case "check_appointment_availability": {
      let available_times: string[] = [];

      if (typeof output === "string") {
        const matches = output.match(/\b\d{1,2}:\d{2}\b/g);
        if (matches) available_times = matches.map((t) => t.trim());
      } else if (typeof output === "object" && output !== null) {
        available_times = Object.values(output)
          .flat()
          .filter(
            (item): item is string =>
              typeof item === "string" && /\d{1,2}:\d{2}/.test(item)
          );
      }

      return (
        <>
          <AvailableTimes
            times={available_times}
            onSelect={(time) => onInteraction(toolName, time)}
          />
        </>
      );
    }

    case "get_weather":
      return <WeatherCard description={output} />;

    case "schedule_appointment":
      const parsedOutput = output && parseStringToObject(output);
      if (parsedOutput) {
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AppointmentConfirmation {...parsedOutput} />
          </motion.div>
        );
      }
      console.warn("Invalid appointment confirmation data:", output);
      return (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2 p-3 bg-red-100 rounded-lg text-sm text-red-600 shadow"
        >
          Invalid appointment confirmation data.
        </motion.div>
      );

    case "get_dealership_address":
      return <DealerShipAddress place={toolOutput.output} />;

    default:
      console.warn("Unhandled tool name:", toolName);
      return (
        <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
          {typeof output === "string"
            ? output
            : JSON.stringify(output, null, 2)}
        </div>
      );
  }
};

export default ToolHandlers;
