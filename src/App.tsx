import { useGame } from '@hooks/useGame';
import { GameHeader } from '@components/game/GameHeader';
import { StatusPanel } from '@components/game/StatusPanel';
import { ActionGrid } from '@components/actions/ActionGrid';
import { LogsPanel } from '@components/game/LogsPanel';
import { GameOverlay } from '@components/overlays/GameOverlay';

export default function App() {
    const { gameState, logs, startGame, handleAction } = useGame();

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <GameHeader time={gameState.time} />

                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatusPanel gameState={gameState} />

                    <div className="col-span-1 md:col-span-2 flex flex-col relative min-h-[400px]">
                        <GameOverlay gameState={gameState} onStartGame={startGame} />

                        <ActionGrid
                            onAction={handleAction}
                                disabled={gameState.paused}
                        />

                        <LogsPanel logs={logs} />
                    </div>
                </div>
            </div>

            <div className="fixed bottom-4 text-xs text-gray-400 text-center w-full pointer-events-none">
                PM Simulator v1.0 | Не сприймати серйозно
            </div>
        </div>
    );
}
