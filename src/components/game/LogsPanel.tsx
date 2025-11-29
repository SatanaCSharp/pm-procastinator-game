import { useRef, useEffect } from 'react';
import { LogEntry } from '@app-types/game-types';
import { formatLogTime } from '@utils/formatters';

interface LogsPanelProps {
    logs: LogEntry[];
}

const getLogColorClass = (type: LogEntry['type']): string => {
    switch (type) {
        case 'danger':
            return 'text-red-400 font-bold';
        case 'success':
            return 'text-green-300';
        case 'warning':
            return 'text-yellow-300';
        default:
            return '';
    }
};

export const LogsPanel = ({ logs }: LogsPanelProps) => {
    const logContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = 0;
        }
    }, [logs]);

    return (
        <div
            className="bg-black/80 text-green-400 p-4 rounded-lg font-mono text-sm h-32 overflow-y-auto shadow-inner border border-gray-700"
            ref={logContainerRef}
        >
            <div className="opacity-50 text-xs border-b border-gray-700 mb-2 pb-1 sticky top-0 bg-black/80">
                System Logs
            </div>
            {logs.length === 0 && (
                <span className="opacity-50">...waiting for input...</span>
            )}
            {logs.map((log) => (
                <div
                    key={log.id}
                    className={`mb-1 animate-fadeIn ${getLogColorClass(log.type)}`}
                >
                    <span className="opacity-50 text-xs">
                        [{formatLogTime(log.id)}]
                    </span>{' '}
                    {log.text}
                </div>
            ))}
        </div>
    );
};

