import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gradient: "var(--gradient)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        yellow: "var(--yellow)",
        text: "var(--text)",
        muted: "var(--muted)",
      },
      transitionTimingFunction: {
        "in-quad": "cubic-bezier(.55, .085, .68, .53)",
        "in-cubic": "cubic-bezier(.550, .055, .675, .19)",
        "in-quart": "cubic-bezier(.895, .03, .685, .22)",
        "in-quint": "cubic-bezier(.755, .05, .855, .06)",
        "in-expo": "cubic-bezier(.95, .05, .795, .035)",
        "in-circ": "cubic-bezier(.6, .04, .98, .335)",

        "out-quad": "cubic-bezier(.25, .46, .45, .94)",
        "out-cubic": "cubic-bezier(.215, .61, .355, 1)",
        "out-quart": "cubic-bezier(.165, .84, .44, 1)",
        "out-quint": "cubic-bezier(.23, 1, .32, 1)",
        "out-expo": "cubic-bezier(.19, 1, .22, 1)",
        "out-circ": "cubic-bezier(.075, .82, .165, 1)",

        "in-out-quad": "cubic-bezier(.455, .03, .515, .955)",
        "in-out-cubic": "cubic-bezier(.645, .045, .355, 1)",
        "in-out-quart": "cubic-bezier(.77, 0, .175, 1)",
        "in-out-quint": "cubic-bezier(.86, 0, .07, 1)",
        "in-out-expo": "cubic-bezier(1, 0, 0, 1)",
        "in-out-circ": "cubic-bezier(.785, .135, .15, .86)",
      },
    },
  },
  plugins: [
    // @ts-expect-error - has any type
    ({ addVariant }) => {
      addVariant("starting", "@starting-style");
    },
  ],
} satisfies Config;
