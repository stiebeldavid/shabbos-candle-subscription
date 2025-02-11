
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const supabase = createClient(supabaseUrl, supabaseKey);

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
New Or L'Door Subscription:
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

    const toAddress = "stiebeldavid@gmail.com";
    const ccAddress = "Shalomphotography1@gmail.com";

    console.log("Attempting to send email with CC:", {
      to: toAddress,
      cc: ccAddress,
      subject: "New Or L'Door Subscription"
    });

    const emailResponse = await resend.emails.send({
      from: "Or L'Door <onboarding@resend.dev>",
      to: [toAddress],
      cc: [ccAddress],
      subject: "New Or L'Door Subscription",
      text: emailContent,
    });

    console.log("Email response:", emailResponse);

    // Log the email attempt
    const { error: logError } = await supabase
      .from('email_logs')
      .insert([{
        to_addresses: [toAddress],
        cc_addresses: [ccAddress],
        subject: "New Or L'Door Subscription",
        success: true,
        error_message: null
      }]);

    if (logError) {
      console.error("Error logging email:", logError);
    }

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending subscription email:", error);

    // Log the failed attempt
    const { error: logError } = await supabase
      .from('email_logs')
      .insert([{
        to_addresses: ["stiebeldavid@gmail.com"],
        cc_addresses: ["Shalomphotography1@gmail.com"],
        subject: "New Or L'Door Subscription",
        success: false,
        error_message: error.message
      }]);

    if (logError) {
      console.error("Error logging email failure:", logError);
    }

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
