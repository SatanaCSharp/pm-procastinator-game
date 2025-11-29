import { LucideIcon } from 'lucide-react';

interface ProgressBarProps {
    value: number;
    color: string;
    icon: LucideIcon;
    label: string;
}

export const ProgressBar = ({ value, color, icon: Icon, label }: ProgressBarProps) => {
    const isCritical = value > 80 && label !== "Кофеїн (Енергія)";

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-1 text-sm font-bold text-gray-700 dark:text-gray-500">
                <span className="flex items-center gap-2">
                    <Icon size={16} /> {label}
                </span>
                <span>{Math.round(value)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 overflow-hidden relative">
                <div
                    className={`h-4 rounded-full transition-all duration-300 ${color}`}
                    style={{ width: `${value}%` }}
                />
                {isCritical && (
                    <div className="absolute inset-0 bg-red-500 opacity-20 animate-pulse" />
                )}
            </div>
        </div>
    );
};

