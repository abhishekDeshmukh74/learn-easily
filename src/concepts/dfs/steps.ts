import type { ConceptStep } from '../../lib/types';

export const DFS_COLOR = '#818cf8';

export const dfsSteps: ConceptStep[] = [
  {
    id: 'intro',
    label: 'DFS Overview',
    description: 'Understand depth-first search',
    educationalText:
      'Depth-First Search (DFS) explores as far as possible along each branch before backtracking. It uses a stack — either explicit or the call stack via recursion — to track nodes to visit next.',
    deepDiveText:
      "DFS has O(V + E) time complexity and O(V) space for the stack. It is foundational for cycle detection, topological sorting (Kahn's algorithm), maze solving, and finding strongly connected components (Tarjan's / Kosaraju's). DFS classifies edges into tree, back, forward, and cross edges.",
    icon: 'GitBranch',
  },
  {
    id: 'a',
    label: 'Visit A (Root)',
    description: 'Start DFS at node A, push neighbors to stack',
    educationalText:
      'Begin at node A. Visit it immediately, then push its unvisited neighbors onto the stack. DFS commits to going as deep as possible — so it pushes B and C but immediately dives into whichever is on top.',
    deepDiveText:
      "We push C first, then B (so B is on top). This ensures we explore B's entire subtree before ever touching C. Stack is now [B, C] — B on top. The LIFO nature of a stack is what gives DFS its depth-first character.",
    icon: 'Box',
  },
  {
    id: 'b',
    label: 'Visit B',
    description: 'Pop B from stack, go deeper',
    educationalText:
      'B is on top of the stack — pop and visit it. Push its unvisited children D and E (E first, then D so D is on top). DFS keeps going deeper before it ever returns to C.',
    deepDiveText:
      "Stack is now [D, E, C]. D is on top. The stack grows with each node's children. The key insight: we've explored 2 levels deep (A→B) before visiting A's second child C. This contrasts sharply with BFS which would visit C before D.",
    icon: 'Box',
  },
  {
    id: 'd',
    label: 'Visit D',
    description: 'Deepest point — D is a leaf',
    educationalText:
      'D is popped and visited. It has no children, so nothing is pushed. DFS has reached its deepest point on this path: A → B → D. The stack naturally handles backtracking.',
    deepDiveText:
      "Stack is now [E, C]. When DFS hits a leaf, it simply pops the next item from the stack — this is the implicit backtrack. No special 'go back' logic is needed. The stack returns control to the nearest unfinished branch.",
    icon: 'Box',
  },
  {
    id: 'e',
    label: 'Backtrack to E',
    description: "After D, pop E — B's other child",
    educationalText:
      "Having fully explored D, DFS backtracks and pops E. E is B's other child. It too is a leaf, so after visiting it we backtrack further up toward A.",
    deepDiveText:
      "Stack is now [C]. Backtracking is DFS's hallmark: explore one full path to its end, then return to try siblings. This creates the depth-first order: A → B → D → E (complete B's subtree) before going to C.",
    icon: 'RotateCcw',
  },
  {
    id: 'c',
    label: 'Backtrack to C',
    description: "B's subtree done — now explore right subtree",
    educationalText:
      "B's entire subtree is exhausted. DFS backtracks all the way up to A's level and pops C. We've fully committed to the left subtree before touching the right.",
    deepDiveText:
      "Stack is now [F]. The traversal shows the depth-first bias: A → B → D → E → C. Notice C is visited 5th even though it is A's direct child — DFS went deep into B's subtree first. BFS would have visited C as the 3rd node.",
    icon: 'RotateCcw',
  },
  {
    id: 'f',
    label: 'Visit F — Complete',
    description: 'DFS finishes — all 6 nodes visited',
    educationalText:
      'F is pushed and popped. All nodes visited. The complete DFS order is: A → B → D → E → C → F. The stack is empty — DFS is done.',
    deepDiveText:
      'Full DFS order: A(1) → B(2) → D(3) → E(4) → C(5) → F(6). Compare to BFS: A → B → C → D → E → F. DFS tree edges: {A-B, B-D, B-E, A-C, C-F}. Time: O(V+E), Space: O(V) for the stack.',
    icon: 'CheckCircle2',
    codeSnippets: {
      python:
        '# Recursive\ndef dfs(graph, node, visited=None):\n    if visited is None:\n        visited = set()\n    visited.add(node)\n    order = [node]\n    for neighbor in graph[node]:\n        if neighbor not in visited:\n            order += dfs(graph, neighbor, visited)\n    return order\n\n# Iterative\ndef dfs_iter(graph, start):\n    visited, stack, order = set(), [start], []\n    while stack:\n        node = stack.pop()\n        if node not in visited:\n            visited.add(node)\n            order.append(node)\n            stack.extend(\n                n for n in reversed(graph[node])\n                if n not in visited\n            )\n    return order',
      javascript:
        '// Recursive\nfunction dfs(graph, node, visited = new Set()) {\n  visited.add(node);\n  const order = [node];\n  for (const neighbor of graph[node]) {\n    if (!visited.has(neighbor)) {\n      order.push(...dfs(graph, neighbor, visited));\n    }\n  }\n  return order;\n}\n\n// Iterative\nfunction dfsIter(graph, start) {\n  const visited = new Set();\n  const stack = [start];\n  const order = [];\n  while (stack.length) {\n    const node = stack.pop();\n    if (!visited.has(node)) {\n      visited.add(node);\n      order.push(node);\n      stack.push(\n        ...[...graph[node]].reverse().filter(n => !visited.has(n))\n      );\n    }\n  }\n  return order;\n}',
      java: '// Recursive\nList<Integer> dfs(Map<Integer, List<Integer>> graph,\n                  int node, Set<Integer> visited) {\n    visited.add(node);\n    List<Integer> order = new ArrayList<>(List.of(node));\n    for (int neighbor : graph.get(node)) {\n        if (!visited.contains(neighbor)) {\n            order.addAll(dfs(graph, neighbor, visited));\n        }\n    }\n    return order;\n}\n\n// Iterative\nList<Integer> dfsIter(Map<Integer, List<Integer>> graph, int start) {\n    Set<Integer> visited = new HashSet<>();\n    Deque<Integer> stack = new ArrayDeque<>(List.of(start));\n    List<Integer> order = new ArrayList<>();\n    while (!stack.isEmpty()) {\n        int node = stack.pop();\n        if (!visited.contains(node)) {\n            visited.add(node);\n            order.add(node);\n            List<Integer> nbrs = graph.get(node);\n            for (int i = nbrs.size() - 1; i >= 0; i--)\n                if (!visited.contains(nbrs.get(i)))\n                    stack.push(nbrs.get(i));\n        }\n    }\n    return order;\n}',
    },
  },
  {
    id: 'practice',
    label: 'Most asked interview questions',
    description: 'Reinforce DFS with real interview problems',
    educationalText:
      'Apply DFS to these LeetCode problems — ordered by difficulty:\n\n🟢 Easy\n• #104  Maximum Depth of Binary Tree — Recursion = DFS naturally\n• #100  Same Tree — Compare trees with recursive DFS\n• #226  Invert Binary Tree — Swap children depth-first\n• #112  Path Sum — Explore every root-to-leaf path\n• #543  Diameter of Binary Tree — Track depth at each node\n\n🟡 Medium\n• #200  Number of Islands — DFS flood-fill each island\n• #695  Max Area of Island — DFS to count connected cells\n• #133  Clone Graph — DFS to deep-copy nodes recursively\n• #207  Course Schedule — DFS cycle detection (topological sort)\n• #417  Pacific Atlantic Water Flow — Reverse DFS from both oceans\n• #394  Decode String — DFS on nested bracket structure',
    deepDiveText:
      'Patterns to recognise:\n• Tree problems with "explore every path" → DFS / recursion\n• Cycle detection in a directed graph → DFS with 3-color marking\n• Topological sort → DFS + post-order stack (#207, #210)\n• Flood-fill / connected components → DFS on grid\n• Nested structures (brackets, parentheses) → DFS with a stack',
    icon: 'CheckCircle2',
  },
];
