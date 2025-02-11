
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WaitlistData {
  email: string;
  city: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: WaitlistData = await req.json();
    
    // Email to admin
    const adminEmailContent = `
New Waitlist Signup:
-------------------
Email: ${data.email}
City: ${data.city}
    `;

    await resend.emails.send({
      from: "Shabbos Light <onboarding@resend.dev>",
      to: ["stiebeldavid@gmail.com"],
      subject: "New Shabbos Light Waitlist Signup",
      text: adminEmailContent,
    });

    // Confirmation email to user
    const userEmailContent = `
Thank you for joining the Shabbos Light waitlist!

We're excited about your interest in our service. We'll notify you as soon as we expand to ${data.city}.

In the meantime, please feel free to share our service with friends and family in the Detroit Metro area.

Best regards,
The Shabbos Light Team
    `;

    await resend.emails.send({
      from: "Shabbos Light <onboarding@resend.dev>",
      to: [data.email],
      subject: "Welcome to Shabbos Light Waitlist",
      text: userEmailContent,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending waitlist email:", error);
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
