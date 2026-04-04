import type { RagPipelineData } from './data';

export function Badge({ children, color = 'gray' }: { children: React.ReactNode; color?: string }) {
  const colors: Record<string, string> = {
    gray: 'bg-gray-700/60 text-gray-300',
    blue: 'bg-primary-500/20 text-primary-400',
    green: 'bg-green-500/20 text-green-400',
    orange: 'bg-accent-500/20 text-accent-400',
    purple: 'bg-purple-500/20 text-purple-400',
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[color] || colors.gray}`}
    >
      {children}
    </span>
  );
}

export function EmbeddingBar({ values }: { values: number[] }) {
  return (
    <div className="flex gap-px h-4 items-end">
      {values.map((v, i) => {
        const absVal = Math.abs(v);
        const height = Math.max(2, absVal * 200);
        const color = v >= 0 ? 'bg-primary-400' : 'bg-accent-400';
        return (
          <div
            key={i}
            className={`w-1.5 rounded-sm ${color}`}
            style={{ height: `${height}%`, opacity: 0.4 + absVal * 6 }}
          />
        );
      })}
    </div>
  );
}

export function InputPanel({ data }: { data: RagPipelineData }) {
  return <div className="text-sm text-gray-400">Input panel placeholder</div>;
}

export function ChunkingPanel({ data }: { data: RagPipelineData }) {
  return <div className="text-sm text-gray-400">Chunking panel placeholder</div>;
}

export function EmbeddingPanel({ data }: { data: RagPipelineData }) {
  return <div className="text-sm text-gray-400">Embedding panel placeholder</div>;
}

export function VectorDbPanel({ data }: { data: RagPipelineData }) {
  return <div className="text-sm text-gray-400">Vector DB panel placeholder</div>;
}

export function QueryPanel({ data }: { data: RagPipelineData }) {
  return <div className="text-sm text-gray-400">Query panel placeholder</div>;
}

export function RetrievalPanel({ data }: { data: RagPipelineData }) {
  return <div className="text-sm text-gray-400">Retrieval panel placeholder</div>;
}

export function PromptPanel({ data }: { data: RagPipelineData }) {
  return <div className="text-sm text-gray-400">Prompt panel placeholder</div>;
}

export function AnswerPanel({ data }: { data: RagPipelineData }) {
  return <div className="text-sm text-gray-400">Answer panel placeholder</div>;
}
