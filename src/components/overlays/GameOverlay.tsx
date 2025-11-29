import { GameState } from '@app-types/game-types';
import { START_TIME } from '@constants/constants';
import { StartScreen } from '@components/overlays/StartScreen';
import { VictoryScreen } from '@components/overlays/VictoryScreen';
import { GameOverScreen } from '@components/overlays/GameOverScreen';

interface GameOverlayProps {
    gameState: GameState;
    onStartGame: () => void;
}

const isStartScreen = (gameState: GameState): boolean => {
    return gameState.paused && !gameState.isGameOver && !gameState.isVictory && gameState.time === START_TIME;
};

export const GameOverlay = ({ gameState, onStartGame }: GameOverlayProps) => {
    if (isStartScreen(gameState)) {
        return <StartScreen onStartGame={onStartGame} />;
    }

    if (gameState.isVictory) {
        return <VictoryScreen onStartGame={onStartGame} />;
    }

    if (gameState.isGameOver) {
        return <GameOverScreen gameState={gameState} onStartGame={onStartGame} />;
    }

    return null;
};

