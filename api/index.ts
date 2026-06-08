import express from "express";
import { GoogleGenAI, Type } from "@google/genai";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY environment variable is required.");
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { "User-Agent": "aistudio-build" } }
    });
  }
  return aiClient;
}

// Create nodemailer transporter — uses env vars set in Vercel dashboard
function getMailTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false }
  });
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Sourcing & Factory Audit Route
app.post("/api/audit", async (req, res) => {
  try {
    const { productType } = req.body;
    if (!productType || typeof productType !== "string" || productType.trim() === "") {
      res.status(400).json({ error: "A valid product keyword is required." });
      return;
    }

    const client = getGeminiClient();

    const promptText = `Analyze China supply chain sourcing parameters and risk factors for the product: "${productType}".
You are an expert strategic sourcing partner and auditor, representing international purchasers at Chinese factories near core industrial clusters.
Synthesize raw intelligence and generate a structured audit plan detailing:
1. Sourcing Risk Score: High, Medium, or Low.
2. Sourcing Risk Overview.
3. Prime Sourcing Hubs / Clusters in China (specifically mentioning towns/cities e.g., Ningbo for plastics/appliances, Yiwu for accessories, Shenzhen/Fushan/Guangdong etc.).
4. Estimated Minimum Order Quantity (MOQ) benchmark.
5. Estimated Target Unit Price benchmark.
6. Necessary testing / certification compliance requirements (e.g. CE, FCC, FDA, UL, RoHS).
7. On-Ground physical inspection checklist items (things to check when visiting the factory).
8. Sourcing strategy of how XinAo International (your physical on-ground support Team) will safeguard them.`;

    const response = await client.models.generateContent({
      model: "gemini-1.5-flash",
      contents: promptText,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            productName: { type: Type.STRING, description: "Name of the requested product." },
            riskScore: { type: Type.STRING, description: "Overall sourcing risk category: 'Low', 'Medium', or 'High'." },
            riskOverview: { type: Type.STRING, description: "A professional 3-sentence summary of the main risks associated with this category." },
            manufacturingClusters: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  city: { type: Type.STRING, description: "Name of the city/hub." },
                  province: { type: Type.STRING, description: "Name of the province (e.g. Fujian, Guangdong)." },
                  specialization: { type: Type.STRING, description: "Why this hub is a prime candidate." }
                },
                required: ["city", "province", "specialization"]
              },
              description: "Top 2-3 regional industrial clusters for sourcing this category in China."
            },
            moqExpectation: { type: Type.STRING, description: "Estimate of typical MOQ expectations range." },
            targetPriceBenchmark: { type: Type.STRING, description: "Expected general price parameters or budgeting advice." },
            certificationRequirements: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of typical testing, standard certifications or import marks (CE, RoHS, FDA, FCC etc.)."
            },
            onGroundInspectionChecklist: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Specific things our on-ground team will check during on-site inspections."
            },
            ourRepresentationStrategy: { type: Type.STRING, description: "Explain how XinAo International as an NDA-backed physical agent executes audits and coordinates with this cluster." }
          },
          required: [
            "productName", "riskScore", "riskOverview", "manufacturingClusters",
            "moqExpectation", "targetPriceBenchmark", "certificationRequirements",
            "onGroundInspectionChecklist", "ourRepresentationStrategy"
          ]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini Sourcing API Error:", error);
    res.status(500).json({
      error: error.message || "Sourcing audit analysis failed.",
      instructions: "Please verify GEMINI_API_KEY is configured in the secrets panel."
    });
  }
});

// Lead Collection Endpoint — sends email via nodemailer + logs to server
app.post("/api/inquire", async (req, res) => {
  try {
    const { name, email, subject, phone, company, product, budget, plan, message } = req.body;
    if (!name || !email || !product || !subject) {
      res.status(400).json({ error: "Name, email, subject, and target product are required." });
      return;
    }

    const timestamp = new Date().toISOString();

    // Try to send email via SMTP if configured
    const transporter = getMailTransporter();
    const toEmail = process.env.NOTIFY_EMAIL || "abdu@xinaointernational.com";

    if (transporter) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0;">
          <div style="background: #0a1628; padding: 24px 32px;">
            <h1 style="color: #ffffff; font-size: 20px; margin: 0; font-family: Georgia, serif;">
              XinAo International — New Inquiry
            </h1>
            <p style="color: #93c5fd; font-size: 11px; margin: 6px 0 0; text-transform: uppercase; letter-spacing: 0.1em;">
              ${timestamp}
            </p>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 12px; color: #475569; width: 160px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">Name</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0a1628;">${name}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 12px; color: #475569; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">Email</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #2563eb;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 12px; color: #475569; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">Subject</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0a1628;">${subject}</td></tr>
              ${phone ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 12px; color: #475569; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">Phone/WhatsApp</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0a1628;">${phone}</td></tr>` : ""}
              ${company ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 12px; color: #475569; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">Company</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0a1628;">${company}</td></tr>` : ""}
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 12px; color: #475569; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">Product</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0a1628; font-weight: bold;">${product}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 12px; color: #475569; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">Budget</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0a1628;">${budget}</td></tr>
              <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 12px; color: #475569; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em;">Plan</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0a1628;">${plan}</td></tr>
            </table>
            ${message ? `
            <div style="margin-top: 24px; padding: 16px; background: #f8fafc; border-left: 3px solid #2563eb;">
              <p style="font-size: 12px; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; font-weight: bold; margin: 0 0 8px;">Message / Specifications</p>
              <p style="font-size: 14px; color: #0a1628; margin: 0; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
            </div>` : ""}
            <div style="margin-top: 32px; padding: 16px; background: #0a1628; border-radius: 4px;">
              <p style="color: #93c5fd; font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 0.08em;">Reply to: <a href="mailto:${email}" style="color: #60a5fa;">${email}</a></p>
            </div>
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"XinAo Inquiry System" <${process.env.SMTP_USER}>`,
        to: toEmail,
        replyTo: email,
        subject: `[XinAo Inquiry] ${subject} — ${name} — ${product}`,
        html: emailHtml,
        text: `New inquiry from ${name} (${email})\nSubject: ${subject}\nProduct: ${product}\nBudget: ${budget}\nPlan: ${plan}\nPhone: ${phone || "Not provided"}\nCompany: ${company || "Not provided"}\nMessage: ${message || "No message"}\nTimestamp: ${timestamp}`
      });

      console.log(`Inquiry email sent to ${toEmail} for ${name} <${email}>`);
    } else {
      // SMTP not configured — log to console so it's visible in Vercel function logs
      console.log("=== NEW INQUIRY (SMTP not configured) ===");
      console.log(JSON.stringify({ name, email, subject, phone, company, product, budget, plan, message, timestamp }, null, 2));
      console.log("To enable email delivery, set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in Vercel Environment Variables.");
    }

    res.json({
      success: true,
      message: "Your inquiry has been received. Our on-ground team will reply within 24 hours.",
      lead: { name, email, subject, company, product, plan, timestamp }
    });
  } catch (e: any) {
    console.error("Inquire endpoint error:", e);
    res.status(500).json({ error: e.message || "Failed to process inquiry." });
  }
});

// Vercel Serverless Export
export default app;
