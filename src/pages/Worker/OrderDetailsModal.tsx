
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface WorkerOrder {
  id: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: string;
  orderTime: string;
  estimatedTime?: number;
}

interface OrderDetailsModalProps {
  order: WorkerOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsModal = ({ order, isOpen, onClose }: OrderDetailsModalProps) => {
  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch(status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "preparing": return "bg-blue-100 text-blue-800";  
      case "ready": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case "pending": return "Нове";
      case "preparing": return "Готується";
      case "ready": return "Готове";
      default: return status;
    }
  };

  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 50;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-xl">Замовлення {order.id}</DialogTitle>
              <p className="text-sm text-gray-600 mt-1">Клієнт: {order.customerName}</p>
            </div>
            <Badge className={getStatusColor(order.status)}>
              {getStatusText(order.status)}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-3">Деталі замовлення</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">₴{item.price} x {item.quantity}</p>
                  </div>
                  <p className="font-medium">₴{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Підсумок:</span>
              <span>₴{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Доставка:</span>
              <span>₴{deliveryFee}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Загалом:</span>
              <span>₴{order.total}</span>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>Час замовлення:</span>
              <span>{order.orderTime}</span>
            </div>
            {order.estimatedTime && (
              <div className="flex justify-between text-sm mt-1">
                <span>Час приготування:</span>
                <span>{order.estimatedTime} хв</span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
