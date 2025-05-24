import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus } from "lucide-react";
import { CartItemType } from "@/features/Cart";

interface Props {
  item: CartItemType;
  increase: (id: number) => void;
  decrease: (id: number) => void;
  remove: (id: number) => void;
}

const CartItem = ({ item, increase, decrease, remove }: Props) => (
  <Card className="border-0 shadow-sm">
    <CardContent className="p-3">
      <div className="flex gap-3">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between">
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500"
              onClick={() => remove(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-orange-500 font-semibold mt-1">{item.price} ₴</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center border border-gray-200 rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 hover:text-gray-900"
                onClick={() => decrease(item.id)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-500 hover:text-gray-900"
                onClick={() => increase(item.id)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <span className="font-bold">{item.price * item.quantity} ₴</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default CartItem;
