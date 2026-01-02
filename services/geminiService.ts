
import { GoogleGenAI } from "@google/genai";

// Use process.env.API_KEY directly when initializing the GoogleGenAI client instance inside the function
export const generateLoveMessage = async (prompt: string): Promise<string> => {
  // Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY}); as per @google/genai guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "Kamu adalah asisten cinta yang sangat romantis, lucu, dan suka menggunakan emoji. Gunakan bahasa Indonesia yang santai (bahasa gaul/akrab). Tugasmu adalah membantu pasangan untuk mengekspresikan cinta mereka dengan cara yang menggemaskan (bucin).",
        temperature: 0.9,
      },
    });
    // Use .text property directly instead of calling it as a function
    return response.text || "Duh, cintaku lagi loading... Coba lagi ya sayang!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf sayang, hatiku lagi error karena terlalu sayang kamu. Coba lagi ya!";
  }
};

// Simulasi Backend untuk mencatat pesan & charge
export const recordActionToBackend = async (type: 'MESSAGE' | 'CHARGE', data: any) => {
  console.log(`[Backend Simulation] Recording ${type}:`, data);
  // Di dunia nyata, ini akan fetch ke API Node.js/Database
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, timestamp: new Date().toISOString() };
};
