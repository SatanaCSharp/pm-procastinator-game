import { ActionType } from '@app-types/game-types';

interface SimpleActionButtonProps {
    actionType: ActionType;
    label: string;
    onClick: (actionType: ActionType) => void;
    disabled: boolean;
}

export const SimpleActionButton = ({
    actionType,
    label,
    onClick,
    disabled,
}: SimpleActionButtonProps) => {
    return (
        <button
            onClick={() => onClick(actionType)}
            disabled={disabled}
            className="col-span-1 bg-gray-50 dark:bg-gray-750 p-2 rounded-lg border border-gray-200 hover:bg-gray-100 dark:border-gray-600 active:bg-gray-200 text-xs font-mono text-center text-gray-600 dark:text-gray-500"
        >
            {label}
        </button>
    );
};

