"use client";
import { useRouter } from "next/navigation";
import { Bot, MessageSquare, Stars, Zap } from "lucide-react";
import { motion } from "framer-motion";

const WelcomeScreen = () => {
  const router = useRouter();

  const features = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: "Smart AI Assistant",
      description:
        "Powered by advanced language models to help you with SuperCar car dealerships related questions",
    },

    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Responses",
      description: "Get quick and accurate answers to your questions",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center items-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <Stars className="w-16 h-16 mx-auto text-blue-500 mb-4" />
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Welcome
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Hey, I am Lex, Virtual sales lead follow-up assistant for SuperCar
            car dealerships
          </p>
        </div>

        <div className="flex gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-blue-500 mb-4">{feature.icon}</div>
              <h2 className="text-xl font-semibold mb-2 dark:text-white">
                {feature.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/chat")}
          className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white self-center text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <MessageSquare className="w-5 h-5" />
          <span>Start Chatting Now</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
