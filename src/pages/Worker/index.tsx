
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle, X, Eye } from "lucide-react";
import { OrderStatus } from "../OrderDetails/OrderStatus/types";
import OrderDetailsModal from "./OrderDetailsModal";

interface WorkerOrder {
  id: string;
  customerName: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: OrderStatus;
  orderTime: string;
  estimatedTime?: number;
}

const Worker = () => {
  const [selectedOrder, setSelectedOrder] = useState<WorkerOrder | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data for worker orders
  const [orders, setOrders] = useState<WorkerOrder[]>([
    {
      id: "ORD-126",
      customerName: "John Doe", 
      items: [
        { name: "Deluxe Cheeseburger", quantity: 1, price: 199 },
        { name: "Margherita", quantity: 2, price: 289 }
      ],
      total: 777,
      status: "pending",
      orderTime: "14:30",
    },
    {
      id: "ORD-127",
      customerName: "Jane Smith",
      items: [
        { name: "Caesar Salad", quantity: 1, price: 159 }
      ],
      total: 209,
      status: "preparing",
      orderTime: "14:25",
      estimatedTime: 15,
    },
    {
      id: "ORD-128", 
      customerName: "Mike Johnson",
      items: [
        { name: "Margherita", quantity: 1, price: 289 }
      ],
      total: 339,
      status: "ready",
      orderTime: "14:15",
    }
  ]);

  const handleAcceptOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: "preparing" as OrderStatus, estimatedTime: 20 }
        : order
    ));
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  const handleCompleteOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: "ready" as OrderStatus }
        : order
    ));
  };

  const handleViewDetails = (order: WorkerOrder) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch(status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "preparing": return "bg-blue-100 text-blue-800";  
      case "ready": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch(status) {
      case "pending": return "Нове";
      case "preparing": return "Готується";
      case "ready": return "Готове";
      default: return status;
    }
  };

  const filterOrdersByStatus = (status: OrderStatus) => {
    return orders.filter(order => order.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-none px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Панель працівника</h1>
          <p className="text-gray-600">Керування замовленнями ресторану</p>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="pending" className="text-lg py-3">
              Нові замовлення ({filterOrdersByStatus("pending").length})
            </TabsTrigger>
            <TabsTrigger value="preparing" className="text-lg py-3">
              Готуються ({filterOrdersByStatus("preparing").length})
            </TabsTrigger>
            <TabsTrigger value="ready" className="text-lg py-3">
              Готові ({filterOrdersByStatus("ready").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filterOrdersByStatus("pending").map((order) => (
                <Card key={order.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <p className="text-sm text-gray-600">{order.customerName}</p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Позиції:</p>
                      {order.items.map((item, index) => (
                        <p key={index} className="text-sm">
                          {item.name} x{item.quantity}
                        </p>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">₴{order.total}</span>
                      <span className="text-sm text-gray-500">{order.orderTime}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleAcceptOrder(order.id)}
                        className="flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Прийняти
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDetails(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="preparing" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filterOrdersByStatus("preparing").map((order) => (
                <Card key={order.id} className="hover:shadow-lg transition-shadow border-blue-200">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <p className="text-sm text-gray-600">{order.customerName}</p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {order.estimatedTime && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-blue-700">
                            Залишилося: {order.estimatedTime} хв
                          </span>
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Позиції:</p>
                      {order.items.map((item, index) => (
                        <p key={index} className="text-sm">
                          {item.name} x{item.quantity}
                        </p>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">₴{order.total}</span>
                      <span className="text-sm text-gray-500">{order.orderTime}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => handleCompleteOrder(order.id)}
                        className="flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Готово
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDetails(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ready" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filterOrdersByStatus("ready").map((order) => (
                <Card key={order.id} className="hover:shadow-lg transition-shadow border-green-200">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{order.id}</CardTitle>
                        <p className="text-sm text-gray-600">{order.customerName}</p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-green-700 font-medium">
                        Замовлення готове до видачі
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Позиції:</p>
                      {order.items.map((item, index) => (
                        <p key={index} className="text-sm">
                          {item.name} x{item.quantity}
                        </p>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">₴{order.total}</span>
                      <span className="text-sm text-gray-500">{order.orderTime}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewDetails(order)}
                        className="flex-1"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Деталі
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <OrderDetailsModal 
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Worker;
