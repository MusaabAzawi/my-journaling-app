<script lang="ts">
  import { goto } from '$app/navigation';
  
  let name = '';
  let greeting = '';

  function handleClick() {
    if (name) {
      greeting = `Hello, ${name}! Ready to start journaling? 📝`;
    } else {
      greeting = 'Please enter your name to get started.';
    }
  }

  function quickStart(topic: string) {
    goto(`/journal/${encodeURIComponent(topic)}`);
  }
</script>

<div class="home-container">
  <div class="hero-section">
    <h1>🤖 AI-Powered Journaling</h1>
    <p class="hero-subtitle">
      Reflect, grow, and gain insights with AI-guided journaling
    </p>
    
    <div class="name-entry">
      <input 
        type="text" 
        placeholder="Enter your name" 
        bind:value={name}
        class="name-input"
      />
      <button on:click={handleClick} class="greeting-btn">
        👋 Say Hello
      </button>
    </div>
    
    {#if greeting}
      <p class="greeting">{greeting}</p>
    {/if}
  </div>

  <div class="quick-start">
    <h2>🚀 Quick Start Topics</h2>
    <div class="topic-grid">
      <button on:click={() => quickStart('work stress')} class="topic-btn">
        💼 Work Stress
      </button>
      <button on:click={() => quickStart('personal growth')} class="topic-btn">
        🌱 Personal Growth
      </button>
      <button on:click={() => quickStart('daily reflection')} class="topic-btn">
        🌅 Daily Reflection
      </button>
      <button on:click={() => quickStart('relationship thoughts')} class="topic-btn">
        💕 Relationships
      </button>
      <button on:click={() => quickStart('future goals')} class="topic-btn">
        🎯 Future Goals
      </button>
      <button on:click={() => quickStart('gratitude')} class="topic-btn">
        🙏 Gratitude
      </button>
    </div>
  </div>

  <div class="custom-topic">
    <h2>✨ Or create your own</h2>
    <p>
      <a href="/journal" class="create-link">
        Start a custom journal topic →
      </a>
    </p>
  </div>
</div>

<style>
  .home-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  .hero-section {
    text-align: center;
    margin-bottom: 50px;
    padding: 40px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  }

  .hero-section h1 {
    font-size: 2.5rem;
    color: #2d3748;
    margin: 0 0 16px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-size: 1.2rem;
    color: #718096;
    margin: 0 0 30px 0;
    line-height: 1.6;
  }

  .name-entry {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .name-input {
    padding: 12px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    min-width: 200px;
    transition: all 0.2s;
  }

  .name-input:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
  }

  .greeting-btn {
    padding: 12px 20px;
    background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .greeting-btn:hover {
    background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
    transform: translateY(-1px);
  }

  .greeting {
    font-size: 1.1rem;
    color: #2d3748;
    margin: 20px 0 0 0;
    padding: 16px;
    background: linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%);
    border-radius: 8px;
    border-left: 4px solid #38b2ac;
  }

  .quick-start {
    margin-bottom: 40px;
  }

  .quick-start h2 {
    text-align: center;
    color: #2d3748;
    margin-bottom: 30px;
    font-size: 1.8rem;
  }

  .topic-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
  }

  .topic-btn {
    padding: 16px 20px;
    background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 500;
    color: #2d3748;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
  }

  .topic-btn:hover {
    background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%);
    border-color: #4299e1;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  .custom-topic {
    text-align: center;
    padding: 30px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 12px;
    border: 2px dashed #cbd5e0;
  }

  .custom-topic h2 {
    color: #2d3748;
    margin-bottom: 15px;
  }

  .create-link {
    display: inline-block;
    padding: 12px 24px;
    background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s;
  }

  .create-link:hover {
    background: linear-gradient(135deg, #38a169 0%, #2f855a 100%);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    .home-container {
      padding: 20px 15px;
    }

    .hero-section {
      padding: 30px 20px;
    }

    .hero-section h1 {
      font-size: 2rem;
    }

    .name-entry {
      flex-direction: column;
      align-items: center;
    }

    .name-input {
      min-width: 250px;
    }

    .topic-grid {
      grid-template-columns: 1fr;
    }
  }
</style>