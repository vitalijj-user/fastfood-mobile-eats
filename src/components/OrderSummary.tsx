
import React from 'react';
import { Separator } from "@/components/ui/separator";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  items: OrderItem[];
  deliveryFee: number;
  showItems?: boolean;
}

const OrderSummary = ({ items, deliveryFee, showItems = true }: OrderSummaryProps) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryFee;

  return (
    <div className="space-y-3">
      {showItems && items.map((item) => (
        <div key={item.id} className="flex justify-between items-center">
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
  );
};

export default OrderSummary;
