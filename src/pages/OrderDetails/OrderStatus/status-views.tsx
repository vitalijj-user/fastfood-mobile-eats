import { Clock, CheckCircle, Package, Utensils } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { BaseLayout } from "./BaseLayout";

const formatTimeRemaining = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

export const PendingStatusUI = ({ orderId }: { orderId: string }) => (
  <BaseLayout
    icon={Clock}
    label="Нове замовлення"
    description="Очікує на обробку"
    color="bg-amber-500"
    iconColor="text-amber-600"
    badgeVariant="secondary"
    progress={25}
    orderId={orderId}
    step="pending"
  />
);

export const PreparingStatusUI = ({
  orderId,
  timeRemaining,
}: {
  orderId: string;
  timeRemaining?: number;
}) => (
  <BaseLayout
    icon={Utensils}
    label="Готується"
    description="Замовлення готується на кухні"
    color="bg-blue-500"
    iconColor="text-blue-600"
    badgeVariant="default"
    progress={50}
    orderId={orderId}
    step="preparing"
  >
    {timeRemaining && (
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-4">
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
  </BaseLayout>
);

export const ReadyStatusUI = ({ orderId }: { orderId: string }) => (
  <BaseLayout
    icon={Package}
    label="Готово"
    description="Замовлення готове до видачі"
    color="bg-green-500"
    iconColor="text-green-600"
    badgeVariant="default"
    progress={75}
    orderId={orderId}
    step="ready"
  >
    <Alert className="bg-green-50 border-green-200 animate-pulse mt-4">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <AlertTitle className="text-green-700">
        Ваше замовлення готове!
      </AlertTitle>
      <AlertDescription className="text-green-600">
        Покажіть номер замовлення при отриманні: <strong>#{orderId}</strong>
      </AlertDescription>
    </Alert>
  </BaseLayout>
);

export const CompletedStatusUI = ({ orderId }: { orderId: string }) => (
  <BaseLayout
    icon={CheckCircle}
    label="Виконано"
    description="Замовлення отримане"
    color="bg-green-600"
    iconColor="text-green-600"
    badgeVariant="default"
    progress={100}
    orderId={orderId}
    step="completed"
  >
    <Alert className="bg-green-50 border-green-200 mt-4">
      <CheckCircle className="h-4 w-4 text-green-600" />
      <AlertTitle className="text-green-700">Замовлення завершено!</AlertTitle>
      <AlertDescription className="text-green-600">
        Дякуємо за ваше замовлення!
      </AlertDescription>
    </Alert>
  </BaseLayout>
);
