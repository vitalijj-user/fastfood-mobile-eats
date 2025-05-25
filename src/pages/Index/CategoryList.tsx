import { Button } from "@/components/ui/button";

const CategoryList = ({ categories }: { categories: any[] }) => (
  <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
    {categories.map((category) => (
      <Button
        key={category.id}
        variant={category.active ? "default" : "outline"}
        className="flex-shrink-0 rounded-xl h-12 px-4"
      >
        <span className="mr-2 text-lg">{category.emoji}</span>
        {category.name}
      </Button>
    ))}
  </div>
);

export default CategoryList;
