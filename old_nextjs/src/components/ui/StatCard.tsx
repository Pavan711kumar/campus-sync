import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: React.ReactNode;
  accent?: boolean;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  accent = false,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5",
        accent
          ? "bg-accent text-white"
          : "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={cn("text-sm font-medium", accent ? "text-white/80" : "text-muted")}>
            {title}
          </p>
          <p className={cn("text-3xl font-bold mt-1", accent ? "text-white" : "text-foreground")}>
            {value}
          </p>
          {change && (
            <p
              className={cn(
                "text-xs font-medium mt-2",
                accent
                  ? "text-white/70"
                  : changeType === "positive"
                    ? "text-green-600"
                    : changeType === "negative"
                      ? "text-red-500"
                      : "text-muted"
              )}
            >
              {change}
            </p>
          )}
        </div>
        {icon && (
          <div
            className={cn(
              "p-3 rounded-2xl",
              accent ? "bg-white/20" : "bg-primary/10 text-primary"
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
