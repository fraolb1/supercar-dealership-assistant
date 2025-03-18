import { Compass, MapPin } from "lucide-react";
import Card from "@/components/Card";

interface DealerShipAddressProps {
  place?: string;
}

export default function DealerShipAddress({
  place = "Sample Dealership",
}: DealerShipAddressProps) {
  if (!place) return null;

  return (
    <Card
      title="Location Details"
      icon={<MapPin className="w-6 h-6 text-red-500" strokeWidth={2.5} />}
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 text-center">
        {place}
      </h2>

      <div className="mt-6 flex justify-center">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            place
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white 
                     font-medium rounded-lg transition-transform duration-200 transform hover:scale-105 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Compass className="w-5 h-5" />
          Get Directions
        </a>
      </div>
    </Card>
  );
}
