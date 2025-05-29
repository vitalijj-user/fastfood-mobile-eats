
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import NavigateHeader from "@/components/NavigateHeader";
import { LayoutCard } from "@/components/LayoutCard";
import OrdersList from "./OrdersList";

const Orders = () => {
  const orders = [
    {
      id: "ORD-123",
      date: "2025-05-29",
      status: "completed" as const,
      total: 777,
      items: [
        { name: "Чізбургер Делюкс", quantity: 1 },
        { name: "Маргарита", quantity: 2 },
      ],
    },
    {
      id: "ORD-124",
      date: "2025-05-28", 
      status: "ready" as const,
      total: 450,
      items: [
        { name: "Пепероні", quantity: 1 },
        { name: "Кола", quantity: 1 },
      ],
    },
    {
      id: "ORD-125",
      date: "2025-05-27",
      status: "preparing" as const,
      total: 320,
      items: [
        { name: "Цезар салат", quantity: 1 },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigateHeader title="Мої замовлення" link="/" />

      <Container>
        <LayoutCard
          title="Історія замовлень"
          description="Переглядайте ваші попередні та поточні замовлення"
          content={<OrdersList orders={orders} />}
        />

        <Link to="/" className="block">
          <Button className="w-full" variant="outline">
            Повернутися на головну
          </Button>
        </Link>
      </Container>
    </div>
  );
};

export default Orders;
