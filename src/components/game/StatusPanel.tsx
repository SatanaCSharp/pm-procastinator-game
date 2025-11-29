import { AlertTriangle, Monitor, Coffee } from 'lucide-react';
import { ProgressBar } from '@components/ui/ProgressBar';
import { GameState } from '@app-types/game-types';

interface StatusPanelProps {
    gameState: GameState;
}

export const StatusPanel = ({ gameState }: StatusPanelProps) => {
    const getStressColor = () => gameState.stress > 80 ? "bg-red-500" : "bg-orange-400";
    const getSuspicionColor = () => gameState.suspicion > 80 ? "bg-red-600" : "bg-purple-500";
    const getCoffeeColor = () => gameState.coffee < 20 ? "bg-red-400" : "bg-amber-700";

    return (
        <div className="col-span-1 space-y-2">
            <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-xl border border-gray-200 dark:border-gray-600 shadow-inner">
                <h2 className="text-sm uppercase tracking-wide text-gray-500 font-bold mb-4">
                    Ваш Стан
                </h2>
                <ProgressBar
                    value={gameState.stress}
                    color={getStressColor()}
                    icon={AlertTriangle}
                    label="Стрес"
                />
                <ProgressBar
                    value={gameState.suspicion}
                    color={getSuspicionColor()}
                    icon={Monitor}
                    label="Підозра Боса"
                />
                <ProgressBar
                    value={gameState.coffee}
                    color={getCoffeeColor()}
                    icon={Coffee}
                    label="Кофеїн (Енергія)"
                />
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                <div className="text-xs text-blue-600 dark:text-blue-300 font-bold uppercase mb-2">
                    Jira Stats
                </div>
                <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                    {gameState.ticketsMoved}{' '}
                    <span className="text-sm font-normal">тікетів "рухано"</span>
                </div>
            </div>
        </div>
    );
};

