import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "./CartDrawer";
import { Link } from "react-router-dom";

interface NavbarProps {
  onOpenWaitlist: () => void;
}

export const Navbar = ({ onOpenWaitlist }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-xl font-semibold text-primary cursor-pointer hover:text-primary/80 transition-colors">
            Or L'Door
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          <CartDrawer />
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};
