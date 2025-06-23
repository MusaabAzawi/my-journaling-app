import { GoogleGenAI } from "@google/genai";
import { json } from '@sveltejs/kit';
import { API_KEY } from '$env/static/private';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function GET() {
    try {
        const result = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: [
                {
                    role: 'user',
                    parts: [{ text: 'Getting started with Journaling - respond with a short, encouraging message about journaling' }]
                }
            ]
        });

        console.log('AI Response:', result);
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

        console.log('AI Response Text:', text);

        return json({ message: text });
    } catch (error) {
        console.error('API Error:', error);
        return json({ error: 'Failed to connect to AI service' }, { status: 500 });
    }
}
