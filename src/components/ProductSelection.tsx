
import { useState } from "react";
import { motion } from "framer-motion";

interface ProductOption {
  type: "wax" | "oil";
  title: string;
  description: string;
  image: string;
}

const products: ProductOption[] = [
  {
    type: "wax",
    title: "Wax Candles",
    description: "Premium white wax candles",
    image: "https://public.readdy.ai/ai/img_res/303ba1f0f3d45a472faaad928f35529e.jpg",
  },
  {
    type: "oil",
    title: "Oil & Wicks",
    description: "Pure olive oil with cotton wicks",
    image: "https://public.readdy.ai/ai/img_res/0928f1b573099ad55d832331588a4788.jpg",
  },
];

export const ProductSelection = ({
  onSelect,
  selected,
}: {
  onSelect: (type: "wax" | "oil") => void;
  selected: "wax" | "oil" | null;
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {products.map((product) => (
        <motion.div
          key={product.type}
          className={`glass-card rounded-lg p-4 text-center cursor-pointer transition-all duration-300 ${
            selected === product.type ? "ring-2 ring-primary" : ""
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(product.type)}
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-[120px] h-[120px] mx-auto mb-2 rounded-lg object-cover"
          />
          <h3 className="font-semibold mb-1">{product.title}</h3>
          <p className="text-xs text-gray-600 mb-2">{product.description}</p>
          <button
            className={`w-full px-4 py-2 rounded-button text-sm transition-colors ${
              selected === product.type
                ? "bg-primary text-white"
                : "bg-white border border-primary text-primary"
            }`}
          >
            Select
          </button>
        </motion.div>
      ))}
    </div>
  );
};
