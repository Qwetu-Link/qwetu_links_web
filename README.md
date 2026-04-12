# React + TypeScript + Vite

## The Project Structure
src/
│
├── app/                        # App-wide setup
│   ├── router.tsx
│   ├── providers.tsx
│   ├── store.ts               # Zustand / Redux
│   └── queryClient.ts         # React Query config
│
├── config/                    # Global configs
│   ├── env.ts
│   ├── routes.ts
│   └── constants.ts
│
├── lib/                       # External libs setup
│   ├── axios.ts               # API instance
│   ├── react-query.ts
│   └── utils.ts
│
├── components/                # Global reusable UI
│   ├── ui/                    # shadcn components
│   └── common/
│       ├── Loader.tsx
│       ├── EmptyState.tsx
│       ├── ConfirmDialog.tsx
│       ├── PageHeader.tsx
│       └── DataTableWrapper.tsx
│
├── layouts/                   # Layout system
│   ├── DashboardLayout.tsx
│   ├── AuthLayout.tsx
│   └── MinimalLayout.tsx
│
├── features/                  # 🔥 BUSINESS DOMAINS
│
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   │
│   │   ├── services/
│   │   │   └── auth.api.ts
│   │   │
│   │   ├── store/
│   │   │   └── auth.store.ts
│   │   │
│   │   ├── types.ts
│   │   └── routes.tsx
│
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── StatsCard.tsx
│   │   │   └── RevenueChart.tsx
│   │   │
│   │   ├── hooks/
│   │   ├── services/
│   │   │   └── dashboard.api.ts
│   │   │
│   │   ├── pages/
│   │   │   └── DashboardPage.tsx
│   │   └── types.ts
│
│   ├── tenants/
│   │   ├── components/
│   │   │   ├── TenantTable.tsx
│   │   │   ├── TenantForm.tsx
│   │   │   └── TenantCard.tsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useTenants.ts
│   │   │
│   │   ├── services/
│   │   │   └── tenant.api.ts
│   │   │
│   │   ├── store/
│   │   │   └── tenant.store.ts
│   │   │
│   │   ├── pages/
│   │   │   ├── TenantsPage.tsx
│   │   │   ├── TenantDetailsPage.tsx
│   │   │   └── TenantEditPage.tsx
│   │   │
│   │   ├── types.ts
│   │   └── routes.tsx
│
│   ├── properties/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── pages/
│   │   ├── store/
│   │   └── types.ts
│
│   ├── units/
│   │   ├── components/       # UI only
│   │   ├── hooks/            # logic (React Query, etc.)
│   │   ├── services/         # API calls
│   │   ├── store/            # Zustand/Redux state
│   │   ├── pages/            # route screens
│   │   ├── types.ts          # types for this feature
│   │   └── routes.tsx        # feature routes
│   
│   ├── payments/
│   ├── maintenance/
│   ├── messaging/
│   ├── reports/
│
│   └── notifications/
│
├── hooks/                     # Global hooks
│   ├── useDebounce.ts
│   ├── usePagination.ts
│   └── useDisclosure.ts
│
├── types/                     # Global shared types
│   ├── api.types.ts
│   └── common.types.ts
│
├── utils/                     # Helpers
│   ├── formatCurrency.ts
│   ├── formatDate.ts
│   └── validators.ts
│
├── styles/                    # Global styles
│   └── globals.css
│
├── App.tsx
└── main.tsx