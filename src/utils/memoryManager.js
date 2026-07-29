class MemoryManager {
  constructor() {
    this.memory = new Map();
    this.maxMemory = 100; // Max messages per user
    this.expiryTime = 3600000; // 1 hour
  }

  set(key, value) {
    if (this.memory.size >= this.maxMemory) {
      const oldestKey = this.memory.keys().next().value;
      this.memory.delete(oldestKey);
    }
    
    this.memory.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  get(key) {
    const data = this.memory.get(key);
    if (!data) return null;
    
    if (Date.now() - data.timestamp > this.expiryTime) {
      this.memory.delete(key);
      return null;
    }
    
    return data.value;
  }

  clear() {
    this.memory.clear();
  }

  // Auto clear expired entries
  autoCleanup() {
    const now = Date.now();
    for (const [key, data] of this.memory.entries()) {
      if (now - data.timestamp > this.expiryTime) {
        this.memory.delete(key);
      }
    }
  }
}

export const memory = new MemoryManager();

// Run cleanup every 5 minutes
setInterval(() => memory.autoCleanup(), 300000);
