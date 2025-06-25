import { GoogleGenAI } from "@google/genai";
import { json } from '@sveltejs/kit';
import { API_KEY } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
    const journalID  = event.params.journalID;
     console.log('Journal ID:', journalID);
    console.log(event);


const ai = new GoogleGenAI({ apiKey: API_KEY });

 //async function GET({url}) {
   // const prompt = url.searchParams.get('prompt') || 'Default journaling message prompt';
     const prompt = "Generate a journaling message about ${journalID} in max two sentences";

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

        const text = result.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
        console.log('AI Response:', result);
        return { message: text
        };
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}
    // return {
    //     message: "GET request received",
    // }
//}
