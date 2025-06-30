import { GoogleGenAI } from "@google/genai";
import { json, type RequestHandler, error } from '@sveltejs/kit';
import { API_KEY } from '$env/static/private';
import type { PageServerLoad,Action } from './$types';

let JournalID: string | null;

const sessions = new Map<String, any>();

export const load: PageServerLoad = async ({cookies,params}) => {
     const journalID  = params.journalID;
     console.log('Journal ID:', journalID);

        if (!journalID) {
            throw error(400, 'Journal ID is required');
        }

        const ai = new GoogleGenAI({ apiKey: API_KEY });
        // Check if the journalID is already in the journaling array
         if (!sessions.has(journalID)) {
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


        const response = result.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
        console.log('AI Response:', result);

        sessions.set(journalID, {
        history: [
          { role: 'user', parts: [{ text: prompt }] },
          { role: 'model', parts: [{ text: response }] }
        ]
      });
    }
    catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}
return ({ message: sessions.get(journalID).history.slice(-1)[0].parts[0].text,
  sessionId: journalID });  
};


export const actions = {
    followup: async ({ request ,params }) => {
        const paramJournalID = params.journalID;
        
        if (!paramJournalID) {
            throw error(400, 'Journal ID is required');
        }
        
        const formData = await request.formData();
        const journalID = formData.get('journalID') as string;

        JournalID = journalID;
        return json({ success: true, message: `Journal ID set to ${JournalID}` });
    }
};