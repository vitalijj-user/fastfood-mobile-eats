
import Container from "@/components/Container";
import NavigateHeader from "@/components/NavigateHeader";
import CartItem from "./CartItem";
import CartDetail from "./CartDetail";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/features/Cart";
import { Badge } from "@/components/ui/badge";
import LayoutBase from "@/components/LayoutBase";

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    totalItems,
    subtotal,
    deliveryFee,
    total,
  } = useCart();

  return (
    <LayoutBase>
      <NavigateHeader title="Cart">
        {totalItems > 0 && (
          <Badge variant="outline" className="ml-2">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </Badge>
        )}
      </NavigateHeader>
      <Container>
        {cartItems.length > 0 ? (
          <div className="px-4 py-6">
            <ScrollArea className="max-h-[calc(100vh-280px)]">
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    increase={increaseQuantity}
                    decrease={decreaseQuantity}
                    remove={removeItem}
                  />
                ))}
              </div>
            </ScrollArea>
            <CartDetail
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] px-4 text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">
              Add items from the menu to place an order
            </p>
            <Link to="/">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Back to Menu
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </LayoutBase>
  );
};

export default Cart;
