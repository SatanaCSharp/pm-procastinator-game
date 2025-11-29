import { useState, useCallback } from 'react';
import { LogEntry } from '@app-types/game-types';

const MAX_LOGS = 5;

export const useGameLogs = () => {
    const [logs, setLogs] = useState<LogEntry[]>([]);

    const addLog = useCallback((text: string, type: LogEntry['type'] = 'info') => {
        setLogs(prev => [{ id: Date.now(), text, type }, ...prev].slice(0, MAX_LOGS));
    }, []);

    const clearLogs = useCallback(() => {
        setLogs([]);
    }, []);

    return {
        logs,
        addLog,
        clearLogs,
    };
};

