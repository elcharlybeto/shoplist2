import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'text': 'var(--text)',
        'background': 'var(--background)',
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'tertiary': 'var(--tertiary)',
        'floating': 'var(--floating)',
        'text-floating': 'var(--text-floating)',
        'accent': 'var(--accent)',
        'border-list': 'var(--border-list)',
        'bg-list': 'var(--bg-list)',
        'shadow-list': 'var(--shadow-list)',
        'icon-list': 'var(--icon-list)',
        'hover-icon-list': 'var(--hover-icon-list)',
        'error-msg': 'var(--error-msg)',
        'icon-form': 'var(--icon-form)',
        'hover-icon-form': 'var(--hover-icon-form)',
        'input-border': 'var(--input-border)',
        'input-bg': 'var(--input-bg)',
       },
    },
  },
  plugins: [],
};
export default config;
