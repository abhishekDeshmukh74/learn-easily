import type { ConceptStep } from '../../lib/types';

export const BFS_COLOR = '#f59e0b';

export const bfsSteps: ConceptStep[] = [
  {
    id: 'intro',
    label: 'BFS Overview',
    description: 'Understand breadth-first search',
    educationalText:
      'Breadth-First Search (BFS) visits all nodes at the current depth level before moving deeper. It uses a queue (FIFO) to process nodes in the order they were discovered — guaranteeing the shortest path in unweighted graphs.',
    deepDiveText:
      "BFS has O(V + E) time complexity and O(V) space for the queue. It guarantees the shortest path (fewest edges) between two nodes in an unweighted graph. BFS is the foundation of Dijkstra's algorithm, bipartite graph checking, multi-source spreading problems, and web crawlers.",
    icon: 'GitBranch',
  },
  {
    id: 'a',
    label: 'Level 0 — Visit A',
    description: 'Enqueue A, dequeue and visit it',
    educationalText:
      'Start by enqueueing A. Dequeue A and visit it. Then enqueue all unvisited neighbors — B and C. Both are at distance 1 from A (Level 1). BFS will process ALL level-1 nodes before going deeper.',
    deepDiveText:
      'Queue after visiting A: [B, C]. The FIFO queue guarantees that B and C (level 1) will be processed before D, E, F (level 2). This is the key difference from DFS: BFS breadth-sweeps each level completely.',
    icon: 'Box',
  },
  {
    id: 'b',
    label: 'Level 1 — Visit B',
    description: 'Dequeue B, enqueue its children D & E',
    educationalText:
      "Dequeue B (first item in queue) and visit it. Enqueue B's unvisited children D and E. BFS then continues to the next item in the queue — C — before going to D or E.",
    deepDiveText:
      "Queue: [C, D, E]. Notice C, which is also level 1, is still ahead of B's children D and E (level 2). This FIFO ordering is what embeds the level-by-level guarantee: we'll always finish a level before starting the next.",
    icon: 'Box',
  },
  {
    id: 'c',
    label: 'Level 1 — Visit C',
    description: 'Dequeue C, enqueue its child F',
    educationalText:
      'Still on level 1 — dequeue C and visit it. Enqueue F. After this, level 1 is fully processed. All remaining queue items (D, E, F) belong to level 2.',
    deepDiveText:
      "Queue: [D, E, F]. The moment we finish processing C we've completely exhausted level 1. BFS's level structure makes it ideal for problems like 'find the shortest path' or 'find all nodes at distance k'.",
    icon: 'Box',
  },
  {
    id: 'd',
    label: 'Level 2 — Visit D',
    description: 'Dequeue D — a leaf node',
    educationalText:
      'Dequeue D and visit it. D has no unvisited children, so nothing is enqueued. D is at the shortest distance of 2 from A: A → B → D.',
    deepDiveText:
      "Queue: [E, F]. D's BFS distance from A is guaranteed to be 2 (two edges). BFS will never re-examine D at a shorter distance because level 2 is processed only after level 1 is complete.",
    icon: 'Box',
  },
  {
    id: 'e',
    label: 'Level 2 — Visit E',
    description: 'Dequeue E — a leaf node',
    educationalText:
      "E is dequeued and visited. Another leaf, nothing enqueued. We've now visited A, B, C, D, E in perfect level-order. Compare to DFS: A → B → D → E → C → F vs BFS: A → B → C → D → E → F.",
    deepDiveText:
      'Queue: [F]. The DFS vs BFS contrast is clear: DFS visited C as the 5th node (dived deep left first), BFS visited it as the 3rd (swept all of level 1 first). Both algorithms visit all nodes but in very different orders.',
    icon: 'Box',
  },
  {
    id: 'f',
    label: 'Level 2 — Visit F — Complete',
    description: 'BFS finishes — all 6 nodes visited',
    educationalText:
      'F is dequeued and visited. The queue is now empty — BFS is complete. Full order: A → B → C → D → E → F, neatly matching the level-by-level structure of the graph.',
    deepDiveText:
      'BFS order: A(L0) → B,C(L1) → D,E,F(L2). This level encoding makes BFS useful for shortest-path queries. Time: O(V+E), Space: O(V) for the queue. BFS tree edges: {A-B, A-C, B-D, B-E, C-F}.',
    icon: 'CheckCircle2',
  },
];
