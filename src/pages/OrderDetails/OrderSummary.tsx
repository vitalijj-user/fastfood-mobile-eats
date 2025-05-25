import { Separator } from "@/components/ui/separator";

interface Props {
  orderItems: {
    id: number;
    name: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  total: number;
}

const OrderSummary = ({ orderItems, subtotal, deliveryFee, total }: Props) => (
  <div>
    {orderItems.map((item) => (
      <div key={item.id} className="flex justify-between items-center">
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
);

export default OrderSummary;
