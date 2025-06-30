<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  
  export let data: { messages: Array<{role: string, content: string, timestamp: Date}>, sessionId: string };
  export let form: any;
  
  let userInput = '';
  let isSubmitting = false;

  function handleSubmit() {
    if (!userInput.trim()) return;
    isSubmitting = true;
  }

  function resetForm() {
    userInput = '';
    isSubmitting = false;
  }
</script>

<div class="journal-container">
  <header class="journal-header">
    <h1>📝 Journal: {data.sessionId}</h1>
    <p class="journal-subtitle">Reflect and grow with AI guidance</p>
  </header>

  <div class="conversation">
    {#each data.messages as message}
      <div class="message {message.role}">
        <div class="message-content">
          <div class="message-role">
            {message.role === 'ai' ? '🤖 AI Reflection' : '💭 Your Thought'}
          </div>
          <p>{message.content}</p>
          <div class="message-time">
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        </div>
      </div>
    {/each}
  </div>

  <form 
    method="post" 
    action="?/followup"
    use:enhance={({ formData, cancel }) => {
      if (!userInput.trim()) {
        cancel();
        return;
      }
      
      handleSubmit();
      
      return async ({ result, update }) => {
        if (result.type === 'success') {
          resetForm();
        }
        await update();
        isSubmitting = false;
      };
    }}
    class="input-form"
  >
    <div class="input-group">
      <input 
        type="text" 
        name="question"
        placeholder="Ask a follow-up question or share your thoughts..." 
        bind:value={userInput}
        disabled={isSubmitting}
        class="input-field"
      />
      <button 
        type="submit" 
        disabled={isSubmitting || !userInput.trim()}
        class="submit-btn"
      >
        {isSubmitting ? '💭' : '➤'}
      </button>
    </div>
  </form>

  {#if form?.error}
    <div class="error">
      ❌ {form.error}
    </div>
  {/if}
</div>

<style>
  .journal-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    min-height: 60vh;
  }

  .journal-header {
    text-align: center;
    margin-bottom: 30px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .journal-header h1 {
    color: #2d3748;
    margin: 0 0 8px 0;
    font-size: 1.8rem;
  }

  .journal-subtitle {
    color: #718096;
    margin: 0;
    font-style: italic;
  }

  .conversation {
    margin-bottom: 30px;
    space-y: 20px;
  }

  .message {
    margin-bottom: 20px;
    display: flex;
  }

  .message.ai {
    justify-content: flex-start;
  }

  .message.user {
    justify-content: flex-end;
  }

  .message-content {
    max-width: 70%;
    padding: 16px 20px;
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .message.ai .message-content {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-bottom-left-radius: 4px;
  }

  .message.user .message-content {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    border-bottom-right-radius: 4px;
  }

  .message-role {
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 8px;
    opacity: 0.9;
  }

  .message-content p {
    margin: 0 0 8px 0;
    line-height: 1.5;
  }

  .message-time {
    font-size: 0.75rem;
    opacity: 0.7;
    text-align: right;
  }

  .input-form {
    position: sticky;
    bottom: 20px;
    background: rgba(255, 255, 255, 0.95);
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    backdrop-filter: blur(10px);
  }

  .input-group {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  .input-field {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s;
  }

  .input-field:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  }

  .input-field:disabled {
    background: #f7fafc;
    opacity: 0.6;
  }

  .submit-btn {
    padding: 12px 16px;
    background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.2s;
    min-width: 50px;
  }

  .submit-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
    transform: translateY(-1px);
  }

  .submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .error {
    margin-top: 15px;
    padding: 12px;
    background: #fed7d7;
    color: #c53030;
    border-radius: 8px;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    .journal-container {
      padding: 15px;
    }

    .message-content {
      max-width: 85%;
    }

    .input-form {
      bottom: 10px;
      padding: 15px;
    }
  }
</style>