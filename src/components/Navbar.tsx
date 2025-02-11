
import { MapPin } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm shadow-sm z-50">
      <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
        <h1 className="text-2xl font-pacifico text-primary">Shabbos Light</h1>
        <div className="flex items-center gap-2">
          <MapPin className="text-primary" size={20} />
          <span className="text-sm">Detroit Metro Area</span>
        </div>
      </div>
    </nav>
  );
};
