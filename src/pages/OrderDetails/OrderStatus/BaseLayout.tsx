import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { LucideIcon } from "lucide-react";
import { ReactNode } from "react";
import type { OrderStatus } from "./types";

interface Props {
  icon: LucideIcon;
  label: string;
  description: string;
  color: string;
  iconColor: string;
  badgeVariant: "default" | "secondary";
  progress: number;
  orderId: string;
  children?: ReactNode;
  step: OrderStatus;
}

export const BaseLayout = ({
  icon: Icon,
  label,
  description,
  color,
  iconColor,
  badgeVariant,
  progress,
  orderId,
  children,
  step,
}: Props) => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div>
          <h2 className="text-xl font-bold">{label}</h2>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
      <Badge variant={badgeVariant}>#{orderId}</Badge>
    </div>

    {children}

    {/* Progress Bar */}
    <div className="space-y-3">
      <Progress className="h-3" value={progress} />
      <div className="grid grid-cols-4 text-xs">
        {["pending", "preparing", "ready", "completed"].map((s) => (
          <div
            key={s}
            className={`text-center ${
              isActiveStep(step, s as OrderStatus)
                ? "text-green-600 font-semibold"
                : "text-gray-400"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full mx-auto mb-1 ${
                isActiveStep(step, s as OrderStatus)
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            ></div>
            {getStepLabel(s as OrderStatus)}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const isActiveStep = (current: OrderStatus, step: OrderStatus) => {
  const order = ["pending", "preparing", "ready", "completed"];
  return order.indexOf(current) >= order.indexOf(step);
};

const getStepLabel = (step: OrderStatus) => {
  switch (step) {
    case "pending":
      return "Нове";
    case "preparing":
      return "Готується";
    case "ready":
      return "Готово";
    case "completed":
      return "Виконано";
  }
};
