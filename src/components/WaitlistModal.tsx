
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export const WaitlistModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Added to waitlist successfully!",
      description: "We'll notify you when we expand to your area.",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Join Our Waitlist</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-600 mb-4">
          We currently deliver exclusively in the Detroit Metro area, but iy"H we hope to expand our service to other communities soon. Join our waitlist to be notified when we arrive in your area!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg bg-secondary border-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Your city"
            className="w-full px-4 py-2 rounded-lg bg-secondary border-none"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-button"
            >
              Submit
            </motion.button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
