'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from './ui/Button';

interface TechnicalSheetProps {
  exerciseName: string;
  distance: number;
  onSave: (balls: number[]) => void;
  isLoading?: boolean;
}

const TechnicalSheet = ({ exerciseName, distance, onSave, isLoading }: TechnicalSheetProps) => {
  const t = useTranslations('training');
  const [balls, setBalls] = useState<number[]>(Array(6).fill(0));

  const toggleBall = (index: number) => {
    const newBalls = [...balls];
    newBalls[index] = newBalls[index] === 0 ? 1 : 0;
    setBalls(newBalls);
  };

  const total = balls.reduce((acc, b) => acc + b, 0);

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-white">
      <div className="bg-gray-50 p-4 border-b border-border flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">{exerciseName}</h3>
          <p className="text-sm text-muted">{t('distance')}: {distance}m</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-accent">{total}</span>
          <span className="text-sm text-muted"> / 6</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          {balls.map((val, idx) => (
            <button
              key={idx}
              onClick={() => toggleBall(idx)}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl font-bold transition-all
                ${val === 1
                  ? 'bg-accent border-accent text-white'
                  : 'bg-white border-border text-gray-300 hover:border-accent/50'
                }`}
            >
              {val}
            </button>
          ))}
        </div>

        <Button
          className="w-full"
          onClick={() => onSave(balls)}
          disabled={isLoading}
        >
          {isLoading ? '...' : t('saveResult')}
        </Button>
      </div>
    </div>
  );
};

export default TechnicalSheet;
