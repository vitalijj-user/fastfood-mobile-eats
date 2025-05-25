import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

const Hero = () => (
  <div className="relative bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl p-6 text-white relative overflow-hidden">
    <div className="z-10">
      <h2 className="text-2xl font-bold mb-2">Швидка доставка</h2>
      <p className="text-orange-100 mb-4">Замовляй улюблену їжу прямо зараз</p>
      <Button className="bg-white text-orange-500 hover:bg-orange-50 font-semibold">
        <Clock className="w-4 h-4 mr-2" />
        Замовити зараз
      </Button>
    </div>
    <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full"></div>
    <div className="absolute -right-2 -bottom-2 w-20 h-20 bg-white/5 rounded-full"></div>
  </div>
);

export default Hero;
