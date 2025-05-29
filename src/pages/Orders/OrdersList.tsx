
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { OrderStatus } from "../OrderDetails/OrderStatus/types";

interface OrderItem {
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
}

interface Props {
  orders: Order[];
}

const getStatusText = (status: OrderStatus) => {
  const statusMap = {
    pending: "Нове",
    preparing: "Готується", 
    ready: "Готово",
    completed: "Виконано",
  };
  return statusMap[status];
};

const getStatusVariant = (status: OrderStatus) => {
  const variantMap = {
    pending: "secondary" as const,
    preparing: "default" as const,
    ready: "outline" as const, 
    completed: "secondary" as const,
  };
  return variantMap[status];
};

const OrdersList = ({ orders }: Props) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">У вас поки немає замовлень</p>
        <Link to="/">
          <Button>Зробити замовлення</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-gray-900">
                Замовлення {order.id}
              </h3>
              <p className="text-sm text-gray-500">{order.date}</p>
            </div>
            <Badge variant={getStatusVariant(order.status)}>
              {getStatusText(order.status)}
            </Badge>
          </div>

          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-1">Склад замовлення:</p>
            <div className="text-sm text-gray-800">
              {order.items.map((item, index) => (
                <span key={index}>
                  {item.name} x{item.quantity}
                  {index < order.items.length - 1 && ", "}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="font-semibold text-lg">
              {order.total} ₴
            </div>
            <Link to="/order-details">
              <Button variant="outline" size="sm">
                Деталі
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;
