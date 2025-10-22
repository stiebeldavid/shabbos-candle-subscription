
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { WaitlistModal } from "@/components/WaitlistModal";
import { motion } from "framer-motion";
import { ProductGrid } from "@/components/ProductGrid";

const Index = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      <main className="pt-24 pb-24 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <img
            src="https://static.readdy.ai/image/ef6f64f48ce707ea03ee161086b0f46c/c6f1ef489fa68fe90042979f233daa5f.jpeg"
            alt="Shabbos Candles"
            className="w-full max-w-2xl mx-auto h-[300px] object-cover rounded-lg mb-6"
          />
          <h1 className="text-4xl font-bold mb-4">Welcome to Or L'Door</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Shop our collection of premium Shabbos candles and accessories. Quality products delivered to your door in the Detroit Metro area.
          </p>
        </motion.div>

        <ProductGrid />

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-2">Not in Detroit Metro?</p>
          <button
            onClick={() => setIsWaitlistOpen(true)}
            className="text-primary text-sm font-medium hover:underline"
          >
            Join our waitlist
          </button>
        </div>
      </main>

      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />
    </div>
  );
};

export default Index;
