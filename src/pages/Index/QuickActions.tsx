
import { Card } from "@/components/ui/card";
import Section from "@/components/Section";

const QuickActions = () => (
  <Section>
    <div className="grid grid-cols-2 gap-3">
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 rounded-2xl text-white p-4 hover:shadow-lg transition-all duration-300">
        <div className="text-center">
          <div className="text-2xl mb-2">🚚</div>
          <h4 className="font-semibold text-sm mb-1">Free Delivery</h4>
          <p className="text-xs text-blue-100">On orders over $30</p>
        </div>
      </Card>
      <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0 rounded-2xl text-white p-4 hover:shadow-lg transition-all duration-300">
        <div className="text-center">
          <div className="text-2xl mb-2">⚡</div>
          <h4 className="font-semibold text-sm mb-1">Fast Preparation</h4>
          <p className="text-xs text-green-100">Ready in 15-30 min</p>
        </div>
      </Card>
    </div>
  </Section>
);

export default QuickActions;
