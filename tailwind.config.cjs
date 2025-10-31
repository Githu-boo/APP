module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: '#e11d48', // Rich red for primary actions
        neon: '#10b981',   // Emerald for success states
        glow: '#0ea5e9',   // Sky blue for highlights
        'dark-accent': '#881337', // Deeper red for gradients
      },
      animation: {
        'pulse-subtle': 'pulse 3s infinite',
        'glow-soft': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(225, 29, 72, 0.5), 0 0 15px rgba(225, 29, 72, 0.3)' },
          '100%': { boxShadow: '0 0 10px rgba(225, 29, 72, 0.7), 0 0 25px rgba(225, 29, 72, 0.5)' }
        }
      },
      backgroundImage: {
        'gym-hero': "url('https://images.unsplash.com/photo-1599058917217-1b6b7a7f7aa0?q=80&w=1400&auto=format&fit=crop')",
      }
    },
  },
  plugins: [],
}
