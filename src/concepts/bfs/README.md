# BFS (Breadth-First Search)

**Category:** Algorithms  
**Difficulty:** Beginner  
**ID:** `bfs`  
**Color:** `#f59e0b` (amber-400)

## What It Teaches

Breadth-First Search explores a graph level by level, visiting all nodes at distance *k* before any node at distance *k+1*. This concept walks the learner through the same 6-node graph used in DFS (for easy comparison), showing how the FIFO queue produces the level-order traversal A → B → C → D → E → F — the reverse depth-priority of DFS.

## Graph Topology

```
        A        ← Level 0
       / \
      B   C      ← Level 1
     / \   \
    D   E   F    ← Level 2
```

- 6 nodes: A, B, C, D, E, F
- Same topology as the DFS concept — use side-by-side for algorithm comparison
- BFS visits C (level 1) as the 3rd node; DFS visits it 5th

## Steps (in order)

| # | Step ID | Label | Level | Visit | Queue After |
|---|---------|-------|-------|-------|-------------|
| 1 | `intro` | BFS Overview | — | — | `[]` |
| 2 | `a` | Level 0 — Visit A | 0 | A | `[B, C]` |
| 3 | `b` | Level 1 — Visit B | 1 | B | `[C, D, E]` |
| 4 | `c` | Level 1 — Visit C | 1 | C | `[D, E, F]` |
| 5 | `d` | Level 2 — Visit D | 2 | D | `[E, F]` |
| 6 | `e` | Level 2 — Visit E | 2 | E | `[F]` |
| 7 | `f` | Level 2 — Visit F — Complete | 2 | F | `[]` |

**Final BFS visit order:** A(L0) → B(L1) → C(L1) → D(L2) → E(L2) → F(L2)

### Step Summaries

**intro** — Introduces BFS as a FIFO queue-based traversal. Guarantees shortest path in unweighted graphs. O(V+E) complexity. Foundation for Dijkstra's, bipartite checking, multi-source spreading, web crawlers.

**a (Level 0 — Visit A)** — Enqueue A, dequeue and visit. Enqueue neighbors B and C (level 1). Queue: `[B, C]`. BFS will process ALL level-1 nodes before any level-2 node.

**b (Level 1 — Visit B)** — Dequeue B (FIFO front). Visit B. Enqueue D and E. Queue: `[C, D, E]`. Crucially, C (also level 1) is still ahead of D and E in the queue.

**c (Level 1 — Visit C)** — Dequeue C. Level 1 complete. Enqueue F. Queue: `[D, E, F]`. All remaining items are level 2.

**d (Level 2 — Visit D)** — Dequeue D (leaf). Nothing enqueued. Queue: `[E, F]`. BFS-guaranteed shortest distance from A = 2.

**e (Level 2 — Visit E)** — Dequeue E (leaf). Queue: `[F]`. DFS vs BFS contrast: DFS visited C at position 5, BFS at position 3.

**f (Level 2 — Visit F — Complete)** — Dequeue F. Queue empty. BFS complete. Full order matches level structure exactly.

## File Structure

```
src/concepts/bfs/
├── index.ts              # Concept registration
├── steps.ts              # 7 ConceptStep definitions + BFS_COLOR
└── BfsVisualization.tsx  # React Flow graph with queue + level badge panels
```

## Visualization

Built with **@xyflow/react (React Flow v12)**. Same 6-node layout as DFS for easy side-by-side mental comparison. Amber/orange color scheme (vs indigo for DFS).

### Node States

| State | Appearance |
|-------|-----------|
| Unvisited | `bg-gray-700 border-gray-600 text-gray-50` |
| Active (being visited now) | `bg-accent-500 text-gray-950 shadow-[0_0_14px_rgba(245,158,11,0.7)]` — amber glow |
| Visited (already done) | `bg-green-500 text-gray-950` — green |

### State Mappings in `BfsVisualization.tsx`

```ts
const STEP_TO_NODE: Record<string, string | null> = {
  intro: null, a: 'A', b: 'B', c: 'C', d: 'D', e: 'E', f: 'F',
};

const QUEUE_STATE: Record<string, string[]> = {
  intro: [], a: ['B', 'C'], b: ['C', 'D', 'E'],
  c: ['D', 'E', 'F'], d: ['E', 'F'], e: ['F'], f: [],
};

const NODE_LEVEL: Record<string, number> = {
  A: 0, B: 1, C: 1, D: 2, E: 2, F: 2,
};

const VISIT_ORDER: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6,
};
```

### React Flow Layout (node positions)

```
A  → (250, 50)
B  → (100, 150)   C  → (400, 150)
D  → (50, 280)    E  → (200, 280)   F  → (400, 280)
```

(Identical to DFS layout — allows visual comparison of the same graph with different traversal logic.)

### Panels

- **Queue panel** (`<Panel position="top-right">`): shows current queue contents as an ordered list of amber badges (front/head of queue indicated)
- **Level badge** (`<Panel position="top-left">`): shows current level being processed, e.g. `Level 1`
- **Traversal bar** (bottom): shows each visited node in order with label `{node} L{level}` — makes the level structure visually obvious

### Custom Node Type

`bfsNode` — registered in `nodeTypes`. Same rounded-square chip as DFS node but uses amber active color. All interaction disabled (no drag/zoom/pan).

## Key Concepts Illustrated

1. **FIFO queue** — nodes processed in the order they were discovered, guaranteeing level-by-level traversal
2. **Shortest path guarantee** — in unweighted graphs, BFS distance = minimum number of edges
3. **Level structure** — all level-1 nodes before level-2 nodes (BFS explores by "rings" from source)
4. **Contrast with DFS** — same graph, visit C at step 3 (BFS) vs step 5 (DFS)
5. **No backtracking** — BFS never has to backtrack; once a level is fully enqueued, it will be processed in FIFO order

## DFS vs BFS Comparison (same graph)

| Property | DFS | BFS |
|----------|-----|-----|
| Data structure | Stack (LIFO) | Queue (FIFO) |
| Visit order | A→B→D→E→C→F | A→B→C→D→E→F |
| C visited at step | 5 | 3 |
| Goes deep first? | Yes | No |
| Finds shortest path? | No | Yes (unweighted) |
| Space complexity | O(V) | O(V) |
| Time complexity | O(V+E) | O(V+E) |

## Complexity Reference

| Metric | Value |
|--------|-------|
| Time | O(V + E) |
| Space | O(V) — for the queue |
| Completeness | Yes (finds all reachable nodes) |
| Optimal | Yes — shortest path in unweighted graphs |

## Common Use Cases

- Shortest path in unweighted graphs
- Level-order tree traversal
- Bipartite graph detection (2-coloring)
- Finding all nodes within distance k
- Web crawling / social network friend suggestions
- Multi-source spreading (e.g. "infected cells" in a grid)
- Dijkstra's algorithm (BFS generalized to weighted edges with a priority queue)
