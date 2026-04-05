import { PipelineScene } from '../../components/three/PipelineScene';
import type { VisualizationProps } from '../../lib/types';
import { ragSteps } from './steps';

export function RagVisualization(props: VisualizationProps) {
  return <PipelineScene {...props} steps={ragSteps} />;
}
