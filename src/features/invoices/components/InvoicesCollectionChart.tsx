import { memo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function InvoicesCollectionChart({
  collectionData,
}: {
  collectionData: { month: string; expected: number; collected: number }[];
}) {
  return (
    <div className="space-y-6">
      {/* Collection Chart */}
      <div className="bg-background border border-border rounded-lg p-6">
        <div className="mb-4">
          <h2 className="font-semibold">Collection Performance</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Expected vs. actual collections
          </p>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={collectionData}>
            <defs>
              <linearGradient id="colorExpected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "12px",
              }}
              formatter={(value) => {
                const amount =
                  typeof value === "number" ? value : Number(value || 0);
                return `KES ${amount.toLocaleString()}`;
              }}
            />
            <Area
              type="monotone"
              dataKey="expected"
              stroke="#94a3b8"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorExpected)"
              name="Expected"
            />
            <Area
              type="monotone"
              dataKey="collected"
              stroke="#22c55e"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCollected)"
              name="Collected"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Collection Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-background border border-border rounded-lg p-6">
          <h3 className="font-semibold mb-4">Collection Rate</h3>
          <div className="text-center">
            <p className="text-4xl font-semibold text-green-600 mb-2">94%</p>
            <p className="text-sm text-muted-foreground">This month</p>
          </div>
        </div>
        <div className="bg-background border border-border rounded-lg p-6">
          <h3 className="font-semibold mb-4">Default Rate</h3>
          <div className="text-center">
            <p className="text-4xl font-semibold text-red-600 mb-2">3.2%</p>
            <p className="text-sm text-muted-foreground">Last 90 days</p>
          </div>
        </div>
        <div className="bg-background border border-border rounded-lg p-6">
          <h3 className="font-semibold mb-4">Avg Plan Value</h3>
          <div className="text-center">
            <p className="text-4xl font-semibold text-blue-600 mb-2">KES 12K</p>
            <p className="text-sm text-muted-foreground">Per customer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(InvoicesCollectionChart);