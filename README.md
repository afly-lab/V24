# XinAo International — Website

React 19 + Vite 6 + Tailwind 4 · Deployed on Vercel via GitHub

## Design System
White background · Navy (#0a1628) primary color scheme · Blue accent (#2563eb)
Fonts: Cormorant Garamond (serif) · DM Sans (sans) · DM Mono (mono)

## Stack
- React 19 + TypeScript
- Vite 6 (build tool)
- Tailwind CSS 4
- Framer Motion (Navbar animations)
- Lucide React (icons)
- Google Gemini API (Free Pre-Audit feature)
- Nodemailer (Contact form email delivery)
- Express (API routes)
- Vercel (hosting + serverless functions)

## Vercel Environment Variables

Set these in Vercel Dashboard → Project → Settings → Environment Variables:

### Required
```
GEMINI_API_KEY=your_google_gemini_api_key
```

### Contact Form Email (all 4 required to activate email delivery)
```
SMTP_HOST=smtp.gmail.com          # or your SMTP provider host
SMTP_PORT=587                     # 587 for TLS, 465 for SSL
SMTP_USER=your@gmail.com          # your sending email address
SMTP_PASS=your_app_password       # Gmail: use App Password (not account password)
NOTIFY_EMAIL=abdu@xinaointernational.com  # where to receive inquiry emails
```

### Gmail App Password Setup
1. Enable 2FA on Google Account
2. Go to Google Account → Security → App passwords
3. Create app password for "Mail"
4. Use that 16-character password as SMTP_PASS

### Alternative SMTP Providers
- **Brevo (free 300/day)**: smtp-relay.brevo.com port 587
- **Mailgun**: smtp.mailgun.org port 587
- **SendGrid**: smtp.sendgrid.net port 587

> Without SMTP vars, inquiries are still logged in Vercel Function Logs (Dashboard → Functions → Logs).

## Local Development
```bash
npm install
# Create .env file with your keys
cp .env.example .env
npm run dev
```

## Deploy
Push to GitHub → Vercel auto-deploys on push to main branch.

## Office Address
XinAo International Trade Co., Ltd.
804-5, Building 1, No.188, Jinbaihua North Road
Xihu District, Hangzhou, People's Republic of China
