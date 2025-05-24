import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Heart, ShoppingCart, Clock, Star, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "@/components/Container";
import Section from "@/components/Section";
import MenuItemMiniCard from "@/widgets/MenuItemMiniCard";

const Index = () => {
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = [
    { id: 1, name: "Бургери", emoji: "🍔", active: true },
    { id: 2, name: "Піца", emoji: "🍕", active: false },
    { id: 3, name: "Напої", emoji: "🥤", active: false },
    { id: 4, name: "Десерти", emoji: "🧁", active: false },
  ];

  const featuredItems = [
    {
      id: 1,
      name: "Чізбургер Делюкс",
      price: 199,
      originalPrice: 249,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
      time: "15-20 хв",
      rating: 4.8,
      discount: 20,
      isNew: false,
    },
    {
      id: 2,
      name: "Маргарита",
      price: 289,
      originalPrice: null,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=200&fit=crop",
      time: "20-25 хв",
      rating: 4.9,
      discount: 0,
      isNew: true,
    },
    {
      id: 3,
      name: "Куряче філе",
      price: 159,
      originalPrice: 189,
      image:
        "https://images.unsplash.com/photo-1562967914-608f82629710?w=300&h=200&fit=crop",
      time: "10-15 хв",
      rating: 4.7,
      discount: 15,
      isNew: false,
    },
  ];

  const toggleFavorite = (itemId: number) => {
    setFavorites((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FastBite</h1>
                <p className="text-xs text-gray-500">Доставка за 30 хв</p>
              </div>
            </div>
            <div className="relative">
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs flex items-center justify-center p-0">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>

          {/* Search Bar */}
        </div>
      </header>

      <Container>
        <Section>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Пошук страв та напоїв..."
              className="pl-10 border-0 h-12 rounded-xl"
            />
          </div>
        </Section>
        {/* Hero Section */}
        <Section>
          <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">Швидка доставка</h2>
              <p className="text-orange-100 mb-4">
                Замовляй улюблену їжу прямо зараз
              </p>
              <Button className="bg-white text-orange-500 hover:bg-orange-50 font-semibold">
                <Clock className="w-4 h-4 mr-2" />
                Замовити зараз
              </Button>
            </div>
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute -right-2 -bottom-2 w-20 h-20 bg-white/5 rounded-full"></div>
          </div>
        </Section>

        {/* Categories */}
        <Section headerTitle="Категорії">
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={category.active ? "default" : "outline"}
                className={`flex-shrink-0 rounded-xl h-12 px-4 ${
                  category.active
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="mr-2 text-lg">{category.emoji}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </Section>

        {/* Featured Items */}

        <Section
          headerTitle="Рекомендовані"
          headerContent={
            <Button variant="ghost" size="sm">
              Переглянути все
            </Button>
          }
        >
          <div className="space-y-4">
            {featuredItems.map((item) => (
              <MenuItemMiniCard
                key={item.id}
                {...item}
                isFavorite={favorites.includes(item.id)}
                onToggleFavorite={toggleFavorite}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </Section>

        {/* Quick Actions */}
        <Section>
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 rounded-2xl text-white p-4 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="text-2xl mb-2">🚚</div>
                <h4 className="font-semibold text-sm mb-1">
                  Безкоштовна доставка
                </h4>
                <p className="text-xs text-blue-100">
                  При замовленні від 300 ₴
                </p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0 rounded-2xl text-white p-4 hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-semibold text-sm mb-1">
                  Швидке приготування
                </h4>
                <p className="text-xs text-green-100">Готуємо за 15-30 хв</p>
              </div>
            </Card>
          </div>
        </Section>
      </Container>
    </div>
  );
};

export default Index;
