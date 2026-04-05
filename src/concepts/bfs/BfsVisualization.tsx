import '@xyflow/react/dist/style.css';
import { Background, type Edge, Handle, type Node, Panel, Position, ReactFlow } from '@xyflow/react';
import { useMemo } from 'react';
import type { VisualizationProps } from '../../lib/types';

// ─── Graph topology (same graph as DFS for easy comparison) ──────────────

const BASE_NODES: Node[] = [
  { id: 'A', type: 'bfsNode', position: { x: 150, y: 30 }, data: { label: 'A' } },
  { id: 'B', type: 'bfsNode', position: { x: 60, y: 140 }, data: { label: 'B' } },
  { id: 'C', type: 'bfsNode', position: { x: 260, y: 140 }, data: { label: 'C' } },
  { id: 'D', type: 'bfsNode', position: { x: 0, y: 250 }, data: { label: 'D' } },
  { id: 'E', type: 'bfsNode', position: { x: 120, y: 250 }, data: { label: 'E' } },
  { id: 'F', type: 'bfsNode', position: { x: 260, y: 250 }, data: { label: 'F' } },
];

const BASE_EDGES: Edge[] = [
  { id: 'A-B', source: 'A', target: 'B', type: 'smoothstep' },
  { id: 'A-C', source: 'A', target: 'C', type: 'smoothstep' },
  { id: 'B-D', source: 'B', target: 'D', type: 'smoothstep' },
  { id: 'B-E', source: 'B', target: 'E', type: 'smoothstep' },
  { id: 'C-F', source: 'C', target: 'F', type: 'smoothstep' },
];

// ─── BFS-specific data ────────────────────────────────────────────────────

// Maps step ID → graph node ID that gets visited at this step
const STEP_TO_NODE: Record<string, string | null> = {
  intro: null,
  a: 'A',
  b: 'B',
  c: 'C',
  d: 'D',
  e: 'E',
  f: 'F',
};

// Step IDs in BFS visit order (level-by-level)
const BFS_STEP_ORDER = ['a', 'b', 'c', 'd', 'e', 'f'];

// The edge traversed to REACH each node
const PARENT_EDGE: Record<string, string | null> = {
  intro: null,
  a: null,
  b: 'A-B',
  c: 'A-C',
  d: 'B-D',
  e: 'B-E',
  f: 'C-F',
};

// BFS visit order number per node
const VISIT_ORDER: Record<string, number> = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6 };

// Level label per node (shown in the level band overlay)
const NODE_LEVEL: Record<string, number> = { A: 0, B: 1, C: 1, D: 2, E: 2, F: 2 };

// BFS queue state at each step (index 0 = front of queue / next to dequeue)
const QUEUE_STATE: Record<string, string[]> = {
  intro: [],
  a: ['B', 'C'],
  b: ['C', 'D', 'E'],
  c: ['D', 'E', 'F'],
  d: ['E', 'F'],
  e: ['F'],
  f: [],
};

// ─── Custom node component ────────────────────────────────────────────────

function BfsGraphNode({ data }: { data: Record<string, unknown> }) {
  const state = data.state as 'unvisited' | 'active' | 'visited';
  const label = data.label as string;
  const visitOrder = data.visitOrder as number | null;

  return (
    <div
      className={[
        'relative w-11 h-11 rounded-full flex items-center justify-center',
        'font-bold text-sm border-2 select-none transition-all duration-300',
        state === 'active'
          ? 'bg-accent-500 border-accent-400 text-gray-900 shadow-[0_0_14px_rgba(245,158,11,0.7)]'
          : state === 'visited'
            ? 'bg-green-500 border-green-300 text-gray-900'
            : 'bg-gray-800 border-gray-600 text-gray-300',
      ].join(' ')}
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0, pointerEvents: 'none' }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, pointerEvents: 'none' }} />
      {label}
      {visitOrder != null && (
        <span className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full bg-gray-900 border border-gray-500 flex items-center justify-center text-[9px] font-bold text-gray-200">
          {visitOrder}
        </span>
      )}
    </div>
  );
}

const nodeTypes = { bfsNode: BfsGraphNode };

// ─── BFS Visualization ────────────────────────────────────────────────────

