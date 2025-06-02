
import { useState } from "react";

export const useMenuLogic = () => {
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = [
    { id: 1, name: "Pizza", emoji: "🍕", active: true },
    { id: 2, name: "Burgers", emoji: "🍔", active: false },
    { id: 3, name: "Salads", emoji: "🥗", active: false },
    { id: 4, name: "Drinks", emoji: "🥤", active: false },
    { id: 5, name: "Desserts", emoji: "🍰", active: false },
  ];

  const featuredItems = [
    {
      id: 1,
      name: "Deluxe Cheeseburger",
      price: 199,
      originalPrice: 249,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
      time: "15-20 min",
      rating: 4.8,
      discount: 20,
      isNew: false,
    },
    {
      id: 2,
      name: "Margherita",
      price: 289,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop",
      time: "20-25 min",
      rating: 4.9,
      discount: 0,
      isNew: true,
    },
    {
      id: 3,
      name: "Caesar Salad",
      price: 159,
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop",
      time: "10-15 min",
      rating: 4.7,
      discount: 0,
      isNew: false,
    },
  ];

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return {
    cartCount,
    favorites,
    categories,
    featuredItems,
    toggleFavorite,
    addToCart,
  };
};
