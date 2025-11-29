import { CheckCircle, RotateCcw } from 'lucide-react';

interface VictoryScreenProps {
    onStartGame: () => void;
}

export const VictoryScreen = ({ onStartGame }: VictoryScreenProps) => {
    return (
        <div className="absolute inset-0 z-10 bg-white/95 dark:bg-gray-800/95 flex flex-col items-center justify-center text-center p-8 rounded-xl backdrop-blur-sm border-2 border-indigo-100">
            <CheckCircle size={64} className="text-green-500 mb-4" />
            <h2 className="text-3xl font-bold text-green-600 mb-2">
                18:00! ДОДОМУ!
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Ти успішно зімітував робочий день. Ніхто нічого не зрозумів. Ти герой.
            </p>
            <button
                onClick={onStartGame}
                className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 transition-colors shadow-lg"
            >
                <RotateCcw size={18} /> Спробувати ще раз (Завтра)
            </button>
        </div>
    );
};

