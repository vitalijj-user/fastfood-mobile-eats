
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Phone, 
  MapPin, 
  Clock, 
  CreditCard, 
  MessageSquare,
  ChefHat,
  CheckCircle,
  XCircle
} from "lucide-react";
import { useWorkerOrders } from "./useWorkerOrders";

interface OrderDetailsDialogProps {
  orderId: number | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OrderDetailsDialog = ({ orderId, open, onOpenChange }: OrderDetailsDialogProps) => {
  const { getOrderById, acceptOrder, cancelOrder, completeOrder } = useWorkerOrders();
  const order = getOrderById(orderId);

  if (!order) return null;

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
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return `₴${price}`;
  };

  const handleAction = (action: 'accept' | 'cancel' | 'complete') => {
    switch (action) {
      case 'accept':
        acceptOrder(order.id);
        break;
      case 'cancel':
        cancelOrder(order.id);
        break;
      case 'complete':
        completeOrder(order.id);
        break;
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Замовлення #{order.id}</span>
            {getStatusBadge(order.status)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Інформація про замовлення */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-gray-600" />
              <div>
                <div className="font-medium">Час замовлення</div>
                <div className="text-sm text-gray-600">{formatTime(order.createdAt)}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <ChefHat className="w-5 h-5 text-gray-600" />
              <div>
                <div className="font-medium">Час приготування</div>
                <div className="text-sm text-gray-600">{order.estimatedTime} хвилин</div>
              </div>
            </div>
          </div>

          {/* Інформація про клієнта */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Інформація про клієнта</h3>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium">{order.customerName}</div>
                <div className="text-sm text-gray-600">Ім'я клієнта</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium">{order.customerPhone}</div>
                <div className="text-sm text-gray-600">Телефон для зв'язку</div>
              </div>
            </div>

            {order.deliveryAddress && (
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium">Адреса доставки</div>
                  <div className="text-sm text-gray-600">{order.deliveryAddress}</div>
                </div>
              </div>
            )}
          </div>

          {/* Страви в замовленні */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Замовлені страви</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-600">Кількість: {item.quantity}</div>
                    {item.notes && (
                      <div className="text-sm text-orange-600 mt-1">
                        <MessageSquare className="w-3 h-3 inline mr-1" />
                        {item.notes}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                    <div className="text-sm text-gray-500">{formatPrice(item.price)} за шт.</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Загальні примітки */}
          {order.notes && (
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Примітки до замовлення</h3>
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">{order.notes}</div>
                </div>
              </div>
            </div>
          )}

          {/* Оплата та загальна сума */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <CreditCard className="w-5 h-5 text-gray-600" />
              <div>
                <div className="font-medium">Спосіб оплати</div>
                <div className="text-sm text-gray-600">{order.paymentMethod}</div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center text-lg font-bold">
              <span>Загальна сума:</span>
              <span className="text-green-600">{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Дії */}
          <div className="space-y-3">
            {order.status === 'pending' && (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => handleAction('accept')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Прийняти
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleAction('cancel')}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Скасувати
                </Button>
              </div>
            )}
            
            {(order.status === 'accepted' || order.status === 'preparing') && (
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => handleAction('complete')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Виконано
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleAction('cancel')}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Скасувати
                </Button>
              </div>
            )}
            
            {(order.status === 'completed' || order.status === 'cancelled') && (
              <Button 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="w-full"
              >
                Закрити
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
