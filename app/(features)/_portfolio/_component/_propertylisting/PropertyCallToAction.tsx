// import Image from "next/image";
// import Link from "next/link";
// import { contactActions } from "../propertyData";

// export default function PropertyCallToAction() {
//   return (
//     <section className="py-20 bg-rental-bg-light">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="rounded-md p-3">
//           <div className="rounded-md border border-dashed border-rental-border bg-white p-6 sm:p-8">
//             <div className="grid items-center gap-10 lg:grid-cols-2">
//               <Image
//                 src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80"
//                 alt="Certified property agent"
//                 width={900}
//                 height={620}
//                 className="h-[360px] w-full rounded-md object-cover"
//                 unoptimized
//               />
//               <div>
//                 <h2 className="text-3xl font-bold text-brand-dark sm:text-4xl">
//                   Contact Our Certified Agent
//                 </h2>
//                 <p className="mt-4 leading-8 text-slate-600">
//                   Speak with a trusted property specialist for viewing support,
//                   listing details, pricing guidance, and the next steps toward
//                   securing your preferred property.
//                 </p>
//                 <div className="mt-7 flex flex-wrap gap-3">
//                   {contactActions.map((action, index) => (
//                     <Link
//                       key={action.label}
//                       href={action.href}
//                       className={`inline-flex items-center gap-2 rounded-md px-5 py-3 font-semibold text-white transition ${
//                         index === 0
//                           ? "bg-rental-primary hover:bg-orange-600"
//                           : "bg-brand-dark hover:bg-slate-800"
//                       }`}
//                     >
//                       <action.icon className="h-4 w-4" />
//                       {action.label}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
