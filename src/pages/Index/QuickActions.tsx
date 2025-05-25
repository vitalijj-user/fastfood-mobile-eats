import { Card } from "@/components/ui/card";
import Section from "@/components/Section";

const QuickActions = () => (
  <Section>
    <div className="grid grid-cols-2 gap-3">
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 rounded-2xl text-white p-4 hover:shadow-lg transition-all duration-300">
        <div className="text-center">
          <div className="text-2xl mb-2">🚚</div>
          <h4 className="font-semibold text-sm mb-1">Безкоштовна доставка</h4>
          <p className="text-xs text-blue-100">При замовленні від 300 ₴</p>
        </div>
      </Card>
      <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0 rounded-2xl text-white p-4 hover:shadow-lg transition-all duration-300">
        <div className="text-center">
          <div className="text-2xl mb-2">⚡</div>
          <h4 className="font-semibold text-sm mb-1">Швидке приготування</h4>
          <p className="text-xs text-green-100">Готуємо за 15-30 хв</p>
        </div>
      </Card>
    </div>
  </Section>
);

export default QuickActions;
