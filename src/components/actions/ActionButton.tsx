import { LucideIcon } from 'lucide-react';
import { ActionType } from '@app-types/game-types';

interface ActionButtonProps {
    actionType: ActionType;
    icon: LucideIcon;
    title: string;
    description: string;
    iconBgColor: string;
    iconColor: string;
    hoverBorderColor: string;
    onClick: (actionType: ActionType) => void;
    disabled: boolean;
    className?: string;
}

const getHoverBorderClass = (color: string): string => {
    const colorMap: Record<string, string> = {
        'blue-400': 'hover:border-blue-400',
        'purple-400': 'hover:border-purple-400',
        'blue-300': 'hover:border-blue-300',
        'amber-400': 'hover:border-amber-400',
    };
    return colorMap[color] || 'hover:border-gray-400';
};

export const ActionButton = ({
    actionType,
    icon: Icon,
    title,
    description,
    iconBgColor,
    iconColor,
    hoverBorderColor,
    onClick,
    disabled,
    className = '',
}: ActionButtonProps) => {
    return (
        <button
            onClick={() => onClick(actionType)}
            disabled={disabled}
            className={`group bg-white dark:bg-gray-700 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 ${getHoverBorderClass(hoverBorderColor)} hover:shadow-lg transition-all active:scale-95 text-left ${className}`}
        >
            <div className={`${iconBgColor} w-10 h-10 rounded-full flex items-center justify-center mb-2 ${iconColor}`}>
                <Icon size={20} />
            </div>
            <h3 className="font-bold text-sm">{title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        </button>
    );
};

