
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
  backLink?: string;
  itemCount?: number;
  showBadge?: boolean;
}

const Header = ({ title, backLink = '/', itemCount = 0, showBadge = false }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {backLink && (
            <Link to={backLink}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
          )}
          <h1 className="text-xl font-bold">{title}</h1>
          {showBadge && itemCount > 0 && (
            <Badge variant="outline" className="ml-2">
              {itemCount} {itemCount === 1 ? 'товар' : 'товари'}
            </Badge>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
