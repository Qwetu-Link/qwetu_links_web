import { useState } from "react";
import { popularListings } from "@/data/properties";
import PropertyListings from "../components/PropertyListings";
import PropertyDetail from "../components/PropertyDetails";
import type { Property } from "../properties.types";

export default function PropertyPage() {
  const [selectedProperty, setSelectedProperty] = useState<Property>(
    popularListings[0],
  );

  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="h-screen flex flex-col md:flex-row bg-white">
      <div className={`${showDetail ? "hidden" : "flex"} md:flex`}>
      <PropertyListings
        listings={popularListings}
        selectedId={selectedProperty.id}
        onSelect={(p: Property) => {
            setSelectedProperty(p);
            setShowDetail(true);
          }}
      />
      </div>
      <div className={`${showDetail ? "flex" : "hidden"} md:flex flex-1 overflow-hidden`}>
        <PropertyDetail
          property={selectedProperty!}
          onBack={() => setShowDetail(false)} // for mobile
        />
      </div>
    </div>
  );
}
