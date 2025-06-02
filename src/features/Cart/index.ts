import { useState } from "react";

export interface CartItemType {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    {
      id: 1,
      name: "Deluxe Cheeseburger",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
      quantity: 1,
    },
    {
      id: 2,
      name: "Margherita",
      price: 289,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop",
      quantity: 2,
    },
  ]);

  const increaseQuantity = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  return {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    totalItems,
    subtotal,
    deliveryFee,
    total,
  };
};
