
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import CartItem from '@/components/CartItem';
import OrderSummary from '@/components/OrderSummary';

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
  const deliveryFee = 50;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Кошик" 
        backLink="/" 
        itemCount={totalItems} 
        showBadge={true} 
      />

      {cartItems.length > 0 ? (
        <div className="px-4 py-6">
          <ScrollArea className="max-h-[calc(100vh-280px)]">
            <div className="space-y-3">
              {cartItems.map(item => (
                <CartItem 
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  image={item.image}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
          </ScrollArea>

          {/* Order Summary */}
          <Card className="mt-6 border-0 shadow-sm bg-white">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-4">Деталі замовлення</h3>
              <OrderSummary 
                items={cartItems} 
                deliveryFee={deliveryFee}
                showItems={false}
              />
              <Link to="/checkout">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 mt-4">
                  Оформити замовлення
                </Button>
              </Link>
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
