export interface LogEntry {
    id: number;
    text: string;
    type: 'info' | 'danger' | 'success' | 'warning';
}

export interface GameState {
    time: number; // Minutes from 9:00 (540 mins total)
    stress: number; // 0-100
    suspicion: number; // 0-100
    coffee: number; // 0-100 (Energy)
    ticketsMoved: number;
    isGameOver: boolean;
    isVictory: boolean;
    paused: boolean;
}

export type GameAction =
    | { type: 'TICK' }
    | { type: 'ACTION'; payload: ActionType }
    | { type: 'RANDOM_EVENT'; payload: RandomEvent }
    | { type: 'START_GAME' }
    | { type: 'RESET_GAME' }
    | { type: 'SET_PAUSED'; payload: boolean };

export type ActionType =
    | 'moveTicket'
    | 'coffee'
    | 'callMeeting'
    | 'linkedin'
    | 'buzzwords'
    | 'blameDev';

export interface RandomEvent {
    text: string;
    damageStress: number;
    damageSuspicion: number;
}

export interface ActionEffect {
    stressChange: number;
    suspicionChange: number;
    coffeeChange: number;
    logMsg: string;
    logType: 'info' | 'success' | 'warning';
}

