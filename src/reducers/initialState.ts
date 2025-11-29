import { GameState } from '@app-types/game-types';
import { START_TIME } from '@constants/constants';

const INITIAL_STRESS = 20;
const INITIAL_SUSPICION = 10;
const INITIAL_COFFEE = 80;

export const getInitialState = (): GameState => ({
    time: START_TIME,
    stress: INITIAL_STRESS,
    suspicion: INITIAL_SUSPICION,
    coffee: INITIAL_COFFEE,
    ticketsMoved: 0,
    isGameOver: false,
    isVictory: false,
    paused: true,
});

