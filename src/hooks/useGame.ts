import { useReducer, useCallback } from 'react';
import { gameReducer, getInitialState } from '@reducers/gameReducer';
import { useGameLogs } from './useGameLogs';
import { useGameLoop } from './useGameLoop';
import { useGameOver } from './useGameOver';
import { useGameActions } from './useGameActions';

const START_GAME_MESSAGE = "Робочий день почався. Час імітувати бурхливу діяльність!";

export const useGame = () => {
    const [gameState, dispatch] = useReducer(gameReducer, getInitialState());
    const { logs, addLog, clearLogs } = useGameLogs();

    // Game loop logic
    useGameLoop({ gameState, dispatch, addLog });

    // Game over messages
    useGameOver({ gameState, addLog });

    // Action handling
    const { handleAction } = useGameActions({ gameState, dispatch, addLog });

    const startGame = useCallback(() => {
        dispatch({ type: 'START_GAME' });
        clearLogs();
        addLog(START_GAME_MESSAGE, 'info');
    }, [dispatch, clearLogs, addLog]);

    return {
        gameState,
        logs,
        startGame,
        handleAction,
    };
};
