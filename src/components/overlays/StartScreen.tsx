import { Play } from 'lucide-react';

interface StartScreenProps {
    onStartGame: () => void;
}

export const StartScreen = ({ onStartGame }: StartScreenProps) => {
    return (
        <div className="absolute inset-0 z-10 bg-white/90 dark:bg-gray-800/95 flex flex-col items-center justify-center text-center p-8 rounded-xl backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-indigo-600 mb-4">
                Готові до "роботи"?
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
                Твоя задача: дожити до 18:00.<br />
                Тримай стрес низьким, а боса спокійним.<br />
                І головне — <b>не працюй</b> по-справжньому.
            </p>
            <button
                onClick={onStartGame}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-bold text-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg"
            >
                <Play size={20} /> Почати Дейлік
            </button>
        </div>
    );
};

