import { motion } from "framer-motion";
import { FaCar, FaClock, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import Card from "@/components/Card";

interface AppointmentProps {
  confirmacion_id: string;
  fecha: string;
  hora: string;
  modelo: string;
  mensaje: string;
}

const AppointmentConfirmation: React.FC<AppointmentProps> = ({
  confirmacion_id,
  fecha,
  hora,
  modelo,
  mensaje,
}) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card
        title="Appointment Confirmation"
        icon={<FaCheckCircle className="text-green-600" />}
        className="text-slate-400"
      >
        <div className="text-center text-green-600 flex items-center justify-center space-x-2">
          <FaCheckCircle className="text-3xl" />
          <h2 className="text-lg font-semibold">{mensaje}</h2>
        </div>

        <div className="mt-4 flex items-center space-x-2 text-gray-700">
          <FaCar className="text-2xl text-blue-500" />
          <p className="text-xl font-bold text-gray-800 dark:text-gray-300">
            {modelo}
          </p>
        </div>

        <div className="mt-2 flex items-center space-x-2 text-gray-600">
          <FaCheckCircle className="text-lg text-green-500" />
          <p className="text-sm font-medium">ID: {confirmacion_id}</p>
        </div>

        <div className="mt-3 flex justify-between text-gray-700">
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="text-lg text-indigo-500" />
            <p className="text-sm text-slate-400">
              {fecha == "" ? today : fecha}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <FaClock className="text-lg text-orange-500" />
            <p className="text-sm text-slate-400">{hora}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default AppointmentConfirmation;
