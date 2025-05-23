
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Чізбургер Делюкс',
      price: 199,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
      quantity: 1
    },
    {
      id: 2,
      name: 'Маргарита',
      price: 289,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop',
      quantity: 2
    }
  ]);

  const increaseQuantity = (id: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id && item.quantity > 1 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Кошик</h1>
            {totalItems > 0 && (
              <Badge variant="outline" className="ml-2">
                {totalItems} {totalItems === 1 ? 'товар' : 'товари'}
              </Badge>
            )}
          </div>
        </div>
      </header>

      {cartItems.length > 0 ? (
        <div className="px-4 py-6">
          <ScrollArea className="max-h-[calc(100vh-280px)]">
            <div className="space-y-3">
              {cartItems.map(item => (
                <Card key={item.id} className="border-0 shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-500"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-orange-500 font-semibold mt-1">{item.price} ₴</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-gray-500 hover:text-gray-900"
                              onClick={() => decreaseQuantity(item.id)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-gray-500 hover:text-gray-900"
                              onClick={() => increaseQuantity(item.id)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <span className="font-bold">{item.price * item.quantity} ₴</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>

          {/* Order Summary */}
          <Card className="mt-6 border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Деталі замовлення</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Вартість страв</span>
                  <span>{subtotal} ₴</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Доставка</span>
                  <span>{deliveryFee} ₴</span>
                </div>
                <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-bold">
                  <span>Разом</span>
                  <span>{total} ₴</span>
                </div>
              </div>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 mt-2">
                Оформити замовлення
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] px-4 text-center">
          <div className="bg-gray-100 p-6 rounded-full mb-4">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold mb-2">Ваш кошик порожній</h2>
          <p className="text-gray-500 mb-6">Додайте товари з меню, щоб зробити замовлення</p>
          <Link to="/">
            <Button className="bg-orange-500 hover:bg-orange-600">
              Повернутися до меню
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
