import { GameState } from '@app-types/game-types';
import { END_TIME, MINUTES_PER_TICK } from '@constants/constants';
import { clamp } from '../utils';

const MAX_VALUE = 100;
const STRESS_INCREASE_PER_TICK = 0.3;
const SUSPICION_DECREASE_PER_TICK = 0.1;
const COFFEE_DECREASE_PER_TICK = 0.5;
const LOW_COFFEE_THRESHOLD = 10;
const LOW_COFFEE_STRESS_PENALTY = 1;

export const handleTick = (state: GameState): GameState => {
    // Victory Condition
    if (state.time >= END_TIME) {
        return { ...state, isVictory: true, paused: true };
    }

    // Defeat Conditions
    if (state.stress >= MAX_VALUE) {
        return { ...state, isGameOver: true, paused: true };
    }
    if (state.suspicion >= MAX_VALUE) {
        return { ...state, isGameOver: true, paused: true };
    }

    // Natural decay/increase
    let newStress = state.stress + STRESS_INCREASE_PER_TICK;
    let newSuspicion = clamp(state.suspicion - SUSPICION_DECREASE_PER_TICK, 0, MAX_VALUE);
    let newCoffee = state.coffee - COFFEE_DECREASE_PER_TICK;

    // Low coffee penalty
    if (state.coffee <= LOW_COFFEE_THRESHOLD) {
        newStress += LOW_COFFEE_STRESS_PENALTY;
    }

    return {
        ...state,
        time: state.time + MINUTES_PER_TICK,
        stress: clamp(newStress, 0, MAX_VALUE),
        suspicion: clamp(newSuspicion, 0, MAX_VALUE),
        coffee: clamp(newCoffee, 0, MAX_VALUE),
    };
};

