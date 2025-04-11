/** @type {import('tailwindcss').Config} */
export const content = [
  './src/**/*.{js,jsx}',
  './index.html',
];
export const theme = {
  extend: {
    borderRadius: {
      lg: 'var(--radius)',
      md: 'calc(var(--radius) - 2px)',
      sm: 'calc(var(--radius) - 4px)',
    },
    colors: {
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      dark: 'hsl(var(--dark))',
      darker: 'hsl(var(--darker))',
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      success: {
        DEFAULT: 'hsl(var(--success))',
        foreground: 'hsl(var(--success-foreground))',
      },
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      chart: {
        1: 'hsl(var(--chart-1))',
        2: 'hsl(var(--chart-2))',
      },
    },
    backgroundImage: {
      'hero-gradient': 'linear-gradient(to bottom right, #252738, #1D1F31)',
      'button-gradient': 'linear-gradient(to right, #4A9FFF, #3D72E4)',
      'active-nav-gradient': 'linear-gradient(to right, rgba(74, 159, 255, 0.2), #171926)',
    },
    keyframes: {
      'accordion-down': {
        from: {
          height: '0',
        },
        to: {
          height: 'var(--radix-accordion-content-height)',
        },
      },
      'accordion-up': {
        from: {
          height: 'var(--radix-accordion-content-height)',
        },
        to: {
          height: '0',
        },
      },
      float1: {
        '0%, 100%': { transform: 'translateY(0) translateX(0)' },
        '50%': { transform: 'translateY(-10px) translateX(5px)' },
      },
      float2: {
        '0%, 100%': { transform: 'translateY(0) translateX(0)' },
        '50%': { transform: 'translateY(10px) translateX(-5px)' },
      },
      float3: {
        '0%, 100%': { transform: 'translateY(0) translateX(0)' },
        '50%': { transform: 'translateY(-8px) translateX(8px)' },
      },
    },
    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
      float1: 'float1 5s ease-in-out infinite',
      float2: 'float2 6s ease-in-out infinite',
      float3: 'float3 7s ease-in-out infinite',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
};
export const plugins = [require('tailwindcss-animate')];
