import { GameState, RandomEvent } from '@app-types/game-types';
import { clamp } from '../utils';

const MAX_VALUE = 100;

export const handleRandomEvent = (state: GameState, event: RandomEvent): GameState => {
    return {
        ...state,
        stress: clamp(state.stress + event.damageStress, 0, MAX_VALUE),
        suspicion: clamp(state.suspicion + event.damageSuspicion, 0, MAX_VALUE),
    };
};