export function BfsVisualization({ currentStep, completedSteps }: VisualizationProps) {
  const activeNodeId = STEP_TO_NODE[currentStep] ?? null;

  const visitedNodeIds = useMemo(
    () =>
      new Set(
        completedSteps
          .filter((s) => BFS_STEP_ORDER.includes(s))
          .map((s) => STEP_TO_NODE[s])
          .filter((n): n is string => n !== null),
      ),
    [completedSteps],
  );

  const nodes = useMemo(
    () =>
      BASE_NODES.map((n) => {
        const isActive = n.id === activeNodeId;
        const isVisited = visitedNodeIds.has(n.id);
        return {
          ...n,
          data: {
            label: n.data.label,
            state: isActive ? 'active' : isVisited ? 'visited' : 'unvisited',
            visitOrder: isActive || isVisited ? (VISIT_ORDER[n.id] ?? null) : null,
          },
        };
      }),
    [activeNodeId, visitedNodeIds],
  );

  const edges = useMemo(() => {
    const allSteps = [...completedSteps, currentStep];
    const traversalEdges = new Set(allSteps.map((s) => PARENT_EDGE[s]).filter((e): e is string => e !== null));
    const completedEdges = new Set(completedSteps.map((s) => PARENT_EDGE[s]).filter((e): e is string => e !== null));
    return BASE_EDGES.map((e) => ({
      ...e,
      style: traversalEdges.has(e.id)
        ? { stroke: completedEdges.has(e.id) ? '#22c55e' : '#f59e0b', strokeWidth: 2.5 }
        : { stroke: '#374151', strokeWidth: 1.5 },
      animated: traversalEdges.has(e.id) && !completedEdges.has(e.id),
    }));
  }, [completedSteps, currentStep]);

  const queue = QUEUE_STATE[currentStep] ?? [];

  const traversalSoFar = useMemo(() => {
    const visited = completedSteps
      .filter((s) => BFS_STEP_ORDER.includes(s))
      .map((s) => STEP_TO_NODE[s])
      .filter((n): n is string => n !== null);
    if (activeNodeId && !visited.includes(activeNodeId)) visited.push(activeNodeId);
    return visited;
  }, [completedSteps, activeNodeId]);

  // Determine which BFS level is currently active
  const activeLevel = activeNodeId != null ? (NODE_LEVEL[activeNodeId] ?? null) : null;

  return (
    <div className="w-full h-full flex flex-col gap-2 p-2">
      {/* Graph */}
      <div className="flex-1 min-h-0 relative rounded-xl border border-gray-700/50 overflow-hidden bg-gray-900/50">
        <div className="absolute inset-0">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={() => {}}
            onEdgesChange={() => {}}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            panOnDrag={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            preventScrolling={false}
            fitView
            fitViewOptions={{ padding: 0.35 }}
            style={{ background: 'transparent' }}
          >
            <Background color="#374151" gap={24} size={1} />

            {/* BFS Queue panel */}
            <Panel position="top-right">
              <div className="rounded-xl border border-gray-700/60 bg-gray-950/90 backdrop-blur-sm p-3 min-w-[110px] shadow-xl">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Queue <span className="text-gray-600 normal-case font-normal">(front→)</span>
                </p>
                {queue.length === 0 ? (
                  <p className="text-[10px] text-gray-600 text-center py-1 italic">empty</p>
                ) : (
                  <div className="flex flex-col gap-1">
                    {queue.map((node, i) => (
                      <div
                        key={`${node}-${i}`}
                        className={[
                          'text-center rounded py-1 px-2 text-xs font-bold border',
                          i === 0
                            ? 'bg-accent-500/20 border-accent-500/40 text-accent-400'
                            : 'bg-gray-800/60 border-gray-700/40 text-gray-400',
                        ].join(' ')}
                      >
                        {node}
                        {i === 0 && <span className="block text-[8px] text-gray-600 font-normal">next</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Panel>

            {/* Current level badge */}
            <Panel position="top-left">
              {activeLevel != null && (
                <div className="rounded-lg border border-accent-500/30 bg-accent-500/10 px-2.5 py-1.5 shadow-lg">
                  <p className="text-[10px] font-semibold text-accent-400 uppercase tracking-wider">
                    Level {activeLevel}
                  </p>
                </div>
              )}
            </Panel>

            {/* Legend */}
            <Panel position="bottom-left">
              <div className="flex items-center gap-3 rounded-lg border border-gray-700/50 bg-gray-950/80 px-2.5 py-1.5 text-[10px]">
                <span className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded-full bg-accent-500" /> Active
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded-full bg-green-500" /> Visited
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded-full bg-gray-700 border border-gray-600" /> Unvisited
                </span>
              </div>
            </Panel>
          </ReactFlow>
        </div>
      </div>

      {/* Traversal order bar */}
      <div className="shrink-0 rounded-xl border border-gray-700/50 bg-gray-900/40 px-3 py-2 flex items-center gap-1.5 flex-wrap min-h-[36px]">
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider shrink-0">BFS Order:</span>
        {traversalSoFar.length === 0 ? (
          <span className="text-[10px] text-gray-600 italic">Step through to start →</span>
        ) : (
          traversalSoFar.map((node, i) => (
            <div key={`${node}-${i}`} className="flex items-center gap-1">
              {i > 0 && <span className="text-gray-600 text-xs">→</span>}
              <span
                className={[
                  'text-xs font-bold px-1.5 py-0.5 rounded',
                  node === activeNodeId
                    ? 'text-accent-400 bg-accent-500/20 border border-accent-500/30'
                    : 'text-green-400 bg-green-500/10',
                ].join(' ')}
              >
                {node}
                <span className="ml-1 text-[9px] opacity-60">L{NODE_LEVEL[node] ?? 0}</span>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
