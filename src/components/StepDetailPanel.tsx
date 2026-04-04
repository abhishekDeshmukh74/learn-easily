import type { ConceptStep } from '../lib/types';

export function StepDetailPanel({ step }: { step: ConceptStep | undefined }) {
  if (!step) return null;

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-5 space-y-5">
        <div>
          <h2 className="text-xl font-bold text-gray-50 mb-1">{step.label}</h2>
          <p className="text-sm text-gray-400">{step.description}</p>
        </div>
      </div>
    </div>
  );
}
