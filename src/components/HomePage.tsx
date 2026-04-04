import { Sparkles } from 'lucide-react';

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <header className="border-b border-gray-800/60 backdrop-blur-xl bg-gray-950/80 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary-500" />
            <h1 className="text-xl font-bold text-gray-50">Learn Easily</h1>
          </div>
        </div>
      </header>
    </div>
  );
}
