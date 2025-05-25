import MenuItemMiniCard from "@/widgets/MenuItemMiniCard";
import { Button } from "@/components/ui/button";
import Section from "@/components/Section";

const FeaturedItems = ({
  items,
  favorites,
  toggleFavorite,
  addToCart,
}: {
  items: any[];
  favorites: number[];
  toggleFavorite: (id: number) => void;
  addToCart: () => void;
}) => (
  <Section
    headerTitle="Рекомендовані"
    headerContent={
      <Button variant="ghost" size="sm">
        Переглянути все
      </Button>
    }
  >
    <div className="space-y-4">
      {items.map((item) => (
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
);

export default FeaturedItems;
