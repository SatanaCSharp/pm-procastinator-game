import { useEffect } from 'react';
import { GameState } from '@app-types/game-types';

interface UseGameOverProps {
    gameState: GameState;
    addLog: (text: string, type?: 'info' | 'danger' | 'success' | 'warning') => void;
}

const STRESS_THRESHOLD = 100;
const SUSPICION_THRESHOLD = 100;

const getGameOverMessage = (gameState: GameState): string | null => {
    if (gameState.stress >= STRESS_THRESHOLD) {
        return "ВИ ЗГОРІЛИ! Нервовий зрив.";
    }
    if (gameState.suspicion >= SUSPICION_THRESHOLD) {
        return "ВАС ЗВІЛЬНИЛИ! Бос помітив, що ви дивитесь меми.";
    }
    return null;
};

export const useGameOver = ({ gameState, addLog }: UseGameOverProps) => {
    useEffect(() => {
        if (!gameState.isGameOver) {
            return;
        }

        const message = getGameOverMessage(gameState);
        if (message) {
            addLog(message, 'danger');
        }
    }, [gameState.isGameOver, gameState.stress, gameState.suspicion, addLog]);
};

