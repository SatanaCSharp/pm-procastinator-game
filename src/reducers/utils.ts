import { RandomEvent } from '@app-types/game-types';
import { ACTION_EFFECTS, RANDOM_EVENTS, PM_PHRASES } from '@constants/constants';

export const getActionEffect = (actionType: string): { logMsg: string; logType: 'info' | 'success' | 'warning' } => {
    const effect = ACTION_EFFECTS[actionType];
    if (!effect) {
        return { logMsg: '', logType: 'info' };
    }

    if (actionType === 'buzzwords') {
        const phrase = PM_PHRASES[Math.floor(Math.random() * PM_PHRASES.length)];
        return {
            logMsg: `Сказав у чат: "${phrase}"`,
            logType: effect.logType,
        };
    }

    return {
        logMsg: effect.logMsg,
        logType: effect.logType,
    };
};

export const getRandomEvent = (): RandomEvent => {
    return RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
};

export const clamp = (value: number, min: number, max: number): number => {
    return Math.min(max, Math.max(min, value));
};

