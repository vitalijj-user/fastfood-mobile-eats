import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export type OrderStatusType = "pending" | "preparing" | "ready" | "completed";

export const useOrderStatus = () => {
  const { toast } = useToast();

  const [orderStatus, setOrderStatus] = useState<OrderStatusType>("pending");
  const [timeRemaining, setTimeRemaining] = useState<number>(15 * 60); // 15 хв у секундах

  // Емуляція зміни статусу
  useEffect(() => {
    const prepareTimer = setTimeout(() => {
      setOrderStatus("preparing");
      toast({
        title: "Замовлення готується!",
        description: "Шеф-кухар почав готувати ваше замовлення.",
      });
    }, 5000);

    const readyTimer = setTimeout(() => {
      setOrderStatus("ready");
      toast({
        title: "Замовлення готове!",
        description: "Ваше замовлення готове до видачі.",
      });
    }, 20000);

    const completedTimer = setTimeout(() => {
      setOrderStatus("completed");
      toast({
        title: "Замовлення завершено!",
        description: "Дякуємо за ваше замовлення!",
      });
    }, 35000);

    return () => {
      clearTimeout(prepareTimer);
      clearTimeout(readyTimer);
      clearTimeout(completedTimer);
    };
  }, [toast]);

  // Зворотний відлік
  useEffect(() => {
    if (orderStatus === "preparing") {
      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [orderStatus]);

  return {
    orderStatus,
    timeRemaining,
  };
};
