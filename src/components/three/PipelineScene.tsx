import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import type { VisualizationProps } from '../../lib/types';
import { DataFlow } from './DataFlow';
import { FloatingParticles } from './FloatingParticles';
import { StepNode } from './StepNode';

// Diagonal layout: bottom-left to top-right
const STEP_POSITIONS: Record<string, [number, number, number]> = {
  input: [-4.5, -3.2, 0],
  chunking: [-3.2, -2.4, 0],
  embedding: [-2.0, -1.6, 0],
  vectordb: [-0.8, -0.8, 0],
  query: [0.4, 0.0, 0],
  retrieval: [1.6, 0.8, 0],
  prompt: [2.8, 1.6, 0],
  answer: [4.0, 2.4, 0],
};

const STEP_COLORS: Record<string, string> = {
  input: '#818cf8',
  chunking: '#6366f1',
  embedding: '#8b5cf6',
  vectordb: '#a78bfa',
  query: '#f59e0b',
  retrieval: '#3b82f6',
  prompt: '#06b6d4',
  answer: '#10b981',
};

const STEP_ORDER = ['input', 'chunking', 'embedding', 'vectordb', 'query', 'retrieval', 'prompt', 'answer'];

interface PipelineSceneProps extends VisualizationProps {
  steps: Array<{ id: string; label: string }>;
}

function Scene({ currentStep, completedSteps, processingStep, isPlaying, steps }: PipelineSceneProps) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#818cf8" />

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={4}
        maxDistance={20}
        maxPolarAngle={Math.PI * 0.75}
        minPolarAngle={Math.PI * 0.2}
        enableDamping
        target={[0, -0.4, 0]}
        autoRotate={false}
      />

      <FloatingParticles count={300} radius={10} />

      {/* Data flow connections */}
      {STEP_ORDER.slice(0, -1).map((step, i) => {
        const nextStep = STEP_ORDER[i + 1];
        const stepIdx = STEP_ORDER.indexOf(currentStep);
        const isFlowActive = isPlaying
          ? STEP_ORDER.indexOf(step) <= stepIdx
          : completedSteps.includes(step) && completedSteps.includes(nextStep);
        const isFlowCompleted = completedSteps.includes(step) && completedSteps.includes(nextStep);

        return (
          <DataFlow
            key={`${step}-${nextStep}`}
            from={STEP_POSITIONS[step]}
            to={STEP_POSITIONS[nextStep]}
            isActive={isFlowActive || currentStep === step || currentStep === nextStep}
            isCompleted={isFlowCompleted}
            color={STEP_COLORS[step]}
          />
        );
      })}

      {/* Step nodes */}
      {steps.map((step) => (
        <StepNode
          key={step.id}
          position={STEP_POSITIONS[step.id] ?? [0, 0, 0]}
          label={step.label}
          isActive={currentStep === step.id}
          isCompleted={completedSteps.includes(step.id)}
          isProcessing={processingStep === step.id}
          onClick={() => {}}
          color={STEP_COLORS[step.id] ?? '#818cf8'}
        />
      ))}
    </>
  );
}

export function PipelineScene(props: PipelineSceneProps) {
  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene {...props} />
      </Canvas>
    </div>
  );
}
