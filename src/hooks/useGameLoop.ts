import { useEffect } from 'react';
import { GameState, GameAction } from '@app-types/game-types';
import { getRandomEvent } from '@reducers/gameReducer';
import { TICK_RATE } from '@constants/constants';

interface UseGameLoopProps {
    gameState: GameState;
    dispatch: React.Dispatch<GameAction>;
    addLog: (text: string, type?: 'info' | 'danger' | 'success' | 'warning') => void;
}

const LOW_COFFEE_WARNING_CHANCE = 0.9;
const RANDOM_EVENT_CHANCE = 0.96;
const LOW_COFFEE_THRESHOLD = 10;

export const useGameLoop = ({ gameState, dispatch, addLog }: UseGameLoopProps) => {
    useEffect(() => {
        if (gameState.paused || gameState.isGameOver || gameState.isVictory) {
            return;
        }

        const interval = setInterval(() => {
            dispatch({ type: 'TICK' });

            // Check for low coffee warning
            if (gameState.coffee <= LOW_COFFEE_THRESHOLD && Math.random() > LOW_COFFEE_WARNING_CHANCE) {
                addLog("Потрібна кава! Руки тремтять...", 'warning');
            }

            // Random events
            if (Math.random() > RANDOM_EVENT_CHANCE) {
                const event = getRandomEvent();
                addLog(event.text, 'danger');
                dispatch({ type: 'RANDOM_EVENT', payload: event });
            }
        }, TICK_RATE);

        return () => clearInterval(interval);
    }, [gameState.paused, gameState.isGameOver, gameState.isVictory, gameState.coffee, dispatch, addLog]);
};

