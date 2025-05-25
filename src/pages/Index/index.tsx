import { useMenuLogic } from "./useMenuLogic";
import Header from "@/widgets/Header";
import Hero from "./Hero";
import CategoryList from "./CategoryList";
import FeaturedItems from "./FeaturedItems";
import QuickActions from "./QuickActions";
import Container from "@/components/Container";
import Section from "@/components/Section";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Index = () => {
  const {
    cartCount,
    favorites,
    categories,
    featuredItems,
    toggleFavorite,
    addToCart,
  } = useMenuLogic();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cartCount} />
      <Container>
        <Section>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Пошук страв та напоїв..."
              className="pl-10 h-12 rounded-xl"
            />
          </div>
        </Section>
        <Hero />
        <CategoryList categories={categories} />
        <FeaturedItems
          items={featuredItems}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          addToCart={addToCart}
        />
        <QuickActions />
      </Container>
    </div>
  );
};

export default Index;
