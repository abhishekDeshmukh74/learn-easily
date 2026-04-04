import {
  Binary,
  Database,
  FileText,
  Filter,
  MessageSquare,
  Scissors,
  Search,
  Sparkles,
} from 'lucide-react';
import type { ConceptStep } from '../lib/types';

const iconMap: Record<string, typeof FileText> = {
  FileText,
  Scissors,
  Binary,
  Database,
  Search,
  Filter,
  MessageSquare,
  Sparkles,
};

export function StepNav({
  steps,
  currentStep,
  completedSteps,
  processingStep,
  onStepClick,
}: {
  steps: ConceptStep[];
  currentStep: string;
  completedSteps: string[];
  processingStep: string | null;
  onStepClick: (stepId: string) => void;
}) {
  return (
    <nav className="flex sm:flex-col gap-1">
      {steps.map((step) => {
        const isActive = step.id === currentStep;
        const Icon = iconMap[step.icon] ?? Sparkles;

        return (
          <button
            key={step.id}
            onClick={() => onStepClick(step.id)}
            type="button"
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
              isActive
                ? 'bg-primary-600/20 border border-primary-500/30 text-gray-50'
                : 'text-gray-500 hover:bg-gray-800/30 hover:text-gray-400'
            }`}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-800 text-gray-500">
              <Icon className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">{step.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
