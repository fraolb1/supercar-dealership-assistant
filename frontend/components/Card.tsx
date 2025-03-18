import React from "react";

interface CardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  icon,
  children,
  className = "",
}) => {
  return (
    <div
      className={`rounded-xl shadow-lg overflow-hidden p-6 transition-all 
                  bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800
                  hover:shadow-2xl ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center">
          {icon && <span className="text-2xl mr-2">{icon}</span>}
          {title}
        </h3>
      </div>

      {/* Content */}
      <div className="text-gray-700 dark:text-gray-300">{children}</div>
    </div>
  );
};

export default Card;
