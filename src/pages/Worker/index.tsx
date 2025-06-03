
import LayoutBase from "@/components/LayoutBase";
import Container from "@/components/Container";
import NavigateHeader from "@/components/NavigateHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  User, 
  Phone, 
  MapPin,
  DollarSign,
  Timer,
  ChefHat
} from "lucide-react";
import { useState } from "react";
import { OrderDetailsDialog } from "./OrderDetailsDialog";
import { useWorkerOrders } from "./useWorkerOrders";

const Worker = () => {
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  
  const { 
    pendingOrders, 
    activeOrders, 
    completedOrders,
    acceptOrder,
    cancelOrder,
    completeOrder 
  } = useWorkerOrders();

  const handleViewDetails = (orderId: number) => {
    setSelectedOrderId(orderId);
    setDetailsDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Очікує</Badge>;
      case 'accepted':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Прийнято</Badge>;
      case 'preparing':
        return <Badge variant="secondary" className="bg-orange-100 text-orange-800">Готується</Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Виконано</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Скасовано</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatTime = (time: string) => {
    return new Date(time).toLocaleTimeString('uk-UA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatPrice = (price: number) => {
    return `₴${price}`;
  };

  const OrderCard = ({ order, showActions = true }: { order: any, showActions?: boolean }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">
              Замовлення #{order.id}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              {getStatusBadge(order.status)}
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatTime(order.createdAt)}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-green-600">
              {formatPrice(order.total)}
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Timer className="w-4 h-4" />
              {order.estimatedTime} хв
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <User className="w-5 h-5 text-gray-600" />
          <div>
            <div className="font-medium">{order.customerName}</div>
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {order.customerPhone}
            </div>
          </div>
        </div>

        {order.deliveryAddress && (
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
            <div>
              <div className="font-medium">Адреса доставки</div>
              <div className="text-sm text-gray-600">{order.deliveryAddress}</div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center gap-2 font-medium">
            <ChefHat className="w-4 h-4" />
            Замовлені страви
          </div>
          {order.items.map((item: any, index: number) => (
            <div key={index} className="flex justify-between items-center pl-6">
              <span className="text-sm">{item.name} x{item.quantity}</span>
              <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex justify-between items-center font-semibold">
          <span>Загальна сума:</span>
          <span className="text-lg text-green-600">{formatPrice(order.total)}</span>
        </div>

        {showActions && (
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleViewDetails(order.id)}
              className="flex-1"
            >
              <Eye className="w-4 h-4 mr-1" />
              Деталі
            </Button>
            
            {order.status === 'pending' && (
              <>
                <Button
                  size="sm"
                  onClick={() => acceptOrder(order.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Прийняти
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => cancelOrder(order.id)}
                  className="flex-1"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Скасувати
                </Button>
              </>
            )}
            
            {(order.status === 'accepted' || order.status === 'preparing') && (
              <>
                <Button
                  size="sm"
                  onClick={() => completeOrder(order.id)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Виконано
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => cancelOrder(order.id)}
                  className="flex-1"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Скасувати
                </Button>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <LayoutBase>
      <NavigateHeader title="Панель працівника" />
      <Container>
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-yellow-600">{pendingOrders.length}</div>
                <div className="text-sm text-gray-600">Нові замовлення</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{activeOrders.length}</div>
                <div className="text-sm text-gray-600">В роботі</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">{completedOrders.length}</div>
                <div className="text-sm text-gray-600">Виконано сьогодні</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending" className="relative">
                Нові замовлення
                {pendingOrders.length > 0 && (
                  <Badge className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                    {pendingOrders.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="active" className="relative">
                В роботі
                {activeOrders.length > 0 && (
                  <Badge className="ml-2 bg-blue-500 text-white text-xs px-1.5 py-0.5">
                    {activeOrders.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="completed">Виконані</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {pendingOrders.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">
                      Нових замовлень немає
                    </h3>
                    <p className="text-gray-500">
                      Нові замовлення з'являться тут автоматично
                    </p>
                  </CardContent>
                </Card>
              ) : (
                pendingOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))
              )}
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              {activeOrders.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <ChefHat className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">
                      Немає активних замовлень
                    </h3>
                    <p className="text-gray-500">
                      Прийміть замовлення з вкладки "Нові замовлення"
                    </p>
                  </CardContent>
                </Card>
              ) : (
                activeOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedOrders.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2">
                      Сьогодні замовлень ще не виконано
                    </h3>
                    <p className="text-gray-500">
                      Виконані замовлення з'являться тут
                    </p>
                  </CardContent>
                </Card>
              ) : (
                completedOrders.map((order) => (
                  <OrderCard key={order.id} order={order} showActions={false} />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>

        <OrderDetailsDialog
          orderId={selectedOrderId}
          open={detailsDialogOpen}
          onOpenChange={setDetailsDialogOpen}
        />
      </Container>
    </LayoutBase>
  );
};

export default Worker;
