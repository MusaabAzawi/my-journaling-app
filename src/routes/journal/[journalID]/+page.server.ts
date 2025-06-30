import { GoogleGenAI } from "@google/genai";
import { json, type RequestHandler, error, fail } from '@sveltejs/kit';
import { API_KEY } from '$env/static/private';
import type { PageServerLoad, Actions } from './$types';

const sessions = new Map<string, any>();

export const load: PageServerLoad = async ({ params }) => {
    const journalID = params.journalID;
    console.log('Journal ID:', journalID);

    if (!journalID) {
        throw error(400, 'Journal ID is required');
    }

    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    // Check if the journalID is already in the sessions
    if (!sessions.has(journalID)) {
        const prompt = `Generate a reflective journaling message about the topic "${journalID}" in exactly two sentences. Focus on mindfulness and personal growth.`;
        
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
            console.log('AI Response:', response);

            sessions.set(journalID, {
                history: [
                    { role: 'user', parts: [{ text: prompt }] },
                    { role: 'model', parts: [{ text: response }] }
                ],
                messages: [
                    { role: 'ai', content: response, timestamp: new Date() }
                ]
            });
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    const session = sessions.get(journalID);
    return {
        messages: session.messages,
        sessionId: journalID
    };
};

export const actions: Actions = {
    followup: async ({ request, params }) => {
        const journalID = params.journalID;
        
        if (!journalID) {
            return fail(400, { error: 'Journal ID is required' });
        }
        
        const formData = await request.formData();
        const userQuestion = formData.get('question') as string;

        if (!userQuestion) {
            return fail(400, { error: 'Question is required' });
        }

        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const session = sessions.get(journalID);

        if (!session) {
            return fail(400, { error: 'Session not found' });
        }

        try {
            // Add user message to session
            session.messages.push({
                role: 'user',
                content: userQuestion,
                timestamp: new Date()
            });

            // Create conversation context
            const conversationHistory = session.history;
            conversationHistory.push({
                role: 'user',
                parts: [{ text: userQuestion }]
            });

            const result = await ai.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: conversationHistory
            });

            const response = result.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

            // Add AI response to session
            session.messages.push({
                role: 'ai',
                content: response,
                timestamp: new Date()
            });

            conversationHistory.push({
                role: 'model',
                parts: [{ text: response }]
            });

            sessions.set(journalID, session);

            return { success: true };

        } catch (error) {
            console.error('Follow-up API Error:', error);
            return fail(500, { error: 'Failed to generate response' });
        }
    }
};