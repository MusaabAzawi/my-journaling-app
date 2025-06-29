import { GoogleGenAI } from "@google/genai";
import { json, type RequestHandler, error } from '@sveltejs/kit';
import { API_KEY } from '$env/static/private';
import type { PageServerLoad } from './$types';

let JournalID: string | null;

export const load: PageServerLoad = async ({fetch,params}) => {
     const journalID  = params.journalID;
     console.log('Journal ID:', journalID);

        if (!journalID) {
            throw error(400, 'Journal ID is required');
        }

        const ai = new GoogleGenAI({ apiKey: API_KEY });
        // Check if the journalID is already in the journaling array
        const prompt = `Generate a reflective journaling message about the topic "${journalID}" in exactly two sentences. Focus on mindfulness and personal growth.`;;
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
        return ({ message : text });
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}


export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const journalID = formData.get('journalID') as string;

        if (!journalID) {
            throw error(400, 'Journal ID is required');
        }

        JournalID = journalID;
        return json({ success: true, message: `Journal ID set to ${JournalID}` });
    }
};