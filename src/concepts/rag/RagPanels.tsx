import {
  BarChart3,
  Binary,
  CheckCircle2,
  Copy,
  Database,
  FileText,
  Filter,
  Hash,
  MessageSquare,
  Play,
  Scissors,
  Search,
  Sparkles,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import type { RagPipelineData } from './data';
import { SAMPLE_DOCUMENTS } from './data';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Step-specific data panels
// ---------------------------------------------------------------------------

export function InputPanel({ data, onPlay }: { data: RagPipelineData; onPlay?: () => void }) {
  const [selectedDocId, setSelectedDocId] = useState(data.document.id);
  const [hasRun, setHasRun] = useState(false);
  const selectedDoc = SAMPLE_DOCUMENTS.find((d) => d.id === selectedDocId) ?? SAMPLE_DOCUMENTS[0];

  const stats = useMemo(() => {
    const text = selectedDoc.text;
    const charCount = text.length;
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const sentenceCount = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
    const estimatedTokens = Math.round(charCount / 4);
    return { charCount, wordCount, sentenceCount, estimatedTokens };
  }, [selectedDoc]);

  function handleRun() {
    setHasRun(true);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-primary-400" />
        <span className="text-sm font-semibold text-gray-50">Document Input</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {SAMPLE_DOCUMENTS.map((doc) => (
          <button
            key={doc.id}
            type="button"
            onClick={() => { setSelectedDocId(doc.id); setHasRun(false); }}
            className={`rounded-lg border p-2.5 text-xs text-left transition-colors ${
              doc.id === selectedDocId
                ? 'border-primary-500/60 bg-primary-500/10'
                : 'border-gray-700/40 bg-gray-800/30 hover:border-gray-600/60 hover:bg-gray-700/30'
            }`}
          >
            <p className="font-medium text-gray-50 break-words hyphens-none">{doc.title}</p>
            <p className="text-gray-400 break-words hyphens-none mt-0.5">{doc.description}</p>
          </button>
        ))}
      </div>

      {hasRun && (
        <div className="flex flex-wrap gap-2">
          <Badge color="blue">{stats.sentenceCount} sentences</Badge>
          <Badge color="blue">{stats.wordCount} words</Badge>
          <Badge color="blue">{stats.charCount.toLocaleString()} chars</Badge>
          <Badge color="purple">~{stats.estimatedTokens} tokens</Badge>
        </div>
      )}

      <div
        className="rounded-lg bg-gray-800/40 border border-gray-700/30 p-3 overflow-y-auto"
        style={{ minHeight: '6rem', maxHeight: '12rem', resize: 'vertical' }}
      >
        <p className="text-xs text-gray-400 leading-relaxed">{selectedDoc.text}</p>
      </div>

      {onPlay && (
        <div className="rounded-xl border border-gray-700/50 bg-gray-800/30 p-4 space-y-3">
          <p className="text-xs text-gray-500 text-center">Click Run Pipeline to simulate RAG pipeline</p>
          <button
            type="button"
            onClick={handleRun}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-2.5 text-sm font-semibold text-gray-50 transition-colors hover:bg-primary-500 active:bg-primary-700"
          >
            <Play className="h-4 w-4 fill-current" />
            Run Pipeline
          </button>
        </div>
      )}
    </div>
  );
}

export function ChunkingPanel({ data }: { data: RagPipelineData }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scissors className="h-4 w-4 text-primary-400" />
          <span className="text-sm font-semibold text-gray-50">{data.chunks.length} Chunks Generated</span>
        </div>
        <div className="flex gap-2">
          <Badge>size: {data.config.chunkSize}</Badge>
          <Badge>overlap: {data.config.chunkOverlap}</Badge>
          <Badge>{data.config.chunkingStrategy}</Badge>
        </div>
      </div>

      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
        {data.chunks.map((chunk) => (
          <div
            key={chunk.id}
            className="flex gap-2 items-start rounded-lg bg-gray-800/40 border border-gray-700/30 p-2"
          >
            <span className="shrink-0 flex h-5 w-5 items-center justify-center rounded bg-primary-500/20 text-[10px] font-bold text-primary-400">
              {chunk.id}
            </span>
            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">{chunk.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EmbeddingPanel({ data }: { data: RagPipelineData }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Binary className="h-4 w-4 text-primary-400" />
          <span className="text-sm font-semibold text-gray-50">Embeddings</span>
        </div>
        <div className="flex gap-2">
          <Badge color="purple">
            <Hash className="h-3 w-3" /> {data.embeddingDimensions} dimensions
          </Badge>
          <Badge color="blue">{data.config.embeddingModel}</Badge>
        </div>
      </div>

      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
        {data.chunks.slice(0, 8).map((chunk, i) => (
          <div
            key={chunk.id}
            className="flex items-center gap-3 rounded-lg bg-gray-800/40 border border-gray-700/30 p-2"
          >
            <span className="shrink-0 flex h-5 w-5 items-center justify-center rounded bg-primary-500/20 text-[10px] font-bold text-primary-400">
              {chunk.id}
            </span>
            <div className="flex-1 min-w-0">
              <EmbeddingBar values={data.embeddingSamples[i]} />
            </div>
            <span className="shrink-0 text-[10px] text-gray-500">{data.embeddingDimensions}d</span>
          </div>
        ))}
        {data.chunks.length > 8 && (
          <p className="text-[10px] text-gray-500 text-center">+{data.chunks.length - 8} more chunks</p>
        )}
      </div>
    </div>
  );
}

export function VectorDbPanel({ data }: { data: RagPipelineData }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-primary-400" />
          <span className="text-sm font-semibold text-gray-50">Vector Database</span>
        </div>
        <Badge color="green">
          <CheckCircle2 className="h-3 w-3" /> {data.chunks.length} vectors indexed
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-gray-800/40 border border-gray-700/30 p-3 text-center">
          <p className="text-2xl font-bold text-primary-400">{data.chunks.length}</p>
          <p className="text-[10px] text-gray-500 mt-1">Vectors Stored</p>
        </div>
        <div className="rounded-lg bg-gray-800/40 border border-gray-700/30 p-3 text-center">
          <p className="text-2xl font-bold text-purple-400">{data.embeddingDimensions}</p>
          <p className="text-[10px] text-gray-500 mt-1">Dimensions Each</p>
        </div>
      </div>

      <div className="rounded-lg bg-gray-800/40 border border-gray-700/30 p-3">
        <p className="text-xs text-gray-400">
          <span className="text-gray-50 font-medium">Index Type:</span> HNSW (Hierarchical Navigable Small World)
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Approximate Nearest Neighbor search ready. Optimized for cosine similarity queries.
        </p>
      </div>
    </div>
  );
}

export function QueryPanel({ data }: { data: RagPipelineData }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-accent-400" />
        <span className="text-sm font-semibold text-gray-50">User Query</span>
      </div>

      <div className="rounded-lg bg-accent-500/10 border border-accent-500/30 p-3">
        <p className="text-sm text-gray-50 font-medium">&ldquo;{data.query}&rdquo;</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">Query Embedding</span>
          <Badge color="purple">
            <Hash className="h-3 w-3" /> {data.embeddingDimensions} dimensions
          </Badge>
        </div>
        <div className="rounded-lg bg-gray-800/40 border border-gray-700/30 p-2">
          <EmbeddingBar values={data.queryEmbeddingSample} />
        </div>
        <p className="text-[10px] text-gray-500">
          Same model ({data.config.embeddingModel}) used for both document chunks and query to ensure compatible vector
          spaces.
        </p>
      </div>
    </div>
  );
}

export function RetrievalPanel({ data }: { data: RagPipelineData }) {
  const topResults = data.similarityResults.slice(0, 6);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary-400" />
          <span className="text-sm font-semibold text-gray-50">Retrieval Results</span>
        </div>
        <div className="flex gap-2">
          <Badge color="orange">top-k = {data.config.topK}</Badge>
          <Badge color="blue">
            <BarChart3 className="h-3 w-3" /> cosine similarity
          </Badge>
        </div>
      </div>

      <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
        {topResults.map((result) => {
          const chunk = data.chunks.find((c) => c.id === result.chunkId);
          const isTop = result.rank <= data.config.topK;
          return (
            <div
              key={result.chunkId}
              className={`rounded-lg border p-2 ${
                isTop ? 'border-green-500/30 bg-green-500/5' : 'border-gray-700/30 bg-gray-800/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold ${
                      isTop ? 'bg-green-500/20 text-green-400' : 'bg-gray-700/40 text-gray-500'
                    }`}
                  >
                    {result.chunkId}
                  </span>
                  {isTop && <Badge color="green">Top {result.rank}</Badge>}
                </div>
                <span className={`text-xs font-mono font-bold ${isTop ? 'text-green-400' : 'text-gray-400'}`}>
                  {(result.score * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-gray-700/40 mb-1.5">
                <div
                  className={`h-full rounded-full ${isTop ? 'bg-green-500' : 'bg-gray-500'}`}
                  style={{ width: `${result.score * 100}%` }}
                />
              </div>
              <p className="text-[10px] text-gray-400 line-clamp-1">{chunk?.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PromptPanel({ data }: { data: RagPipelineData }) {
  const promptLines = useMemo(() => {
    return data.prompt.split('\n').map((line, i) => {
      const isKeyword = /^(CONTEXT:|QUESTION:|INSTRUCTIONS:)/.test(line);
      const isChunkRef = /^\[Chunk \d+\]/.test(line);
      const isDivider = line.trim() === '---';
      return { text: line, isKeyword, isChunkRef, isDivider, key: i };
    });
  }, [data.prompt]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-primary-400" />
          <span className="text-sm font-semibold text-gray-50">Prompt Construction</span>
        </div>
        <div className="flex gap-2">
          <Badge>{data.prompt.length.toLocaleString()} chars</Badge>
          <Badge color="blue">
            <Copy className="h-3 w-3" /> {data.config.llmModel}
          </Badge>
        </div>
      </div>

      <div className="rounded-lg bg-gray-800/40 border border-gray-700/30 p-3 max-h-44 overflow-y-auto font-mono text-[11px] leading-relaxed">
        {promptLines.map((line) => {
          if (line.isDivider) return <div key={line.key} className="border-t border-gray-700/40 my-1" />;
          if (line.isKeyword)
            return (
              <p key={line.key} className="text-primary-400 font-bold">
                {line.text}
              </p>
            );
          if (line.isChunkRef)
            return (
              <p key={line.key} className="text-accent-400">
                {line.text}
              </p>
            );
          return (
            <p key={line.key} className="text-gray-400">
              {line.text || '\u00A0'}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export function AnswerPanel({ data }: { data: RagPipelineData }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-green-400" />
        <span className="text-sm font-semibold text-gray-50">Generated Answer</span>
      </div>

      <div className="rounded-lg bg-gray-800/40 border border-gray-700/30 p-2.5">
        <p className="text-[10px] text-gray-500 mb-1">Question</p>
        <p className="text-xs text-gray-50">{data.query}</p>
      </div>

      <div className="rounded-lg bg-gradient-to-br from-green-500/10 to-primary-500/10 border border-green-500/30 p-3 max-h-36 overflow-y-auto">
        {data.answer.split('\n').map((line, i) => {
          if (!line.trim()) return <br key={i} />;
          const parts = line.split(/\*\*(.*?)\*\*/g);
          return (
            <p key={i} className="text-xs text-gray-300 leading-relaxed">
              {parts.map((part, j) =>
                j % 2 === 1 ? (
                  <strong key={j} className="text-gray-50 font-semibold">
                    {part}
                  </strong>
                ) : (
                  <span key={j}>{part}</span>
                ),
              )}
            </p>
          );
        })}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] text-gray-500">Sources:</span>
        {data.topChunks.map((tc) => (
          <Badge key={tc.chunkId} color="green">
            Chunk {tc.chunkId} — {(tc.score * 100).toFixed(1)}%
          </Badge>
        ))}
      </div>
    </div>
  );
}
