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
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Container from "@/components/Container";
import NavigateHeader from "@/components/NavigateHeader";
import OrderStatus from "@/components/OrderStatus";

// Order status types - renamed to avoid conflict with component
type OrderStatusType = "pending" | "preparing" | "ready" | "completed";

const OrderDetails = () => {
  const { toast } = useToast();

  // In a real app, this would come from an API
  const [orderStatus, setOrderStatus] = useState<OrderStatusType>("pending");
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

  // Simulate order status changes
  useEffect(() => {
    // Change from pending to preparing after 5 seconds
    const prepareTimer = setTimeout(() => {
      setOrderStatus("preparing");
      toast({
        title: "Замовлення готується!",
        description: "Шеф-кухар почав готувати ваше замовлення.",
      });
    }, 5000);

    // Change from preparing to ready after 15 seconds
    const readyTimer = setTimeout(() => {
      setOrderStatus("ready");
      toast({
        title: "Замовлення готове!",
        description: "Ваше замовлення готове до видачі.",
      });
    }, 20000);

    // Change from ready to completed after 30 seconds
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

  // Countdown timer
  useEffect(() => {
    // Only count down if the order is preparing
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

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigateHeader title="Деталі замовлення" link="/" />

      <Container>
        {/* Order Status Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Статус замовлення</CardTitle>
            <CardDescription>
              Відстежуйте поточний стан вашого замовлення
            </CardDescription>
          </CardHeader>
          <CardContent>
            <OrderStatus 
              status={orderStatus} 
              timeRemaining={timeRemaining}
              orderId={orderId}
            />
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Деталі замовлення</CardTitle>
            <CardDescription>
              Перевірте склад вашого замовлення
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-2"
                >
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-500 ml-2">x{item.quantity}</span>
                  </div>
                  <span className="font-semibold">{item.price * item.quantity} ₴</span>
                </div>
              ))}
              <Separator className="my-3" />
              <div className="flex justify-between text-gray-600">
                <span>Вартість страв</span>
                <span>{subtotal} ₴</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Доставка</span>
                <span>{deliveryFee} ₴</span>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between font-bold text-lg">
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
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Адреса доставки</span>
                <span className="text-right font-medium">вул. Шевченка 10, кв. 5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Орієнтовний час</span>
                <span className="font-medium">30-45 хвилин</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Спосіб оплати</span>
                <span className="font-medium">Картка **** 3456</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Link to="/" className="block">
          <Button className="w-full bg-orange-500 hover:bg-orange-600">
            Повернутися на головну
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default OrderDetails;
