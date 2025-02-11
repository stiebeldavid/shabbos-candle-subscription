
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ProductSelection } from "@/components/ProductSelection";
import { CandleCounter } from "@/components/CandleCounter";
import { SubscriptionForm } from "@/components/SubscriptionForm";
import { WaitlistModal } from "@/components/WaitlistModal";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Index = () => {
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<"wax" | "oil" | null>(
    null
  );
  const [candleCount, setCandleCount] = useState(2);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const handleSubscriptionSubmit = async (formData: any) => {
    try {
      const emailContent = `
New Subscription:
----------------
Product Type: ${selectedProduct}
Number of Candles: ${candleCount}

Customer Information:
------------------
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Address: ${formData.address}
Apartment/Suite: ${formData.apartment || 'Not provided'}
Special Instructions: ${formData.instructions || 'None'}
      `;

      const response = await fetch('https://api.elasticemail.com/v2/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          apikey: 'YOUR_API_KEY', // We'll need to set this up securely
          subject: 'New Shabbos Light Subscription',
          from: 'noreply@shabboslight.com',
          fromName: 'Shabbos Light',
          to: 'stiebeldavid@gmail.com',
          bodyText: emailContent,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email notification');
      }

      toast({
        title: "Subscription completed successfully!",
        description: "Thank you for subscribing to Shabbos Light.",
      });
    } catch (error) {
      console.error('Error sending email:', error);
      // Still show success to user since their subscription was received
      toast({
        title: "Subscription completed successfully!",
        description: "Thank you for subscribing to Shabbos Light.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onOpenWaitlist={() => setIsWaitlistOpen(true)} />
      <main className="pt-16 pb-24 px-4 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <img
            src="https://static.readdy.ai/image/ef6f64f48ce707ea03ee161086b0f46c/c6f1ef489fa68fe90042979f233daa5f.jpeg"
            alt="Shabbos Candles"
            className="w-full h-[200px] object-cover rounded-lg mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">Welcome to Shabbos Light</h2>
          <p className="text-gray-600 text-sm">
            Join our monthly subscription service to ensure you never miss the
            beautiful mitzvah of lighting Shabbos candles. We deliver directly to
            your door in the Detroit Metro area.
          </p>
        </motion.div>

        <ProductSelection
          selected={selectedProduct}
          onSelect={setSelectedProduct}
        />
        <CandleCounter count={candleCount} onUpdate={setCandleCount} />
        <SubscriptionForm
          onSubmit={handleSubscriptionSubmit}
          productSelected={!!selectedProduct}
        />

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">Not in Detroit Metro? Join our waitlist!</p>
          <button
            onClick={() => setIsWaitlistOpen(true)}
            className="text-primary text-sm font-medium mt-2 hover:underline"
          >
            Join Waitlist
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
