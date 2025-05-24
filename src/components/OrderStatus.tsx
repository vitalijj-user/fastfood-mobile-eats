
import { Clock, CheckCircle, Package, Utensils, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

type OrderStatus = "pending" | "preparing" | "ready" | "issued" | "completed";

interface OrderStatusProps {
  status: OrderStatus;
  timeRemaining?: number;
  orderId: string;
}

const OrderStatus = ({ status, timeRemaining, orderId }: OrderStatusProps) => {
  // Format time remaining as MM:SS
  const formatTimeRemaining = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Status configuration
  const getStatusConfig = () => {
    switch (status) {
      case "pending":
        return {
          label: "Нове замовлення",
          description: "Очікує на обробку",
          progress: 10,
          color: "bg-amber-500",
          badgeVariant: "secondary" as const,
          icon: Clock,
          iconColor: "text-amber-600",
        };
      case "preparing":
        return {
          label: "Готується",
          description: "Замовлення готується на кухні",
          progress: 40,
          color: "bg-blue-500",
          badgeVariant: "default" as const,
          icon: Utensils,
          iconColor: "text-blue-600",
        };
      case "ready":
        return {
          label: "Готово",
          description: "Замовлення готове до видачі",
          progress: 70,
          color: "bg-green-500",
          badgeVariant: "default" as const,
          icon: Package,
          iconColor: "text-green-600",
        };
      case "issued":
        return {
          label: "Видано",
          description: "Замовлення видано клієнту",
          progress: 90,
          color: "bg-purple-500",
          badgeVariant: "default" as const,
          icon: Truck,
          iconColor: "text-purple-600",
        };
      case "completed":
        return {
          label: "Виконано",
          description: "Замовлення отримане",
          progress: 100,
          color: "bg-green-600",
          badgeVariant: "default" as const,
          icon: CheckCircle,
          iconColor: "text-green-600",
        };
      default:
        return {
          label: "Невідомий статус",
          description: "",
          progress: 0,
          color: "bg-gray-400",
          badgeVariant: "secondary" as const,
          icon: Clock,
          iconColor: "text-gray-600",
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full ${statusConfig.color} bg-opacity-20`}>
            <StatusIcon className={`h-6 w-6 ${statusConfig.iconColor}`} />
          </div>
          <div>
            <h2 className="text-xl font-bold">{statusConfig.label}</h2>
            <p className="text-gray-600 text-sm">{statusConfig.description}</p>
          </div>
        </div>
        <Badge variant={statusConfig.badgeVariant}>
          #{orderId}
        </Badge>
      </div>

      {/* Timer Display for Preparing Orders */}
      {status === "preparing" && timeRemaining && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <span className="text-2xl font-mono font-bold text-orange-700">
              {formatTimeRemaining(timeRemaining)}
            </span>
          </div>
          <p className="text-center text-orange-600 text-sm mt-1">
            Орієнтовний час до готовності
          </p>
        </div>
      )}

      {/* Ready Alert */}
      {status === "ready" && (
        <Alert className="bg-green-50 border-green-200 animate-pulse">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-700">
            Ваше замовлення готове!
          </AlertTitle>
          <AlertDescription className="text-green-600">
            Покажіть номер замовлення при отриманні: <strong>#{orderId}</strong>
          </AlertDescription>
        </Alert>
      )}

      {/* Issued Alert */}
      {status === "issued" && (
        <Alert className="bg-purple-50 border-purple-200">
          <Truck className="h-4 w-4 text-purple-600" />
          <AlertTitle className="text-purple-700">
            Замовлення видано!
          </AlertTitle>
          <AlertDescription className="text-purple-600">
            Ваше замовлення було успішно видано
          </AlertDescription>
        </Alert>
      )}

      {/* Completed Alert */}
      {status === "completed" && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-700">
            Замовлення завершено!
          </AlertTitle>
          <AlertDescription className="text-green-600">
            Дякуємо за ваше замовлення!
          </AlertDescription>
        </Alert>
      )}

      {/* Progress Bar */}
      <div className="space-y-3">
        <Progress 
          className="h-3" 
          value={statusConfig.progress}
        />
        
        {/* Status Steps */}
        <div className="grid grid-cols-5 text-xs">
          <div className={`text-center ${status !== "pending" ? "text-green-600 font-semibold" : "text-gray-400"}`}>
            <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${status !== "pending" ? "bg-green-500" : "bg-gray-300"}`}></div>
            Прийнято
          </div>
          <div className={`text-center ${status === "preparing" || status === "ready" || status === "issued" || status === "completed" ? "text-green-600 font-semibold" : "text-gray-400"}`}>
            <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${status === "preparing" || status === "ready" || status === "issued" || status === "completed" ? "bg-green-500" : "bg-gray-300"}`}></div>
            Готується
          </div>
          <div className={`text-center ${status === "ready" || status === "issued" || status === "completed" ? "text-green-600 font-semibold" : "text-gray-400"}`}>
            <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${status === "ready" || status === "issued" || status === "completed" ? "bg-green-500" : "bg-gray-300"}`}></div>
            Готове
          </div>
          <div className={`text-center ${status === "issued" || status === "completed" ? "text-green-600 font-semibold" : "text-gray-400"}`}>
            <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${status === "issued" || status === "completed" ? "bg-green-500" : "bg-gray-300"}`}></div>
            Видано
          </div>
          <div className={`text-center ${status === "completed" ? "text-green-600 font-semibold" : "text-gray-400"}`}>
            <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${status === "completed" ? "bg-green-500" : "bg-gray-300"}`}></div>
            Виконано
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
