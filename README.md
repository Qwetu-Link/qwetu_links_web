This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


src/
│
├── app/                         # App Router
│   ├── (auth)/                  # Auth route group
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   │
│   ├── (dashboard)/             # Protected dashboard routes
│   │   ├── admin/
│   │   ├── landlord/
│   │   ├── caretaker/
│   │   └── tenant/
│   │
│   ├── properties/
│   │   ├── page.tsx
│   │   ├── [id]/
│   │   └── create/
│   │
│   ├── units/
│   ├── tenants/
│   ├── invoices/
│   ├── payments/
│   ├── maintenance/
│   ├── messages/
│   ├── reports/
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── not-found.tsx
│
├── app/lib/                     # Logic & utilities
│   ├── api/
│   │   ├── axios.ts
│   │   ├── auth.ts
│   │   ├── properties.ts
│   │   ├── tenants.ts
│   │   ├── invoices.ts
│   │   └── payments.ts
│   │
│   ├── utils/
│   │   ├── formatCurrency.ts
│   │   ├── formatDate.ts
│   │   ├── generateInvoice.ts
│   │   └── permissions.ts
│   │
│   ├── validations/
│   │   ├── auth.schema.ts
│   │   ├── property.schema.ts
│   │   └── tenant.schema.ts
│   │
│   └── constants/
│       ├── roles.ts
│       └── routes.ts
│
├── app/ui/                      # Shared UI components
│   ├── buttons/
│   ├── cards/
│   ├── forms/
│   ├── modals/
│   ├── tables/
│   ├── navigation/
│   ├── dashboard/
│   ├── charts/
│   ├── property/
│   ├── tenant/
│   └── invoice/
│
├── hooks/                       # Custom React hooks
│   ├── useAuth.ts
│   ├── useProperties.ts
│   ├── useInvoices.ts
│   └── usePermissions.ts
│
├── store/                       # Zustand/Context state
│   ├── auth-store.ts
│   ├── property-store.ts
│   └── ui-store.ts
│
├── types/                       # TypeScript types
│   ├── auth.types.ts
│   ├── property.types.ts
│   ├── tenant.types.ts
│   ├── invoice.types.ts
│   └── payment.types.ts
│
├── public/                      # Static assets
│   ├── images/
│   ├── logos/
│   ├── icons/
│   └── placeholders/
│
├── styles/
│   └── globals.css
│
├── middleware.ts                # Route protection
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
