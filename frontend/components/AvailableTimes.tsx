import { Calendar, Clock } from "lucide-react";
import Card from "@/components/Card";

interface AvailableTimesProps {
  times: string[];
  onSelect: (time: string) => void;
}

const AvailableTimes = ({ times = [], onSelect }: AvailableTimesProps) => {
  return (
    <Card
      title="Available Times"
      icon={<Calendar className="w-5 h-5 text-blue-600" />}
    >
      {/* Display today's date */}
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 text-left">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        })}
      </p>

      {/* If no available times */}
      {times.length === 0 ? (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
          <Clock className="w-6 h-6 mx-auto mb-2 text-gray-400" />
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            No available times found
          </p>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {times.map((time) => (
            <button
              key={time}
              onClick={() => onSelect(time)}
              className="px-4 py-3 bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-200
                        font-medium text-sm rounded-lg border border-gray-200 dark:border-gray-700
                        hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-800 dark:hover:text-white
                        hover:border-blue-200 active:bg-blue-100 dark:active:bg-blue-900
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                        transition-all duration-200 flex items-center justify-center"
            >
              <Clock className="w-4 h-4 mr-2 text-gray-400 dark:text-gray-300" />
              {time}
            </button>
          ))}
        </div>
      )}
    </Card>
  );
};

export default AvailableTimes;
