import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  link?: string;
  children?: React.ReactNode;
}

const NavigateHeader = ({ title, link, children }: Props) => (
  <header className="bg-white shadow-sm sticky top-0 z-50">
    <div className="px-4 py-4 flex items-center gap-2">
      <Link to={link || ".."}>
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </Link>
      <h1 className="text-xl font-bold">{title}</h1>
      {children}
    </div>
  </header>
);

export default NavigateHeader;
