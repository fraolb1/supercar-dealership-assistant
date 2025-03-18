import {
  extractTemperature,
  getWeatherStyles,
  getTemperatureColor,
} from "@/libs/WeatherUnits";
import Card from "@/components/Card";

interface WeatherCardProps {
  description: string;
}

const WeatherCard = ({ description }: WeatherCardProps) => {
  const temperature = extractTemperature(description);
  const { weatherIcon, bgClass, textColor } = getWeatherStyles(description);
  const tempColor = getTemperatureColor(temperature);

  return (
    <Card title="Current Weather" icon={weatherIcon} className={bgClass}>
      <p className={`text-sm opacity-80 `}>
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        })}
      </p>

      <div className="mt-4 flex items-end">
        {temperature !== null ? (
          <>
            <div className={`text-5xl font-bold ${tempColor}`}>
              {temperature}°
            </div>
            <div className={`ml-2  text-sm pb-1`}>C</div>
          </>
        ) : (
          <p className="text-lg text-gray-400 dark:text-gray-500">N/A</p>
        )}
      </div>

      <p className={`mt-4 text-sm `}>{description}</p>
    </Card>
  );
};

export default WeatherCard;
