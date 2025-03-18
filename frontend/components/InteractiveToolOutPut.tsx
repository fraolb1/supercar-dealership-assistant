"use client";

import React from "react";
import ToolHandlers from "./ToolHandlers";
import { InteractiveToolOutputProps } from "@/types/types";

const InteractiveToolOutput: React.FC<InteractiveToolOutputProps> = ({
  toolOutput,
  onInteraction,
}) => {
  return <ToolHandlers toolOutput={toolOutput} onInteraction={onInteraction} />;
};

export default InteractiveToolOutput;
