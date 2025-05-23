
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

const CartItem = ({ 
  id, 
  name, 
  price, 
  quantity, 
  image, 
  onIncrease, 
  onDecrease, 
  onRemove 
}: CartItemProps) => {
  return (
    <Card key={id} className="border-0 shadow-sm">
      <CardContent className="p-3">
        <div className="flex gap-3">
          <img 
            src={image} 
            alt={name}
            className="w-20 h-20 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between">
              <h3 className="font-medium text-gray-900">{name}</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-gray-500"
                onClick={() => onRemove(id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-orange-500 font-semibold mt-1">{price} ₴</p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center border border-gray-200 rounded-lg">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-gray-500 hover:text-gray-900"
                  onClick={() => onDecrease(id)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-gray-500 hover:text-gray-900"
                  onClick={() => onIncrease(id)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <span className="font-bold">{price * quantity} ₴</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;
