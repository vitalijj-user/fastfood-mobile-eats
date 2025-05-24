import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard, Plus, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import NavigateHeader from "@/components/NavigateHeader";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  // Збережені картки користувача
  const savedCards = [
    {
      id: 1,
      last4: "4532",
      brand: "Visa",
      expiryMonth: 12,
      expiryYear: 26,
      holderName: "Іван Петренко"
    },
    {
      id: 2,
      last4: "5678",
      brand: "Mastercard",
      expiryMonth: 8,
      expiryYear: 25,
      holderName: "Іван Петренко"
    }
  ];

  // Normally we'd get this from a cart context or state manager
  const orderItems = [
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
  ];

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCard) {
      toast({
        title: "Оберіть картку",
        description: "Будь ласка, оберіть картку для оплати",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Замовлення підтверджено!",
      description:
        "Дякуємо за ваше замовлення. Перенаправляємо на сторінку відстеження...",
    });
    setTimeout(() => {
      navigate("/order-details");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <NavigateHeader title="Оплата замовлення" link="/cart" />

      <div className="container max-w-xl mx-auto px-4 py-6">
        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Ваше замовлення</CardTitle>
            <CardDescription>
              Перевірте деталі вашого замовлення
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
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
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card>
          <CardHeader>
            <CardTitle>Платіжні дані</CardTitle>
            <CardDescription>
              Оберіть збережену картку для оплати
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                {savedCards.map((card) => (
                  <div
                    key={card.id}
                    className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedCard === card.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedCard(card.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white rounded border">
                          <CreditCard className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {card.brand} •••• {card.last4}
                          </div>
                          <div className="text-sm text-gray-500">
                            {card.holderName} • {card.expiryMonth.toString().padStart(2, '0')}/{card.expiryYear}
                          </div>
                        </div>
                      </div>
                      {selectedCard === card.id && (
                        <div className="p-1 bg-orange-500 rounded-full">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Додати нову картку */}
                <div className="border border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-400 transition-colors">
                  <div className="flex items-center justify-center space-x-2 text-gray-500">
                    <Plus className="h-4 w-4" />
                    <span>Додати нову картку</span>
                  </div>
                </div>
              </div>

              <CardFooter className="flex justify-end pt-4 px-0">
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  disabled={!selectedCard}
                >
                  Оплатити {total} ₴
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
