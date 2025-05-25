import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import NavigateHeader from "@/components/NavigateHeader";
import OrderStatus from "./OrderStatus";
import { LayoutCard } from "@/components/LayoutCard";
import OrderSummary from "./OrderSummary";

const OrderDetails = () => {
  const orderItems = [
    { id: 1, name: "Чізбургер Делюкс", price: 199, quantity: 1 },
    { id: 2, name: "Маргарита", price: 289, quantity: 2 },
  ];

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;
  const orderId = "ORD-123";

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigateHeader title="Деталі замовлення" link="/" />

      <Container>
        <LayoutCard
          title="Статус замовлення"
          description="Відстежуйте поточний стан вашого замовлення"
          content={<OrderStatus orderId={orderId} />}
        />

        <LayoutCard
          title="Деталі замовлення"
          description="Перевірте склад вашого замовлення"
          content={
            <OrderSummary
              orderItems={orderItems}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
            />
          }
        />

        <Link to="/" className="block">
          <Button className="w-full">Повернутися на головну</Button>
        </Link>
      </Container>
    </div>
  );
};

export default OrderDetails;
