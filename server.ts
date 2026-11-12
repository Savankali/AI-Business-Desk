import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'AI Business Desk Backend',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/auth/status', (req, res) => {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  res.json({
    supabaseConfigured: Boolean(supabaseUrl && supabaseKey),
    geminiConfigured: Boolean(geminiKey),
    mode: (supabaseUrl && supabaseKey) ? 'production_cloud' : 'local_workspace',
  });
});

app.post('/api/ai/ask', async (req, res) => {
  const { question } = req.body;
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Question is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Graceful fallback for desk initialization
    return res.json({
      answer: `AI Desk record analysis: Found 3 pending receivables totaling ₹38,400 across your customers. (Note: GEMINI_API_KEY can be added in Secrets panel for live generative reasoning).`,
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are the AI assistant for "AI Business Desk", an application for Indian micro and small businesses (MSMEs). Answer this merchant query clearly, concisely, and professionally in Indian business context (using INR ₹, GST terms where relevant).
Business context: Sharma Electricals, Ahmedabad, Gujarat.
Current records: 18 active customers, ₹1,42,850 billed this month, ₹38,400 pending receivables (Mehta Hardware ₹18,500, Kisan Krishi Kendra ₹14,200, Apex Spares ₹5,700).

Merchant question: ${question}`,
    });

    return res.json({
      answer: response.text || 'Unable to analyze records at this time.',
    });
  } catch (err: any) {
    console.error('Gemini error:', err?.message || err);
    return res.status(500).json({
      answer: 'Desk record check: Total pending receivables stand at ₹38,400 across 3 parties. Gemini service encountered a temporary network response.',
    });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AI Business Desk running at http://localhost:${PORT}`);
  });
}

startServer();
