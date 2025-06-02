
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Clock } from "lucide-react";

interface MenuItemMiniCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  time: string;
  rating: number;
  discount?: number;
  isNew?: boolean;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onAddToCart: () => void;
}

const MenuItemMiniCard: React.FC<MenuItemMiniCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  image,
  time,
  rating,
  discount = 0,
  isNew = false,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}) => {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex">
          <div className="relative flex-shrink-0">
            <img
              src={image}
              alt={name}
              className="w-32 h-full object-cover rounded-l-2xl"
            />
            {discount > 0 && (
              <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1">
                -{discount}%
              </Badge>
            )}
            {isNew && (
              <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1">
                NEW
              </Badge>
            )}
          </div>

          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-1">
                <h4 className="font-semibold text-gray-900 text-sm leading-tight">
                  {name}
                </h4>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-red-500 -mt-1"
                  onClick={() => onToggleFavorite(id)}
                >
                  <Heart
                    className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
                  />
                </Button>
              </div>

              <div className="flex items-center space-x-3 mb-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600 font-medium">
                    {rating}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span className="text-xs">{time}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-orange-500">${price}</span>
                {originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    ${originalPrice}
                  </span>
                )}
              </div>
              <Button
                size="sm"
                className="rounded-xl h-8 px-3 text-xs font-semibold"
                onClick={onAddToCart}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenuItemMiniCard;
