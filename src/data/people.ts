// import a1 from "@/assets/avatar-1.jpg";
// import a2 from "@/assets/avatar-2.jpg";
// import a3 from "@/assets/avatar-3.jpg";
// import a4 from "@/assets/avatar-4.jpg";
// import a5 from "@/assets/avatar-5.jpg";
// import a6 from "@/assets/avatar-6.jpg";
// import a7 from "@/assets/avatar-7.jpg";
// import a8 from "@/assets/avatar-8.jpg";
// import a9 from "@/assets/avatar-9.jpg";
// import a10 from "@/assets/avatar-10.jpg";
// import a11 from "@/assets/avatar-11.jpg";
// import a12 from "@/assets/avatar-12.jpg";
// import type { Tenant } from "@/components/TenantCard";

// const slug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

// export const tenants: (Tenant & { id: string; email: string; address: string; rent: number; since: string })[] = [
//   { name: "Ronald Richards", phone: "+1 888-888-8888", avatar: a1, properties: 5, unit: 10, lease: "Multi manual", status: "active" },
//   { name: "Leslie Alexander", phone: "+1 888-888-8888", avatar: a2, properties: 5, unit: 10, lease: "Multi manual", status: "active" },
//   { name: "Darlene Robertson", phone: "+1 888-888-8888", avatar: a3, properties: 5, unit: 10, lease: "Multi manual", status: "active" },
//   { name: "Jenny Wilson", phone: "+1 888-888-8888", avatar: a4, properties: 5, unit: 10, lease: "Multi manual", status: "active" },
//   { name: "Arlene McCoy", phone: "+1 888-888-8888", avatar: a5, properties: 5, unit: 10, lease: "Multi manual", status: "active" },
//   { name: "Esther Howard", phone: "+1 888-888-8888", avatar: a6, properties: 5, unit: 10, lease: "Multi manual", status: "active" },
//   { name: "Guy Hawkins", phone: "+1 888-888-8888", avatar: a7, properties: 5, unit: 10, lease: "Multi manual", status: "active" },
//   { name: "Marvin McKinney", phone: "+1 888-888-8888", avatar: a8, properties: 5, unit: 10, lease: "Multi manual", status: "active" },
//   { name: "Jacob Jones", phone: "+1 888-888-8888", avatar: a9, properties: 5, unit: 10, lease: "Multi manual", status: "active" },
//   { name: "Dianne Russell", phone: "+1 888-888-8888", avatar: a10, properties: 5, unit: 10, lease: "Multi manual", status: "active" },
//   { name: "Cameron Williamson", phone: "+1 888-888-8888", avatar: a11, properties: 5, unit: 10, lease: "Multi manual", status: "active" },
//   { name: "Brooklyn Simmons", phone: "+1 888-888-8888", avatar: a12, properties: 5, unit: 10, lease: "Multi manual", status: "active" },
// ].map((t, i) => ({
//   ...t,
//   id: slug(t.name),
//   email: `${t.name.split(" ")[0].toLowerCase()}@primestay.com`,
//   address: `${100 + i * 7} Maple Avenue, Apt ${t.unit}`,
//   rent: 1200 + i * 75,
//   since: `Jan ${2019 + (i % 5)}`,
// }));

// export const owners: (Tenant & { id: string; email: string; address: string; rent: number; since: string })[] = [
//   { name: "Wade Warren", phone: "+1 888-101-2233", avatar: a2, properties: 12, unit: 28, lease: "Owner equity", status: "active" },
//   { name: "Kathryn Murphy", phone: "+1 888-101-2244", avatar: a4, properties: 8, unit: 16, lease: "Owner equity", status: "active" },
//   { name: "Albert Flores", phone: "+1 888-101-2255", avatar: a8, properties: 4, unit: 9, lease: "Owner equity", status: "active" },
//   { name: "Eleanor Pena", phone: "+1 888-101-2266", avatar: a6, properties: 6, unit: 12, lease: "Owner equity", status: "active" },
//   { name: "Theresa Webb", phone: "+1 888-101-2277", avatar: a10, properties: 3, unit: 5, lease: "Owner equity", status: "active" },
//   { name: "Floyd Miles", phone: "+1 888-101-2288", avatar: a7, properties: 9, unit: 22, lease: "Owner equity", status: "active" },
//   { name: "Courtney Henry", phone: "+1 888-101-2299", avatar: a3, properties: 2, unit: 4, lease: "Owner equity", status: "active" },
//   { name: "Savannah Nguyen", phone: "+1 888-101-2300", avatar: a12, properties: 7, unit: 14, lease: "Owner equity", status: "active" },
// ].map((t, i) => ({
//   ...t,
//   id: slug(t.name),
//   email: `${t.name.split(" ")[0].toLowerCase()}@primestay.com`,
//   address: `${200 + i * 11} Oak Street, Suite ${t.unit}`,
//   rent: 0,
//   since: `Mar ${2017 + (i % 6)}`,
// }));

// export const findPerson = (id: string) =>
//   tenants.find((t) => t.id === id) ?? owners.find((o) => o.id === id);
