interface KpiCardProps {
  title: string;
  value?: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  placeholder?: boolean;
}

export default function KpiCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  placeholder = false,
}: KpiCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
          {icon}
        </div>
        {placeholder && (
          <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
            Pending API
          </span>
        )}
        {!placeholder && trend && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              trend === "up"
                ? "text-green-700 bg-green-50"
                : trend === "down"
                ? "text-red-700 bg-red-50"
                : "text-gray-600 bg-gray-100"
            }`}
          >
            {trend === "up" ? "+" : trend === "down" ? "-" : "~"}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900 tabular-nums">
        {placeholder ? (
          <span className="text-gray-300">&mdash;</span>
        ) : (
          value
        )}
      </p>
      <p className="text-xs text-gray-500 mt-1">{title}</p>
      {subtitle && (
        <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
      )}
    </div>
  );
}
