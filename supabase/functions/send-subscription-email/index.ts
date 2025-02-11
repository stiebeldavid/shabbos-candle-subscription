
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SubscriptionData {
  productType: string;
  candleCount: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  instructions: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: SubscriptionData = await req.json();
    
    const emailContent = `
New Subscription:
----------------
Product Type: ${data.productType}
Number of Candles: ${data.candleCount}

Customer Information:
------------------
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Address: ${data.address}
Apartment/Suite: ${data.apartment || 'Not provided'}
Special Instructions: ${data.instructions || 'None'}
    `;

    const emailResponse = await resend.emails.send({
      from: "Shabbos Light <onboarding@resend.dev>",
      to: ["stiebeldavid@gmail.com"],
      cc: ["Shalomphotography1@gmail.com"],
      subject: "New Shabbos Light Subscription",
      text: emailContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending subscription email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
