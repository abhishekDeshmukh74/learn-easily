import { ConceptCategory, Difficulty } from '../../lib/types';
import { registerConcept } from '../registry';
import { DfsVisualization } from './DfsVisualization';
import { DFS_COLOR, dfsSteps } from './steps';

registerConcept({
  id: 'dfs',
  title: 'Depth-First Search (DFS)',
  description:
    'Visualize DFS node-by-node: watch the stack grow and shrink as the algorithm dives deep and backtracks through a graph.',
  category: ConceptCategory.ALGORITHMS,
  difficulty: Difficulty.BEGINNER,
  icon: 'GitBranch',
  color: DFS_COLOR,
  steps: dfsSteps,
  Visualization: DfsVisualization,
});
