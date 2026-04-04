import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import type { DetailPanelProps } from '../../lib/types';
import type { RagPipelineData } from './data';
import { REDIS_PIPELINE } from './data';
import {
  AnswerPanel,
  ChunkingPanel,
  EmbeddingPanel,
  InputPanel,
  PromptPanel,
  QueryPanel,
  RetrievalPanel,
  VectorDbPanel,
} from './RagPanels';

function StepDataSection({ currentStep, data }: { currentStep: string; data: RagPipelineData }) {
  const panels: Record<string, React.ReactNode> = {
    input: <InputPanel data={data} />,
    chunking: <ChunkingPanel data={data} />,
    embedding: <EmbeddingPanel data={data} />,
    vectordb: <VectorDbPanel data={data} />,
    query: <QueryPanel data={data} />,
    retrieval: <RetrievalPanel data={data} />,
    prompt: <PromptPanel data={data} />,
    answer: <AnswerPanel data={data} />,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
      >
        {panels[currentStep] ?? null}
      </motion.div>
    </AnimatePresence>
  );
}

export function RagDetailPanel({ step, currentStep }: DetailPanelProps) {
  const [deepDiveOpen, setDeepDiveOpen] = useState(false);

  if (!step) return null;

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-5 space-y-5">
        <div>
          <h2 className="text-xl font-bold text-gray-50 mb-1">{step.label}</h2>
          <p className="text-sm text-gray-400">{step.description}</p>
        </div>

        <div className="rounded-xl border border-gray-700/50 bg-gray-900/40 p-4">
          <StepDataSection currentStep={currentStep} data={REDIS_PIPELINE} />
        </div>
      </div>
    </div>
  );
}
