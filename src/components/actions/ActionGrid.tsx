import { Layout, MessageCircle, Smartphone, Coffee } from 'lucide-react';
import { ActionButton } from '@components/actions/ActionButton';
import { SimpleActionButton } from '@components/actions/SimpleActionButton';
import { ActionType } from '@app-types/game-types';

interface ActionGridProps {
    onAction: (actionType: ActionType) => void;
    disabled: boolean;
}

const ACTION_CONFIGS = [
    {
        actionType: 'moveTicket' as ActionType,
        icon: Layout,
        title: 'Рухати тікети',
        description: 'Виглядає як робота. -Підозра, -Стрес.',
        iconBgColor: 'bg-blue-100 dark:bg-blue-900',
        iconColor: 'text-blue-600 dark:text-blue-300',
        hoverBorderColor: 'blue-400',
    },
    {
        actionType: 'callMeeting' as ActionType,
        icon: MessageCircle,
        title: 'Створити Мітинг',
        description: 'Зменшує підозру, але втомлює.',
        iconBgColor: 'bg-purple-100 dark:bg-purple-900',
        iconColor: 'text-purple-600 dark:text-purple-300',
        hoverBorderColor: 'purple-400',
    },
    {
        actionType: 'linkedin' as ActionType,
        icon: Smartphone,
        title: 'Скролити LinkedIn',
        description: 'Дуже розслабляє, але бос бачить.',
        iconBgColor: 'bg-sky-100 dark:bg-sky-900',
        iconColor: 'text-sky-600 dark:text-sky-300',
        hoverBorderColor: 'blue-300',
    },
    {
        actionType: 'coffee' as ActionType,
        icon: Coffee,
        title: 'Пити каву',
        description: 'Дає енергію, трохи знижує стрес.',
        iconBgColor: 'bg-amber-100 dark:bg-amber-900',
        iconColor: 'text-amber-600 dark:text-amber-300',
        hoverBorderColor: 'amber-400',
    },
];

const SIMPLE_ACTIONS = [
    { actionType: 'buzzwords' as ActionType, label: '💬 Кинути базворд в чат' },
    { actionType: 'blameDev' as ActionType, label: '👉 Звинуватити бекенд' },
];

export const ActionGrid = ({ onAction, disabled }: ActionGridProps) => {
    return (
        <div className="grid grid-cols-2 gap-3 mb-4 flex-grow">
            {ACTION_CONFIGS.map((config) => (
                <ActionButton
                    key={config.actionType}
                    {...config}
                    onClick={onAction}
                    disabled={disabled}
                />
            ))}

            {SIMPLE_ACTIONS.map(({ actionType, label }) => (
                <SimpleActionButton
                    key={actionType}
                    actionType={actionType}
                    label={label}
                    onClick={onAction}
                    disabled={disabled}
                />
            ))}
        </div>
    );
};

