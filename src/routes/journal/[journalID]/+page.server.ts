import { GoogleGenAI } from "@google/genai";
import { json } from '@sveltejs/kit';
import { API_KEY } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    // const { journalID } = params;
    // console.log('Journal ID:', journalID);
    console.log(event);


const ai = new GoogleGenAI({ apiKey: API_KEY });

 async function GET({url}) {
    const prompt = url.searchParams.get('prompt') || 'Default journaling message prompt';
    try {
        const result = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: [
                {
                    role: 'user',
                    parts: [{ text: prompt }]
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
    return {
        message: "GET request received",
    }
}
