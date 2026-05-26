"use client";

import { Building, DoorOpen, Home, User2 } from "lucide-react";

export default function CatalogStatsCards() {
  const cards = [
    {
      icon: Building,
      label: "Total Apartments",
      value: 12,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      icon: Home,
      label: "Occupied Units",
      value: 30,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: DoorOpen,
      label: "Vacant Units",
      value: 40,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      icon: User2,
      label: "Total Tenants",
      value: 50,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-md border border-gray-100 p-5 shadow-sm"
        >
          <div className="mb-4 flex items-center justify-between gap-2">
            <div
              className={`text-lg ${card.bg} w-10 h-10 rounded-lg flex items-center justify-center`}
            >
              <card.icon size={20} className={card.color} />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{card.value}</p>
          <p className={`mt-1 text-sm font-semibold ${card.color}`}>
            {card.label}
          </p>
        </div>
      ))}
    </div>
  );
}
