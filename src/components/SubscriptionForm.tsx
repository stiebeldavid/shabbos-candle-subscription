
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  instructions: string;
}

export const SubscriptionForm = ({
  onSubmit,
  productSelected,
}: {
  onSubmit: (data: FormData) => void;
  productSelected: boolean;
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    instructions: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productSelected) {
      toast({
        variant: "destructive",
        title: "Please select a candle option",
      });
      return;
    }
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            required
            className="w-full px-4 py-2 rounded-lg bg-secondary border-none"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-2 rounded-lg bg-secondary border-none"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            name="phone"
            className="w-full px-4 py-2 rounded-lg bg-secondary border-none"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Delivery Address
          </label>
          <input
            type="text"
            name="address"
            required
            className="w-full px-4 py-2 rounded-lg bg-secondary border-none"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Apartment/Suite (Optional)
          </label>
          <input
            type="text"
            name="apartment"
            className="w-full px-4 py-2 rounded-lg bg-secondary border-none"
            value={formData.apartment}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special Instructions (Optional)
          </label>
          <textarea
            name="instructions"
            className="w-full px-4 py-2 rounded-lg bg-secondary border-none"
            value={formData.instructions}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="pt-4 border-t">
        <p className="text-sm text-gray-600">
          Once you subscribe, we will calculate the monthly price (likely ~$10-15/month) and follow-up for payment confirmation. You will not be charged anything yet.
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-button font-medium mt-6"
      >
        Complete Subscription
      </motion.button>
    </form>
  );
};
