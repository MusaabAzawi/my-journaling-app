<script lang="ts">
  import { goto } from '$app/navigation';
  
  let userInput = '';
  let isCreating = false;

  async function createEntry() {
    if (!userInput.trim()) {
      return;
    }
    
    isCreating = true;
    
    // Small delay for better UX
    setTimeout(() => {
      goto(`/journal/${encodeURIComponent(userInput.trim())}`);
    }, 300);
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      createEntry();
    }
  }
</script>

<div class="journal-create-container">
  <div class="create-header">
    <h1>📝 Create Your Journal</h1>
    <p class="create-subtitle">
      Start a conversation with AI about what's on your mind
    </p>
  </div>

  <div class="create-form-section">
    <form on:submit|preventDefault={createEntry} class="create-form">
      <div class="input-group">
        <input 
          type="text" 
          placeholder="What would you like to reflect on? (e.g., 'work stress', 'personal growth', 'today's challenges')"
          bind:value={userInput}
          on:keypress={handleKeyPress}
          disabled={isCreating}
          class="topic-input"
          maxlength="100"
        />
        <button 
          type="submit" 
          disabled={isCreating || !userInput.trim()}
          class="create-btn"
        >
          {#if isCreating}
            ✨ Creating...
          {:else}
            🚀 Start Journey
          {/if}
        </button>
      </div>
      
      <div class="input-help">
        <p>💡 Be specific about what you want to explore or reflect on</p>
      </div>
    </form>
  </div>

  <div class="examples-section">
    <h2>💭 Need inspiration?</h2>
    <div class="examples-grid">
      <button 
        on:click={() => userInput = 'work-life balance struggles'}
        class="example-btn"
        disabled={isCreating}
      >
        Work-life balance struggles
      </button>
      <button 
        on:click={() => userInput = 'feeling overwhelmed with decisions'}
        class="example-btn"
        disabled={isCreating}
      >
        Feeling overwhelmed with decisions
      </button>
      <button 
        on:click={() => userInput = 'relationship communication issues'}
        class="example-btn"
        disabled={isCreating}
      >
        Relationship communication issues
      </button>
      <button 
        on:click={() => userInput = 'career uncertainty and next steps'}
        class="example-btn"
        disabled={isCreating}
      >
        Career uncertainty and next steps
      </button>
      <button 
        on:click={() => userInput = 'self-doubt and confidence building'}
        class="example-btn"
        disabled={isCreating}
      >
        Self-doubt and confidence building
      </button>
      <button 
        on:click={() => userInput = 'managing stress and anxiety'}
        class="example-btn"
        disabled={isCreating}
      >
        Managing stress and anxiety
      </button>
    </div>
  </div>

  <div class="how-it-works">
    <h2>🤔 How it works</h2>
    <div class="steps">
      <div class="step">
        <div class="step-number">1</div>
        <div class="step-content">
          <h3>Share your topic</h3>
          <p>Tell us what's on your mind or what you'd like to reflect on</p>
        </div>
      </div>
      <div class="step">
        <div class="step-number">2</div>
        <div class="step-content">
          <h3>Get AI insights</h3>
          <p>Receive thoughtful prompts and reflections to guide your thinking</p>
        </div>
      </div>
      <div class="step">
        <div class="step-number">3</div>
        <div class="step-content">
          <h3>Continue the conversation</h3>
          <p>Ask follow-up questions and dive deeper into your thoughts</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .journal-create-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 30px 20px;
  }

  .create-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .create-header h1 {
    font-size: 2.2rem;
    color: #2d3748;
    margin: 0 0 12px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .create-subtitle {
    font-size: 1.1rem;
    color: #718096;
    margin: 0;
    line-height: 1.6;
  }

  .create-form-section {
    background: rgba(255, 255, 255, 0.9);
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    margin-bottom: 40px;
  }

  .create-form {
    width: 100%;
  }

  .input-group {
    display: flex;
    gap: 12px;
    margin-bottom: 15px;
    flex-wrap: wrap;
  }

  .topic-input {
    flex: 1;
    padding: 16px 20px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    line-height: 1.5;
    transition: all 0.2s;
    min-width: 300px;
  }

  .topic-input:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  }

  .topic-input:disabled {
    background: #f7fafc;
    opacity: 0.7;
  }

  .create-btn {
    padding: 16px 24px;
    background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .create-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
    transform: translateY(-1px);
  }

  .create-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .input-help {
    text-align: center;
  }

  .input-help p {
    color: #718096;
    font-size: 0.9rem;
    margin: 0;
    font-style: italic;
  }

  .examples-section {
    margin-bottom: 40px;
  }

  .examples-section h2 {
    text-align: center;
    color: #2d3748;
    margin-bottom: 25px;
    font-size: 1.5rem;
  }

  .examples-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 12px;
  }

  .example-btn {
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.8);
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.9rem;
    color: #4a5568;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
  }

  .example-btn:hover:not(:disabled) {
    background: rgba(66, 153, 225, 0.05);
    border-color: #4299e1;
    color: #2b6cb0;
  }

  .example-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .how-it-works {
    background: rgba(255, 255, 255, 0.7);
    padding: 30px;
    border-radius: 16px;
    border: 2px dashed #cbd5e0;
  }

  .how-it-works h2 {
    text-align: center;
    color: #2d3748;
    margin-bottom: 30px;
    font-size: 1.5rem;
  }

  .steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
  }

  .step {
    display: flex;
    align-items: flex-start;
    gap: 15px;
  }

  .step-number {
    background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    flex-shrink: 0;
  }

  .step-content h3 {
    color: #2d3748;
    margin: 0 0 8px 0;
    font-size: 1.1rem;
  }

  .step-content p {
    color: #718096;
    margin: 0;
    line-height: 1.5;
    font-size: 0.95rem;
  }

  @media (max-width: 768px) {
    .journal-create-container {
      padding: 20px 15px;
    }

    .create-form-section {
      padding: 20px;
    }

    .input-group {
      flex-direction: column;
    }

    .topic-input {
      min-width: unset;
    }

    .examples-grid {
      grid-template-columns: 1fr;
    }

    .steps {
      grid-template-columns: 1fr;
    }

    .how-it-works {
      padding: 20px;
    }
  }
</style>