// components/LoadingMessage.tsx
import { motion } from "framer-motion";
import  useThemeStore from "../store/themeStore";

interface LoadingMessageProps {
  message?: string;
}

const LoadingMessage = ({ message = "Loading..." }: LoadingMessageProps) => {
  const { darkMode } = useThemeStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen flex flex-col items-center justify-center ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className={`h-12 w-12 rounded-full border-4 ${
          darkMode
            ? "border-t-blue-400 border-r-purple-400 border-b-purple-400 border-l-blue-400"
            : "border-t-blue-600 border-r-purple-600 border-b-purple-600 border-l-blue-600"
        } border-opacity-50`}
      />
      <motion.p
        initial={{ y: 10 }}
        animate={{ y: 0 }}
        className={`mt-4 text-lg ${
          darkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {message}
      </motion.p>
    </motion.div>
  );
};

export default LoadingMessage;