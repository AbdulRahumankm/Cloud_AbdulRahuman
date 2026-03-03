/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        devops: {
          bg: '#0f172a', /* slate-900 */
          card: '#1e293b', /* slate-800 */
          border: '#334155', /* slate-700 */
          primary: '#10b981', /* emerald-500 */
          secondary: '#0ea5e9', /* sky-500 */
          accent: '#3b82f6', /* blue-500 */
          text: '#f8fafc', /* slate-50 */
          textMuted: '#94a3b8', /* slate-400 */
        }
      }
    },
  },
  plugins: [],
}
