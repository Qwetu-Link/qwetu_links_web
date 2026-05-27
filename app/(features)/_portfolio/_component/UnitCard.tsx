// import React from "react";
// import { Bed, Bath, Car, Maximize } from "lucide-react";
// import Image from "next/image";

// type Unit = {
//   id: string;
//   title: string;
//   description: string;
//   size: string;
//   price: number;
//   status: "Available" | "Reserved";
//   imageUrl: string;
//   bedrooms: number;
//   bathrooms: number;
//   parking: number;
// };

// const unitsData: Unit[] = [
//   {
//     id: "4B",
//     title: "Unit 4B",
//     description: "2 Bedroom, 2 Bath",
//     size: "85 m²",
//     price: 45000,
//     status: "Available",
//     imageUrl:
//       "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80",
//     bedrooms: 2,
//     bathrooms: 2,
//     parking: 1,
//   },
//   {
//     id: "5A",
//     title: "Unit 5A",
//     description: "3 Bedroom, 2 Bath",
//     size: "110 m²",
//     price: 60000,
//     status: "Reserved",
//     imageUrl:
//       "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80",
//     bedrooms: 3,
//     bathrooms: 2,
//     parking: 2,
//   },
//   {
//     id: "3C",
//     title: "Unit 3C",
//     description: "1 Bedroom, 1 Bath",
//     size: "55 m²",
//     price: 30000,
//     status: "Available",
//     imageUrl:
//       "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=400&q=80",
//     bedrooms: 1,
//     bathrooms: 1,
//     parking: 0,
//   },
//   {
//     id: "2D",
//     title: "Unit 2D",
//     description: "Studio Loft",
//     size: "45 m²",
//     price: 25000,
//     status: "Available",
//     imageUrl:
//       "https://images.unsplash.com/photo-1536376074432-8d63d592967c?auto=format&fit=crop&w=400&q=80",
//     bedrooms: 0,
//     bathrooms: 1,
//     parking: 1,
//   },
// ];

// export default function UnitCard =({ unit }) => {
//   return (
//     <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
//       <div className="relative h-44 sm:h-48 md:h-40 lg:h-44 xl:h-48">
//         <Image
//           src={unit.imageUrl}
//           alt={`${unit.title} layout`}
//           className="w-full h-full object-cover"
//           loading="eager"
//           width={400}
//           height={300}
//         />
//         <span
//           className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold uppercase ${
//             unit.status === "Available"
//               ? "bg-green-600 text-white"
//               : "bg-yellow-400 text-gray-900"
//           }`}
//         >
//           {unit.status}
//         </span>
//       </div>
//       <div className="p-4 flex flex-col flex-grow">
//         <div className="flex justify-between items-baseline mb-1">
//           <h3 className="text-lg font-semibold text-gray-900">{unit.title}</h3>
//           <span className="text-blue-600 font-bold text-lg">
//             KES {unit.price.toLocaleString()}
//             <small className="text-sm font-normal text-gray-600">/month</small>
//           </span>
//         </div>
//         <p className="text-gray-600 text-sm mb-3">{unit.description}</p>
//         <div className="grid grid-cols-2 gap-3 border-t border-gray-200 pt-3 mb-4 text-gray-700 text-sm">
//           <div className="flex items-center gap-1">
//             <Bed size={16} />
//             <span>
//               {unit.bedrooms} Bedroom{unit.bedrooms !== 1 ? "s" : ""}
//             </span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Bath size={16} />
//             <span>
//               {unit.bathrooms} Bathroom{unit.bathrooms !== 1 ? "s" : ""}
//             </span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Car size={16} />
//             <span>
//               {unit.parking} Parking Spot{unit.parking !== 1 ? "s" : ""}
//             </span>
//           </div>
//           <div className="flex items-center gap-1">
//             <Maximize size={16} />
//             <span>{unit.size}</span>
//           </div>
//         </div>
//         <button
//           onClick={() => alert(`Viewing details for ${unit.title}`)}
//           className="mt-auto w-full py-2 border border-blue-600 text-blue-600 font-semibold rounded hover:bg-blue-600 hover:text-white transition-colors duration-200"
//           type="button"
//         >
//           View Unit Details
//         </button>
//       </div>
//     </div>
//   );
// };
