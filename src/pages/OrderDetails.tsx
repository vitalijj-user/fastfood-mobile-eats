import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import Container from "@/components/Container";

// Order status types
type OrderStatus = "pending" | "accepted" | "preparing" | "ready" | "completed";

const OrderDetails = () => {
  const { toast } = useToast();

  // In a real app, this would come from an API
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("pending");
  const [timeRemaining, setTimeRemaining] = useState<number>(15 * 60); // 15 minutes in seconds
  const [orderItems] = useState([
    {
      id: 1,
      name: "Чізбургер Делюкс",
      price: 199,
      quantity: 1,
    },
    {
      id: 2,
      name: "Маргарита",
      price: 289,
      quantity: 2,
    },
  ]);

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;
  const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);

  // Format time remaining as MM:SS
  const formatTimeRemaining = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Simulate order status changes
  useEffect(() => {
    // Change from pending to accepted after 5 seconds
    const acceptTimer = setTimeout(() => {
      setOrderStatus("accepted");
      toast({
        title: "Замовлення прийнято!",
        description: "Ресторан почав готувати ваше замовлення.",
      });
    }, 5000);

    // Change from accepted to preparing after 10 seconds
    const prepareTimer = setTimeout(() => {
      setOrderStatus("preparing");
      toast({
        title: "Ваше замовлення готується!",
        description: "Шеф-кухар вже працює над вашим замовленням.",
      });
    }, 15000);

    // Change from preparing to ready after 30 seconds
    const readyTimer = setTimeout(() => {
      setOrderStatus("ready");
      toast({
        title: "Замовлення готове!",
        description: "Ваше замовлення готове до видачі.",
      });
    }, 30000);

    return () => {
      clearTimeout(acceptTimer);
      clearTimeout(prepareTimer);
      clearTimeout(readyTimer);
    };
  }, [toast]);

  // Countdown timer
  useEffect(() => {
    // Only count down if the order is accepted or preparing
    if (orderStatus === "accepted" || orderStatus === "preparing") {
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

  // Status labels and progress
  const getStatusInfo = () => {
    switch (orderStatus) {
      case "pending":
        return {
          label: "Очікує підтвердження",
          progress: 10,
          color: "bg-gray-400",
        };
      case "accepted":
        return {
          label: "Прийнято",
          progress: 35,
          color: "bg-blue-500",
        };
      case "preparing":
        return {
          label: "Готується",
          progress: 65,
          color: "bg-orange-500",
        };
      case "ready":
        return {
          label: "Готове до видачі",
          progress: 90,
          color: "bg-green-500",
        };
      case "completed":
        return {
          label: "Виконано",
          progress: 100,
          color: "bg-green-600",
        };
      default:
        return {
          label: "Очікує підтвердження",
          progress: 10,
          color: "bg-gray-400",
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Деталі замовлення</h1>
          </div>
        </div>
      </header>

      <Container>
        {/* Order Status */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Статус замовлення #{orderId}</CardTitle>
            <CardDescription>
              Відстежуйте статус вашого замовлення
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="font-medium text-lg">{statusInfo.label}</div>
              {(orderStatus === "accepted" || orderStatus === "preparing") && (
                <div className="flex items-center text-orange-500 font-medium">
                  <Clock className="mr-1 h-4 w-4" />
                  {formatTimeRemaining(timeRemaining)}
                </div>
              )}
              {orderStatus === "ready" && (
                <div className="text-green-500 font-medium flex items-center">
                  <CheckCircle className="mr-1 h-4 w-4" />
                  Готове
                </div>
              )}
            </div>

            <Progress className="h-2" value={statusInfo.progress} />

            <div className="grid grid-cols-4 text-xs text-gray-500 pt-1">
              <div
                className={`text-center ${orderStatus !== "pending" ? "text-green-500 font-medium" : ""}`}
              >
                Прийнято
              </div>
              <div
                className={`text-center ${orderStatus === "preparing" || orderStatus === "ready" || orderStatus === "completed" ? "text-green-500 font-medium" : ""}`}
              >
                Готується
              </div>
              <div
                className={`text-center ${orderStatus === "ready" || orderStatus === "completed" ? "text-green-500 font-medium" : ""}`}
              >
                Готове
              </div>
              <div
                className={`text-center ${orderStatus === "completed" ? "text-green-500 font-medium" : ""}`}
              >
                Видано
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Display alert if order is ready */}
        {orderStatus === "ready" && (
          <Alert className="bg-green-50 border-green-200">
            <AlertTitle className="text-green-700">
              Ваше замовлення готове!
            </AlertTitle>
            <AlertDescription className="text-green-600">
              Будь ласка, покажіть номер замовлення при отриманні.
            </AlertDescription>
          </Alert>
        )}

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Деталі замовлення</CardTitle>
            <CardDescription>
              Перевірте деталі вашого замовлення
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-500 ml-2">x{item.quantity}</span>
                  </div>
                  <span>{item.price * item.quantity} ₴</span>
                </div>
              ))}
              <Separator className="my-2" />
              <div className="flex justify-between">
                <span className="text-gray-600">Вартість страв</span>
                <span>{subtotal} ₴</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Доставка</span>
                <span>{deliveryFee} ₴</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Всього до оплати</span>
                <span>{total} ₴</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Details */}
        <Card>
          <CardHeader>
            <CardTitle>Інформація про доставку</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Адреса</span>
                <span className="text-right">вул. Шевченка 10, кв. 5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Час доставки</span>
                <span>~30-45 хвилин</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Спосіб оплати</span>
                <span>Картка **** 3456</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Link to="/" className="block mt-4">
          <Button className="w-full">Повернутися на головну</Button>
        </Link>
      </Container>
    </div>
  );
};

export default OrderDetails;
