
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
    headerTitle="Featured"
    headerContent={
      <Button variant="ghost" size="sm">
        View All
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
