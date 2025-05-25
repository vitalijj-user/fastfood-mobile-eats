import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ cartCount }: { cartCount: number }) => (
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
    </div>
  </header>
);

export default Header;
