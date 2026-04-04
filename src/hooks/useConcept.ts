import { useState } from 'react';
import type { Concept } from '../lib/types';

export function useConcept(concept: Concept | undefined) {
  const steps = concept?.steps ?? [];
  const stepIds = steps.map((s) => s.id);

  const [currentStep, setCurrentStep] = useState(stepIds[0] ?? '');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [processingStep, setProcessingStep] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return {
    currentStep,
    completedSteps,
    processingStep,
    isPlaying,
    play: () => {},
    pause: () => {},
    reset: () => {},
    next: () => {},
    prev: () => {},
    jumpTo: (_stepId: string) => {},
  };
}
