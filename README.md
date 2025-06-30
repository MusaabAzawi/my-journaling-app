AI-Powered Journaling App
A SvelteKit application that provides AI-guided journaling experiences using Google's Gemini AI.
✨ Features

AI-Guided Reflection: Get thoughtful prompts and insights on any topic
Conversational Flow: Continue the conversation with follow-up questions
Dynamic Topics: Create journals about anything on your mind
Responsive Design: Works on desktop and mobile
Real-time Chat: Seamless conversation experience with AI

🚀 Quick Start
1. Clone and Install
npm install
2. Set up Environment
Get your API key from Google AI Studio and add it to .env:
API_KEY=your_google_ai_api_key_here
3. Run the Demo
npm run dev
Open http://localhost:5173 in your browser.
🎯 Demo Flow

Homepage: Choose quick-start topics or enter your name
Create Journal: Enter a custom topic (e.g., "work stress")
AI Conversation: Get initial AI reflection and ask follow-up questions
Continue Chat: Build a meaningful conversation with the AI

📱 How to Use

Start at the homepage and either:

Click a quick-start topic button
Go to "Journal" to create a custom topic


On the journal creation page:

Enter what you want to reflect on
Click "Start Journey"


In the journal conversation:

Read the AI's initial reflection
Ask follow-up questions in the input box
Continue the conversation as long as you want

🛠️ Technical Stack

Frontend: SvelteKit 5 with TypeScript
AI: Google Gemini 2.0 Flash
Styling: Custom CSS with gradients and modern design
State: In-memory session management
Forms: SvelteKit enhanced forms for real-time updates

📋 Current Status
✅ Working Features:

AI conversation flow
Dynamic journal topics
Responsive UI
Follow-up questions
Session management

🚧 Future Enhancements:

Database persistence
User accounts
Journal history
Export functionality
Advanced AI prompting
