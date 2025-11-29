import { Clock, Briefcase } from 'lucide-react';
import { formatTime } from '@utils/formatters';

interface GameHeaderProps {
    time: number;
}

export const GameHeader = ({ time }: GameHeaderProps) => {
    return (
        <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                    <Briefcase size={24} />
                </div>
                <div>
                    <h1 className="text-xl font-bold leading-none">PM Procrastinator</h1>
                    <p className="text-xs text-indigo-200 opacity-80">Симулятор Виживання</p>
                </div>
            </div>
            <div className="flex items-center gap-4 bg-indigo-700 px-4 py-2 rounded-lg border border-indigo-500">
                <Clock className="animate-pulse" />
                <span className="text-2xl font-mono font-bold tracking-widest">
                    {formatTime(time)}
                </span>
            </div>
        </div>
    );
};

