
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Share2 } from "lucide-react";

interface SignupConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignupConfirmation = ({ isOpen, onClose }: SignupConfirmationProps) => {
  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Shabbos Light Subscription Service',
        text: 'Never miss the beautiful mitzvah of lighting Shabbos candles. Get candles delivered directly to your door in the Detroit Metro area!',
        url: window.location.href,
      });
    } catch (error) {
      console.log('Sharing failed', error);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl text-center mb-2">
            Welcome to Shabbos Light! 🕯️
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center space-y-4">
            <p className="text-lg font-medium text-primary">
              Thank you for subscribing!
            </p>
            <div className="space-y-2 text-gray-600">
              <p>Here's what happens next:</p>
              <ol className="list-decimal list-inside text-left space-y-2 pl-4">
                <li>You'll receive a confirmation email shortly</li>
                <li>Your first delivery will arrive before next Shabbos</li>
                <li>We'll notify you before each monthly delivery</li>
              </ol>
            </div>
            <div className="mt-6 pt-4 border-t">
              <p className="text-sm">
                Know someone who might benefit from this service?
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogAction onClick={onClose}>
            Close
          </AlertDialogAction>
          <AlertDialogAction 
            className="flex items-center gap-2 bg-primary hover:bg-primary/90"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
            Share with Friends
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
