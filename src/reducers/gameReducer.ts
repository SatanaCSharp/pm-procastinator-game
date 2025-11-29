import { GameState, GameAction } from '@app-types/game-types';
import { getInitialState } from './initialState';
import { handleTick } from './handlers/tickHandler';
import { handleAction } from './handlers/actionHandler';
import { handleRandomEvent } from './handlers/randomEventHandler';

export const gameReducer = (state: GameState, action: GameAction): GameState => {
    switch (action.type) {
        case 'START_GAME':
            return {
                ...getInitialState(),
                paused: false,
            };

        case 'RESET_GAME':
            return getInitialState();

        case 'SET_PAUSED':
            return {
                ...state,
                paused: action.payload,
            };

        case 'TICK':
            return handleTick(state);

        case 'RANDOM_EVENT':
            return handleRandomEvent(state, action.payload);

        case 'ACTION':
            return handleAction(state, action.payload);

        default:
            return state;
    }
};

export { getInitialState } from './initialState';
export { getActionEffect, getRandomEvent } from './utils';
