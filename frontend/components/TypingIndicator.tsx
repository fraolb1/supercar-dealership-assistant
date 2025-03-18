import { motion } from "framer-motion";

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
    className="p-2 bg-gray-300 text-gray-700 italic rounded-lg self-start"
  >
    Assistant is thinking...
  </motion.div>
);

export default TypingIndicator;
