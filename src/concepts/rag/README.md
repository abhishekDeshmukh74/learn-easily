# RAG (Retrieval-Augmented Generation)

**Category:** AI & ML  
**Difficulty:** Intermediate  
**ID:** `rag`  
**Color:** `#6366f1` (indigo)

## What It Teaches

RAG is a technique that grounds a Large Language Model's answers in a private knowledge base instead of relying solely on its training data. The user learns the full end-to-end pipeline: from raw document ingestion all the way to a grounded LLM answer.

## Pipeline Steps (in order)

| # | Step ID | Label | Icon |
|---|---------|-------|------|
| 1 | `input` | Document Input | FileText |
| 2 | `chunking` | Chunking | Scissors |
| 3 | `embedding` | Embeddings | Binary |
| 4 | `vectordb` | Vector DB | Database |
| 5 | `query` | User Query | Search |
| 6 | `retrieval` | Retrieval | Filter |
| 7 | `prompt` | Prompt Construction | MessageSquare |
| 8 | `answer` | Answer | Sparkles |

### Step Summaries

**1. Document Input** — Raw text is ingested. Quality of source documents directly affects downstream retrieval. Real pipelines do extraction, deduplication, and cleaning first.

**2. Chunking** — Documents are split into smaller pieces. Chunk size and overlap are critical hyperparameters. Strategies range from fixed-character splits → sentence splits → semantic/topic-aware splits.

**3. Embeddings** — Each chunk is converted to a dense vector (384–3072 dims) via a model like `text-embedding-3` or BGE. Similar text → vectors that are geometrically close. The same model must be used for documents and queries.

**4. Vector DB** — Embeddings are indexed using ANN algorithms (HNSW, IVF) for sub-second nearest-neighbor search at scale. Popular stores: Pinecone, Weaviate, Qdrant, ChromaDB. Supports metadata filtering and hybrid search.

**5. User Query** — The question is embedded using the same model. This produces a query vector that can be compared against document vectors. Query expansion, HyDE, and query decomposition improve weak or vague queries.

**6. Retrieval** — Cosine similarity search returns the top-k most relevant chunks. Re-ranking with cross-encoders improves precision. Hybrid retrieval combines dense vectors with BM25 keyword matching.

**7. Prompt Construction** — Retrieved chunks are placed as context alongside the user's question in a structured prompt. Token budget management, system instructions, and citation prompts are key considerations.

**8. Answer** — The LLM generates a grounded answer from context. Evaluation via RAGAS: faithfulness, relevancy, correctness. Production systems add guardrails to detect and flag hallucinations.

## File Structure

```
src/concepts/rag/
├── index.ts              # Concept registration (registerConcept call)
├── steps.ts              # Step definitions + RAG_COLOR constant
├── data.ts               # Hardcoded precomputed pipeline data
├── RagVisualization.tsx  # Thin wrapper → delegates to PipelineScene (3D)
├── RagDetailPanel.tsx    # Right-panel orchestrator — picks panel per step
└── RagPanels.tsx         # 8 step-specific panel components
```

## Visualization

The visualization is a **3D pipeline using React Three Fiber** (`@react-three/fiber`). It renders hexagonal chip nodes connected by Bezier tubes. Nodes float and glow; tubes animate flowing particles when active.

- **Entry point:** `RagVisualization.tsx` → renders `<PipelineScene steps={ragSteps} {...props} />`
- **Scene file:** `src/components/three/PipelineScene.tsx`
- **Node positions:** diagonal layout, 8 nodes spread from `[-4.5, -3.2, 0]` to `[4.0, 2.4, 0]`
- **Per-step colors:** `input` = `#818cf8` → … → `answer` = `#10b981`

### 3D Component Files

| File | Role |
|------|------|
| `PipelineScene.tsx` | Canvas container, `OrbitControls`, step/edge orchestration |
| `StepNode.tsx` | Hexagonal `ExtrudeGeometry` chip, sprite labels, float + glow animation |
| `DataFlow.tsx` | `TubeGeometry` + animated `<points>` flowing along the tube. Props: `from`, `to`, `isActive`, `isCompleted` |
| `FloatingParticles.tsx` | Dual-layer spherical star background (600 bright + 600 dim particles) |

## Detail Panel

The `RagDetailPanel` in `RagDetailPanel.tsx` routes the current step to one of 8 panels defined in `RagPanels.tsx`:

| Step | Panel Component |
|------|----------------|
| `input` | `InputPanel` — shows raw document text |
| `chunking` | `ChunkingPanel` — shows numbered chunks with overlap indicator |
| `embedding` | `EmbeddingPanel` — Eye/EyeOff toggle per chunk, blue/orange color bar (positive/negative dims), expandable raw vector (first 20 values of 384) |
| `vectordb` | `VectorDbPanel` — table of stored vectors with similarity previews |
| `query` | `QueryPanel` — query text + Eye toggle for query embedding vector |
| `retrieval` | `RetrievalPanel` — top-3 chunks ranked by cosine similarity score |
| `prompt` | `PromptPanel` — formatted LLM prompt with system + context + user sections |
| `answer` | `AnswerPanel` — final generated answer with source citations |

### Embedding Panel Details

- `data.embeddingSamples[i]` → 20-value sample array per chunk (from `data.ts`)
- `data.embeddingDimensions` → 384 (full vector size)
- Color bar: blue = positive dimension, orange = negative dimension
- Toggle state: `expandedChunk: number | null` — only one chunk expanded at a time
- Raw display: first 20 values + `... (364 more)`

## Data (`data.ts`)

Hardcoded precomputed data that drives panel components:

- `chunks[]` — 4 text chunks from a sample document
- `embeddingSamples[][]` — 20-value embedding preview per chunk
- `embeddingDimensions` — 384
- `queryEmbeddingSample[]` — 20 values for the query vector
- `retrievalResults[]` — top-k results with cosine similarity scores
- `promptTemplate` — formatted prompt string
- `generatedAnswer` — sample LLM response

## Key Patterns

- `VisualizationProps`: `{ currentStep, completedSteps, processingStep, isPlaying }`
- `DetailPanelProps`: `{ step, currentStep, completedSteps, processingStep, isPlaying }`
- Active step = yellow/green highlight; completed steps = green glow on 3D node + tube
- Step ID strings (`'input'`, `'chunking'`, etc.) tie visualization state to panel routing
