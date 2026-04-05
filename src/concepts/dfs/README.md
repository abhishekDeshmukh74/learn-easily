# DFS (Depth-First Search)

**Category:** Algorithms  
**Difficulty:** Beginner  
**ID:** `dfs`  
**Color:** `#818cf8` (indigo-400)

## What It Teaches

Depth-First Search explores a graph by going as deep as possible along each branch before backtracking. This concept walks the learner through a concrete 6-node graph, showing exactly how the stack grows and shrinks at each step and why the visit order is A → B → D → E → C → F.

## Graph Topology

```
        A
       / \
      B   C
     / \   \
    D   E   F
```

- 6 nodes: A, B, C, D, E, F
- A is the root; B and C are A's children; D and E are B's children; F is C's child
- D, E, F are leaves (no children)

## Steps (in order)

| # | Step ID | Label | Visit | Stack After |
|---|---------|-------|-------|-------------|
| 1 | `intro` | DFS Overview | — | `[]` |
| 2 | `a` | Visit A (Root) | A | `[B, C]` |
| 3 | `b` | Visit B | B | `[D, E, C]` |
| 4 | `d` | Visit D | D | `[E, C]` |
| 5 | `e` | Backtrack to E | E | `[C]` |
| 6 | `c` | Backtrack to C | C | `[F]` |
| 7 | `f` | Visit F — Complete | F | `[]` |

**Final DFS visit order:** A(1) → B(2) → D(3) → E(4) → C(5) → F(6)

### Step Summaries

**intro** — Introduces DFS as a stack-based (LIFO) traversal. Mentions O(V+E) complexity, key applications: cycle detection, topological sort, SCCs (Tarjan's/Kosaraju's).

**a (Visit A)** — Root is visited immediately. Push C first, then B (so B is on top — LIFO means B explored first). Stack: `[B, C]`.

**b (Visit B)** — Pop B. Push E first, then D (D on top). Stack: `[D, E, C]`. Two levels deep (A→B) before touching C.

**d (Visit D)** — Pop D (leaf). Nothing pushed. Stack: `[E, C]`. Deepest point on A→B→D path. Implicit backtrack via stack.

**e (Backtrack to E)** — Pop E (leaf). B's subtree partially done. Stack: `[C]`.

**c (Backtrack to C)** — B's entire subtree exhausted. Pop C. Stack: `[F]`. C is A's second child but visited 5th — exemplifies depth-first bias.

**f (Visit F — Complete)** — Pop F (leaf). Stack empty. All 6 nodes visited. DFS complete.

## File Structure

```
src/concepts/dfs/
├── index.ts              # Concept registration
├── steps.ts              # 7 ConceptStep definitions + DFS_COLOR
└── DfsVisualization.tsx  # React Flow graph with stack panel
```

## Visualization

Built with **@xyflow/react (React Flow v12)**. Shows the same 6-node graph topology at all times; node appearance updates reactively as steps progress.

### Node States

| State | Appearance |
|-------|-----------|
| Unvisited | `bg-gray-700 border-gray-600 text-gray-50` |
| Active (being visited now) | `bg-yellow-400 text-gray-950 shadow-[0_0_14px_rgba(234,179,8,0.7)]` — yellow glow |
| Visited (already done) | `bg-green-500 text-gray-950` — green |

### State Mappings in `DfsVisualization.tsx`

```ts
const STEP_TO_NODE: Record<string, string | null> = {
  intro: null, a: 'A', b: 'B', d: 'D', e: 'E', c: 'C', f: 'F',
};

const STACK_STATE: Record<string, string[]> = {
  intro: [], a: ['B', 'C'], b: ['D', 'E', 'C'],
  d: ['E', 'C'], e: ['C'], c: ['F'], f: [],
};

const VISIT_ORDER: Record<string, number> = {
  A: 1, B: 2, D: 3, E: 4, C: 5, F: 6,
};
```

### React Flow Layout (node positions)

```
A  → (250, 50)
B  → (100, 150)   C  → (400, 150)
D  → (50, 280)    E  → (200, 280)   F  → (400, 280)
```

### Panels

- **Stack panel** (`<Panel position="top-right">`): shows current stack contents as stacked badges (top of stack highlighted in yellow)
- **Traversal bar** (bottom): shows each visited node in order with a numbered badge, colored based on visit status

### Custom Node Type

`dfsNode` — registered in `nodeTypes`. Renders as a rounded-square chip with bold label and handles on top (target) and bottom (source). No drag/zoom/pan (all interaction disabled for presentation).

## Key Concepts Illustrated

1. **LIFO stack** — pushing C before B ensures B is explored first (stack top = next to visit)
2. **Depth before breadth** — visits D and E (level 2) before C (level 1)
3. **Implicit backtracking** — no explicit "go back" logic; popping the stack handles it
4. **Tree vs cross edges** — all edges here are tree edges in this simple tree graph
5. **Contrast with BFS** — same graph, opposite visit order (BFS: A→B→C→D→E→F)

## Complexity Reference

| Metric | Value |
|--------|-------|
| Time | O(V + E) |
| Space | O(V) — for the stack |
| Completeness | Yes (finds all reachable nodes) |
| Optimal | No (not shortest path) |

## Common Use Cases

- Cycle detection in directed/undirected graphs
- Topological sorting (Kahn's algorithm or DFS post-order)
- Finding Strongly Connected Components (Tarjan's, Kosaraju's)
- Maze solving / puzzle state-space search
- Generating spanning trees
