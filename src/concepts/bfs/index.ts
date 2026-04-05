import { ConceptCategory, Difficulty } from '../../lib/types';
import { registerConcept } from '../registry';
import { BfsVisualization } from './BfsVisualization';
import { BFS_COLOR, bfsSteps } from './steps';

registerConcept({
  id: 'bfs',
  title: 'Breadth-First Search (BFS)',
  description:
    'Visualize BFS level-by-level: see how the queue grows as the algorithm sweeps each depth layer before going deeper.',
  category: ConceptCategory.ALGORITHMS,
  difficulty: Difficulty.BEGINNER,
  icon: 'Layers',
  color: BFS_COLOR,
  steps: bfsSteps,
  Visualization: BfsVisualization,
});
