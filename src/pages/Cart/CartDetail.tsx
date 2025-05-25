import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Props {
  subtotal: number;
  deliveryFee: number;
  total: number;
}

const CartDetail = ({ subtotal, deliveryFee, total }: Props) => (
  <Card className="mt-6 border-0 shadow-sm bg-white">
    <CardContent className="p-4">
      <h3 className="text-lg font-semibold mb-4">Деталі замовлення</h3>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Вартість страв</span>
          <span>{subtotal} ₴</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Доставка</span>
          <span>{deliveryFee} ₴</span>
        </div>
        <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-bold">
          <span>Разом</span>
          <span>{total} ₴</span>
        </div>
      </div>
      <Link to="/checkout">
        <Button className="w-full mt-2">Оформити замовлення</Button>
      </Link>
    </CardContent>
  </Card>
);

export default CartDetail;
