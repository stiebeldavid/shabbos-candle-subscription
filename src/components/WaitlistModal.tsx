
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('send-waitlist-email', {
        body: { email, city }
      });

      if (error) {
        console.error('Error sending waitlist email:', error);
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description: "Please try again or contact support.",
        });
        return;
      }

      toast({
        title: "Added to waitlist successfully!",
        description: "We'll notify you when we expand to your area.",
      });
      onClose();
    } catch (error) {
      console.error('Error processing waitlist:', error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again or contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary text-white rounded-button disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </motion.button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
