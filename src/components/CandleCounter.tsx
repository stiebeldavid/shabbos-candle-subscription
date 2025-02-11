
import { Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";

export const CandleCounter = ({
  count,
  onUpdate,
}: {
  count: number;
  onUpdate: (newCount: number) => void;
}) => {
  return (
    <div className="glass-card rounded-lg shadow p-4 mb-8">
      <h3 className="font-semibold mb-2">How many candles do you light each Shabbos?</h3>
      <p className="text-sm text-gray-600 mb-4">This will determine the number of candles we will deliver to you each month</p>
      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
          onClick={() => onUpdate(Math.max(2, count - 1))}
        >
          <Minus className="text-primary" size={20} />
        </motion.button>
        <span className="text-xl font-semibold">{count}</span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
          onClick={() => onUpdate(count + 1)}
        >
          <Plus className="text-primary" size={20} />
        </motion.button>
      </div>
    </div>
  );
};
