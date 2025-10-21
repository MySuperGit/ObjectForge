import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          1: 'var(--bg-1)',
          2: 'var(--bg-2)',
          3: 'var(--bg-3)',
          4: 'var(--bg-4)',
          5: 'var(--bg-5)',
          6: 'var(--bg-6)',
          7: 'var(--bg-7)',
          9: 'var(--bg-9)',
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        },
        brand: 'var(--brand)',
        accent1: 'var(--accent-1)',
        accent2: 'var(--accent-2)',
=======
          white: 'var(--bg-white)',
        },
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
          white: 'var(--bg-white)',
        },
>>>>>>> pr-local-swagger
=======
          white: 'var(--bg-white)',
        },
>>>>>>> pr-ui-cors
        fg: {
          1: 'var(--fg-1)',
          2: 'var(--fg-2)',
          black: 'var(--fg-black)',
          white: 'var(--fg-white)',
        },
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        new: 'var(--new)',
      },
      boxShadow: { card: '0 6px 24px rgba(0,0,0,.08)' },
=======
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
        brand: 'var(--brand)',
        accent1: 'var(--accent-1)',
        accent2: 'var(--accent-2)',
        new: 'var(--new)',
      },
      boxShadow: { card: '0 6px 24px rgba(0,0,0,.08)' },
      borderRadius: { '2xl': '1rem' },
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> origin/codex/optimize-my-page-zy1m9v
=======
>>>>>>> pr-local-swagger
=======
>>>>>>> pr-ui-cors
    },
  },
  plugins: [],
} satisfies Config
