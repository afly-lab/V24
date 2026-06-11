import express from "express";
import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
const PORT = 3000;

// Setup Namecheap Email Transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const app = express();
app.use(express.json());

// Audit API
app.post("/api/audit", async (req, res) => {
  try {
    const { productType } = req.body;
    if (!productType) {
      res.status(400).json({ error: "A valid product keyword is required." });
      return;
    }


   const promptText = `You are an expert China sourcing auditor. Analyze the product: "${productType}".

Return ONLY a valid JSON object with exactly these fields, no extra text:
{
  "productName": "string",
  "riskScore": "High" or "Medium" or "Low",
  "riskOverview": "2-3 sentence overview of sourcing risks",
  "manufacturingClusters": [
    { "city": "string", "province": "string", "specialization": "string" }
  ],
  "moqExpectation": "string e.g. 500–1,000 units",
  "targetPriceBenchmark": "string e.g. USD 3.50–6.00 per unit",
  "certificationRequirements": ["string", "string"],
  "onGroundInspectionChecklist": ["string", "string"],
  "ourRepresentationStrategy": "2-3 sentence explanation of how XinAo International protects the buyer"
}`;

    const apiKey = process.env.GEMINI_API_KEY;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }]
        })
      }
    );

    const geminiData = await geminiRes.json();
   res.status(500).json({ debug: JSON.stringify(geminiData) });
    return;
    if (geminiData.error) {
      res.status(500).json({ geminiError: geminiData.error });
      return;
    }
    console.log("Gemini raw response:", JSON.stringify(geminiData));
    if (!geminiData.candidates || geminiData.candidates.length === 0) {
      res.status(500).json({ error: "No candidates", debug: geminiData });
      return;
    }
    const raw = geminiData.candidates[0]?.content?.parts?.[0]?.text || "{}";
    const clean = raw.replace(/```json|```/g, "").trim();
   res.json(JSON.parse(clean));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Inquiry API
app.post("/api/inquire", async (req, res) => {
  try {
    const { name, email, subject, product, message } = req.body;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Lead: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nProduct: ${product}\nMessage: ${message}`
    });
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Vite/Static Setup
if (!isProduction) {
  (async () => {
    const secretVite = "vi" + "te";
    const { createServer } = await import(secretVite);
    const vite = await createServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  })();
} else {
  app.use(express.static(path.join(process.cwd(), "dist")));
  app.get("*", (req, res) => res.sendFile(path.join(process.cwd(), "dist", "index.html")));
}

export default app;
