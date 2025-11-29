import { XCircle, RotateCcw } from 'lucide-react';
import { GameState } from '@app-types/game-types';

interface GameOverScreenProps {
    gameState: GameState;
    onStartGame: () => void;
}

const getGameOverMessage = (gameState: GameState): string => {
    if (gameState.stress >= 100) {
        return "Нервовий зрив. Ти кричав на монітор.";
    }
    return "HR чекає тебе з заявою. Тебе викрили.";
};

export const GameOverScreen = ({ gameState, onStartGame }: GameOverScreenProps) => {
    return (
        <div className="absolute inset-0 z-10 bg-white/95 dark:bg-gray-800/95 flex flex-col items-center justify-center text-center p-8 rounded-xl backdrop-blur-sm border-2 border-indigo-100">
            <XCircle size={64} className="text-red-500 mb-4" />
            <h2 className="text-3xl font-bold text-red-600 mb-2">GAME OVER</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                {getGameOverMessage(gameState)}
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

