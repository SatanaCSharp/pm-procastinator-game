import { GameState, ActionType } from '@app-types/game-types';
import { ACTION_EFFECTS } from '@constants/constants';
import { clamp } from '../utils';

export const handleAction = (state: GameState, actionType: ActionType): GameState => {
    const effect = ACTION_EFFECTS[actionType];

    if (!effect) {
        return state;
    }

    let updatedState = {
        ...state,
        stress: clamp(state.stress + effect.stressChange, 0, 100),
        suspicion: clamp(state.suspicion + effect.suspicionChange, 0, 100),
        coffee: clamp(state.coffee + effect.coffeeChange, 0, 100),
    };

    // Special handling for moveTicket
    if (actionType === 'moveTicket') {
        updatedState.ticketsMoved = state.ticketsMoved + 1;
    }

    return updatedState;
};

