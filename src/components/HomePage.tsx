import { motion } from 'framer-motion';
import { Moon, Sparkles, Sun } from 'lucide-react';
import { useTheme } from '../lib/theme';

export function HomePage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="border-b border-gray-800/60 backdrop-blur-xl bg-gray-950/80 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary-500" />
            <h1 className="text-xl font-bold text-gray-50">Learn Easily</h1>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800/60 text-gray-400 hover:bg-gray-700/60 hover:text-gray-50 transition-colors"
            title={theme === 'midnight' ? 'Switch to Daylight' : 'Switch to Midnight'}
          >
            {theme === 'midnight' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-50 mb-3">
            Learn concepts <span className="text-primary-400">interactively</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            Step-by-step visual walkthroughs with interactive diagrams. Pick a concept and understand it from the ground
            up.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
