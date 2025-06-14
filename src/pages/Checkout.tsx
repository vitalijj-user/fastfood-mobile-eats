
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Plus, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import NavigateHeader from "@/components/NavigateHeader";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  // User's saved cards
  const savedCards = [
    {
      id: 1,
      last4: "4532",
      brand: "Visa",
      expiryMonth: 12,
      expiryYear: 26,
      holderName: "John Doe",
    },
    {
      id: 2,
      last4: "5678",
      brand: "Mastercard",
      expiryMonth: 8,
      expiryYear: 25,
      holderName: "John Doe",
    },
  ];

  // Normally we'd get this from a cart context or state manager
  const orderItems = [
    {
      id: 1,
      name: "Deluxe Cheeseburger",
      price: 199,
      quantity: 1,
    },
    {
      id: 2,
      name: "Margherita",
      price: 289,
      quantity: 2,
    },
  ];

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCard) {
      toast({
        title: "Select a card",
        description: "Please select a card for payment",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Order confirmed!",
      description:
        "Thank you for your order. Redirecting to tracking page...",
    });
    setTimeout(() => {
      navigate("/order-details");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <NavigateHeader title="Order Payment" link="/cart" />

      <div className="container max-w-xl mx-auto px-4 py-6">
        {/* Order Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Order</CardTitle>
            <CardDescription>
              Review your order details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-gray-500 ml-2">x{item.quantity}</span>
                  </div>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
              <Separator className="my-2" />
              <div className="flex justify-between">
                <span className="text-gray-600">Food cost</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span>${deliveryFee}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total to pay</span>
                <span>${total}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>
              Select a saved card for payment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                {savedCards.map((card) => (
                  <div
                    key={card.id}
                    className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedCard === card.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedCard(card.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white rounded border">
                          <CreditCard className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium">
                            {card.brand} •••• {card.last4}
                          </div>
                          <div className="text-sm text-gray-500">
                            {card.holderName} •{" "}
                            {card.expiryMonth.toString().padStart(2, "0")}/
                            {card.expiryYear}
                          </div>
                        </div>
                      </div>
                      {selectedCard === card.id && (
                        <div className="p-1 bg-orange-500 rounded-full">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Add new card */}
                <div className="border border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-400 transition-colors">
                  <div className="flex items-center justify-center space-x-2 text-gray-500">
                    <Plus className="h-4 w-4" />
                    <span>Add new card</span>
                  </div>
                </div>
              </div>

              <CardFooter className="flex justify-end pt-4 px-0">
                <Button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  disabled={!selectedCard}
                >
                  Pay ${total}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
