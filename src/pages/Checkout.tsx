
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  // Normally we'd get this from a cart context or state manager
  const orderItems = [
    {
      id: 1,
      name: 'Чізбургер Делюкс',
      price: 199,
      quantity: 1
    },
    {
      id: 2,
      name: 'Маргарита',
      price: 289,
      quantity: 2
    }
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Замовлення підтверджено!",
      description: "Дякуємо за ваше замовлення. Вам прийде повідомлення з деталями доставки."
    });
    // In a real app, you would process the payment here
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Оплата замовлення</h1>
          </div>
        </div>
      </header>

      <div className="container max-w-xl mx-auto px-4 py-6">
        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Ваше замовлення</CardTitle>
            <CardDescription>Перевірте деталі вашого замовлення</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orderItems.map((item) => (
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
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card>
          <CardHeader>
            <CardTitle>Платіжні дані</CardTitle>
            <CardDescription>Введіть дані вашої картки для оплати</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Ім'я власника картки</Label>
                <Input 
                  id="cardName" 
                  name="cardName" 
                  placeholder="Ім'я та прізвище"
                  value={formData.cardName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Номер картки</Label>
                <div className="relative">
                  <Input 
                    id="cardNumber" 
                    name="cardNumber" 
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                    className="pl-10"
                    maxLength={19}
                    pattern="\d{4} \d{4} \d{4} \d{4}"
                  />
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Термін дії</Label>
                  <Input 
                    id="expiryDate" 
                    name="expiryDate" 
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    required
                    maxLength={5}
                    pattern="\d{2}/\d{2}"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input 
                    id="cvv" 
                    name="cvv" 
                    type="password"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleChange}
                    required
                    maxLength={3}
                    pattern="\d{3}"
                  />
                </div>
              </div>
              
              <CardFooter className="flex justify-end pt-4 px-0">
                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
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
