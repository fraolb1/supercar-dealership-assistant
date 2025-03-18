export const extractTemperature = (description: string): number | null => {
  const tempMatch = description.match(/(\d+)°[CF]/);
  return tempMatch ? parseInt(tempMatch[1]) : null;
};

export const determineWeatherType = (description: string) => {
  return {
    isSunny: /sunny|clear|fair/i.test(description),
    isRainy: /rain|shower|drizzle/i.test(description),
    isSnowy: /snow|blizzard|flurries/i.test(description),
    isCloudy: /cloud|overcast|fog|mist/i.test(description),
    isStormy: /storm|thunder|lightning/i.test(description),
    isWindy: /wind|breezy|gust/i.test(description),
  };
};

export const getWeatherStyles = (description: string) => {
  const { isSunny, isRainy, isSnowy, isCloudy, isStormy, isWindy } =
    determineWeatherType(description);

  let weatherIcon = "☁️";
  let bgClass = "bg-gray-200";
  let textColor = "text-gray-800";

  if (isStormy) {
    weatherIcon = "⛈️";
    bgClass = "bg-gray-700";
    textColor = "text-white";
  } else if (isRainy) {
    weatherIcon = "🌧️";
    bgClass = "bg-blue-100";
  } else if (isSnowy) {
    weatherIcon = "❄️";
    bgClass = "bg-blue-50";
  } else if (isSunny) {
    weatherIcon = "☀️";
    bgClass = "bg-yellow-100";
  } else if (isCloudy) {
    weatherIcon = "☁️";
    bgClass = "bg-gray-200";
  } else if (isWindy) {
    weatherIcon = "💨";
    bgClass = "bg-gray-100";
  }

  return { weatherIcon, bgClass, textColor };
};

export const getTemperatureColor = (temperature: number | null): string => {
  if (temperature === null) return "text-gray-800";

  if (temperature > 30) return "text-red-600";
  if (temperature > 20) return "text-orange-500";
  if (temperature > 10) return "text-yellow-600";
  if (temperature > 0) return "text-blue-400";
  return "text-blue-600";
};
