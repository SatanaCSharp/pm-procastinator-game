import { useCallback } from 'react';
import { GameState, GameAction, ActionType } from '@app-types/game-types';
import { getActionEffect } from '@reducers/gameReducer';

interface UseGameActionsProps {
    gameState: GameState;
    dispatch: React.Dispatch<GameAction>;
    addLog: (text: string, type?: 'info' | 'success' | 'warning') => void;
}

export const useGameActions = ({ gameState, dispatch, addLog }: UseGameActionsProps) => {
    const handleAction = useCallback((actionType: ActionType) => {
        if (gameState.paused) {
            return;
        }

        dispatch({ type: 'ACTION', payload: actionType });
        const effect = getActionEffect(actionType);
        addLog(effect.logMsg, effect.logType);
    }, [gameState.paused, dispatch, addLog]);

    return {
        handleAction,
    };
};

