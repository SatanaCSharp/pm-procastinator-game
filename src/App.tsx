import { useState, useEffect, useRef } from 'react';
import {
    Coffee,
    Clock,
    AlertTriangle,
    Briefcase,
    MessageCircle,
    Layout,
    Monitor,
    Smartphone,
    CheckCircle,
    XCircle,
    Play,
    RotateCcw
} from 'lucide-react';

// --- Types & Interfaces ---
interface LogEntry {
    id: number;
    text: string;
    type: 'info' | 'danger' | 'success' | 'warning';
}

interface GameState {
    time: number; // Minutes from 9:00 (540 mins total)
    stress: number; // 0-100
    suspicion: number; // 0-100
    coffee: number; // 0-100 (Energy)
    ticketsMoved: number;
    isGameOver: boolean;
    isVictory: boolean;
    paused: boolean;
}

// --- Constants ---
const START_TIME = 9 * 60; // 9:00 AM in minutes
const END_TIME = 18 * 60; // 6:00 PM in minutes
const TOTAL_DURATION = END_TIME - START_TIME;
const TICK_RATE = 200; // ms per tick (game speed)
const MINUTES_PER_TICK = 2; // how many game minutes pass per tick

const PM_PHRASES = [
    "Давайте це запаркуємо.",
    "Я вас почув.",
    "Треба зробити сінк.",
    "Це блокер чи не блокер?",
    "А де естімейти?",
    "В нас аджайл, а не водоспад.",
    "Пінгну тебе в особисті.",
    "Зробимо ретроспективу."
];

export default function App() {
    // --- State ---
    const [gameState, setGameState] = useState<GameState>({
        time: START_TIME,
        stress: 20,
        suspicion: 10,
        coffee: 80,
        ticketsMoved: 0,
        isGameOver: false,
        isVictory: false,
        paused: true,
    });

    const [logs, setLogs] = useState<LogEntry[]>([]);
    const logContainerRef = useRef<HTMLDivElement>(null);
    const [activeEvent, setActiveEvent] = useState<string | null>(null);

    // --- Helpers ---
    const formatTime = (minutes: number) => {
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    };

    const addLog = (text: string, type: 'info' | 'danger' | 'success' | 'warning' = 'info') => {
        setLogs(prev => [{ id: Date.now(), text, type }, ...prev].slice(0, 5));
    };

    // --- Game Loop ---
    useEffect(() => {
        if (gameState.paused || gameState.isGameOver || gameState.isVictory) return;

        const interval = setInterval(() => {
            setGameState(prev => {
                // Victory Condition
                if (prev.time >= END_TIME) {
                    return { ...prev, isVictory: true, paused: true };
                }

                // Defeat Conditions
                if (prev.stress >= 100) {
                    addLog("ВИ ЗГОРІЛИ! Нервовий зрив.", 'danger');
                    return { ...prev, isGameOver: true, paused: true };
                }
                if (prev.suspicion >= 100) {
                    addLog("ВАС ЗВІЛЬНИЛИ! Бос помітив, що ви дивитесь меми.", 'danger');
                    return { ...prev, isGameOver: true, paused: true };
                }

                // Natural decay/increase
                let newStress = prev.stress + 0.3;
                let newSuspicion = prev.suspicion - 0.1; // Suspicion naturally falls if you aren't doing weird stuff
                let newCoffee = prev.coffee - 0.5;

                // Low coffee penalty
                if (prev.coffee <= 10) {
                    newStress += 1;
                    if (Math.random() > 0.9) addLog("Потрібна кава! Руки тремтять...", 'warning');
                }

                // Random Events (Passive Aggression)
                if (Math.random() > 0.96) {
                    triggerRandomEvent(prev);
                }

                return {
                    ...prev,
                    time: prev.time + MINUTES_PER_TICK,
                    stress: Math.min(100, Math.max(0, newStress)),
                    suspicion: Math.min(100, Math.max(0, newSuspicion)),
                    coffee: Math.min(100, Math.max(0, newCoffee)),
                };
            });
        }, TICK_RATE);

        return () => clearInterval(interval);
    }, [gameState.paused, gameState.isGameOver, gameState.isVictory]);

    const triggerRandomEvent = (currentState: GameState) => {
        const events = [
            { text: "Джун видалив базу даних на проді.", damageStress: 15, damageSuspicion: 0 },
            { text: "Клієнт хоче змінити колір кнопки на 'прозорий'.", damageStress: 10, damageSuspicion: 0 },
            { text: "Бос зайшов в кімнату (або Zoom).", damageStress: 5, damageSuspicion: 15 },
            { text: "Хтось не зам'ютив мікрофон і їсть чіпси.", damageStress: 8, damageSuspicion: 0 },
            { text: "Тімлід питає: 'Який статус?'", damageStress: 5, damageSuspicion: 10 },
        ];
        const evt = events[Math.floor(Math.random() * events.length)];
        addLog(evt.text, 'danger');

        // Apply immediate effects (simulating the shock)
        setGameState(prev => ({
            ...prev,
            stress: Math.min(100, prev.stress + evt.damageStress),
            suspicion: Math.min(100, prev.suspicion + evt.damageSuspicion)
        }));
    };

    // --- Actions ---

    const handleAction = (actionType: string) => {
        if (gameState.paused) return;

        let stressChange = 0;
        let suspicionChange = 0;
        let coffeeChange = 0;
        let logMsg = "";
        let logType: 'info' | 'success' | 'warning' = 'info';

        switch (actionType) {
            case 'moveTicket':
                stressChange = -5; // Satisfying
                suspicionChange = -10; // Looks like work
                coffeeChange = -2;
                logMsg = "Пересунув таску туди-сюди в Jira. Виглядає як прогрес.";
                logType = 'success';
                setGameState(prev => ({...prev, ticketsMoved: prev.ticketsMoved + 1}));
                break;

            case 'coffee':
                stressChange = -10;
                suspicionChange = 5; // Gone from desk
                coffeeChange = 40;
                logMsg = "Пішов за лате на мигдалевому молоці. +Енергія.";
                logType = 'success';
                break;

            case 'callMeeting':
                stressChange = 5; // Talking is hard
                suspicionChange = -20; // Meetings = Work
                coffeeChange = -5;
                logMsg = "Створив міт 'Sync про Sync'. Всі ненавидять, але це робота.";
                logType = 'warning';
                break;

            case 'linkedin':
                stressChange = -15; // Relaxing
                suspicionChange = 15; // Very visible
                coffeeChange = -2;
                logMsg = "Пишеш пост про 'Успішний Успіх' в LinkedIn.";
                break;

            case 'buzzwords':
                stressChange = -2;
                suspicionChange = -5;
                coffeeChange = -1;
                const phrase = PM_PHRASES[Math.floor(Math.random() * PM_PHRASES.length)];
                logMsg = `Сказав у чат: "${phrase}"`;
                break;

            case 'blameDev':
                stressChange = -5;
                suspicionChange = -5;
                coffeeChange = 0;
                logMsg = "Сказав 'Це на стороні бекенду'. Проблема зникла.";
                break;
        }

        setGameState(prev => ({
            ...prev,
            stress: Math.min(100, Math.max(0, prev.stress + stressChange)),
            suspicion: Math.min(100, Math.max(0, prev.suspicion + suspicionChange)),
            coffee: Math.min(100, Math.max(0, prev.coffee + coffeeChange)),
        }));
        addLog(logMsg, logType);
    };

    const startGame = () => {
        setGameState({
            time: START_TIME,
            stress: 20,
            suspicion: 10,
            coffee: 80,
            ticketsMoved: 0,
            isGameOver: false,
            isVictory: false,
            paused: false,
        });
        setLogs([]);
        addLog("Робочий день почався. Час імітувати бурхливу діяльність!", 'info');
    };

    // --- Components ---

    const ProgressBar = ({ value, color, icon: Icon, label }: any) => (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-1 text-sm font-bold text-gray-700 dark:text-gray-500">
                <span className="flex items-center gap-2"><Icon size={16}/> {label}</span>
                <span>{Math.round(value)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 overflow-hidden relative">
                <div
                    className={`h-4 rounded-full transition-all duration-300 ${color}`}
                    style={{ width: `${value}%` }}
                ></div>
                {/* Warning flash overlay if critical */}
                {value > 80 && label !== "Кофеїн (Енергія)" && (
                    <div className="absolute inset-0 bg-red-500 opacity-20 animate-pulse"></div>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-sans text-gray-900 dark:text-gray-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">

                {/* Header */}
                <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <Briefcase size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold leading-none">PM Procrastinator</h1>
                            <p className="text-xs text-indigo-200 opacity-80">Симулятор Виживання</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 bg-indigo-700 px-4 py-2 rounded-lg border border-indigo-500">
                        <Clock className="animate-pulse" />
                        <span className="text-2xl font-mono font-bold tracking-widest">{formatTime(gameState.time)}</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Left Panel: Status */}
                    <div className="col-span-1 space-y-2">
                        <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-xl border border-gray-200 dark:border-gray-600 shadow-inner">
                            <h2 className="text-sm uppercase tracking-wide text-gray-500 font-bold mb-4">Ваш Стан</h2>
                            <ProgressBar
                                value={gameState.stress}
                                color={gameState.stress > 80 ? "bg-red-500" : "bg-orange-400"}
                                icon={AlertTriangle}
                                label="Стрес"
                            />
                            <ProgressBar
                                value={gameState.suspicion}
                                color={gameState.suspicion > 80 ? "bg-red-600" : "bg-purple-500"}
                                icon={Monitor}
                                label="Підозра Боса"
                            />
                            <ProgressBar
                                value={gameState.coffee}
                                color={gameState.coffee < 20 ? "bg-red-400" : "bg-amber-700"}
                                icon={Coffee}
                                label="Кофеїн (Енергія)"
                            />
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                            <div className="text-xs text-blue-600 dark:text-blue-300 font-bold uppercase mb-2">Jira Stats</div>
                            <div className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                                {gameState.ticketsMoved} <span className="text-sm font-normal">тікетів "рухано"</span>
                            </div>
                        </div>
                    </div>

                    {/* Center Panel: Actions (The Desk) */}
                    <div className="col-span-1 md:col-span-2 flex flex-col relative min-h-[400px]">

                        {/* Overlay for Game Over/Start */}
                        {(gameState.paused && !gameState.isGameOver && !gameState.isVictory && gameState.time === START_TIME) && (
                            <div className="absolute inset-0 z-10 bg-white/90 dark:bg-gray-800/95 flex flex-col items-center justify-center text-center p-8 rounded-xl backdrop-blur-sm">
                                <h2 className="text-3xl font-bold text-indigo-600 mb-4">Готові до "роботи"?</h2>
                                <p className="mb-6 text-gray-600 dark:text-gray-300">
                                    Твоя задача: дожити до 18:00.<br/>
                                    Тримай стрес низьким, а боса спокійним.<br/>
                                    І головне — <b>не працюй</b> по-справжньому.
                                </p>
                                <button
                                    onClick={startGame}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-bold text-lg flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg"
                                >
                                    <Play size={20} /> Почати Дейлік
                                </button>
                            </div>
                        )}

                        {(gameState.isGameOver || gameState.isVictory) && (
                            <div className="absolute inset-0 z-10 bg-white/95 dark:bg-gray-800/95 flex flex-col items-center justify-center text-center p-8 rounded-xl backdrop-blur-sm border-2 border-indigo-100">
                                {gameState.isVictory ? (
                                    <>
                                        <CheckCircle size={64} className="text-green-500 mb-4" />
                                        <h2 className="text-3xl font-bold text-green-600 mb-2">18:00! ДОДОМУ!</h2>
                                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">Ти успішно зімітував робочий день. Ніхто нічого не зрозумів. Ти герой.</p>
                                    </>
                                ) : (
                                    <>
                                        <XCircle size={64} className="text-red-500 mb-4" />
                                        <h2 className="text-3xl font-bold text-red-600 mb-2">GAME OVER</h2>
                                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                                            {gameState.stress >= 100 ? "Нервовий зрив. Ти кричав на монітор." : "HR чекає тебе з заявою. Тебе викрили."}
                                        </p>
                                    </>
                                )}
                                <button
                                    onClick={startGame}
                                    className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-full font-bold flex items-center gap-2 transition-colors shadow-lg"
                                >
                                    <RotateCcw size={18} /> Спробувати ще раз (Завтра)
                                </button>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-3 mb-4 flex-grow">
                            <button
                                onClick={() => handleAction('moveTicket')}
                                disabled={gameState.paused}
                                className="group relative bg-white dark:bg-gray-700 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-blue-400 hover:shadow-lg transition-all active:scale-95 text-left"
                            >
                                <div className="bg-blue-100 dark:bg-blue-900 w-10 h-10 rounded-full flex items-center justify-center mb-2 text-blue-600 dark:text-blue-300">
                                    <Layout size={20}/>
                                </div>
                                <h3 className="font-bold text-sm">Рухати тікети</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Виглядає як робота. -Підозра, -Стрес.</p>
                            </button>

                            <button
                                onClick={() => handleAction('callMeeting')}
                                disabled={gameState.paused}
                                className="group bg-white dark:bg-gray-700 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-purple-400 hover:shadow-lg transition-all active:scale-95 text-left"
                            >
                                <div className="bg-purple-100 dark:bg-purple-900 w-10 h-10 rounded-full flex items-center justify-center mb-2 text-purple-600 dark:text-purple-300">
                                    <MessageCircle size={20}/>
                                </div>
                                <h3 className="font-bold text-sm">Створити Мітинг</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Зменшує підозру, але втомлює.</p>
                            </button>

                            <button
                                onClick={() => handleAction('linkedin')}
                                disabled={gameState.paused}
                                className="group bg-white dark:bg-gray-700 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-blue-300 hover:shadow-lg transition-all active:scale-95 text-left"
                            >
                                <div className="bg-sky-100 dark:bg-sky-900 w-10 h-10 rounded-full flex items-center justify-center mb-2 text-sky-600 dark:text-sky-300">
                                    <Smartphone size={20}/>
                                </div>
                                <h3 className="font-bold text-sm">Скролити LinkedIn</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Дуже розслабляє, але бос бачить.</p>
                            </button>

                            <button
                                onClick={() => handleAction('coffee')}
                                disabled={gameState.paused}
                                className="group bg-white dark:bg-gray-700 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-amber-400 hover:shadow-lg transition-all active:scale-95 text-left"
                            >
                                <div className="bg-amber-100 dark:bg-amber-900 w-10 h-10 rounded-full flex items-center justify-center mb-2 text-amber-600 dark:text-amber-300">
                                    <Coffee size={20}/>
                                </div>
                                <h3 className="font-bold text-sm">Пити каву</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Дає енергію, трохи знижує стрес.</p>
                            </button>

                            <button
                                onClick={() => handleAction('buzzwords')}
                                disabled={gameState.paused}
                                className="col-span-1 bg-gray-50 dark:bg-gray-750 p-2 rounded-lg border border-gray-200 hover:bg-gray-100 dark:border-gray-600 active:bg-gray-200 text-xs font-mono text-center text-gray-600 dark:text-gray-500"
                            >
                                💬 Кинути базворд в чат
                            </button>

                            <button
                                onClick={() => handleAction('blameDev')}
                                disabled={gameState.paused}
                                className="col-span-1 bg-gray-50 dark:bg-gray-750 p-2 rounded-lg border border-gray-200 hover:bg-gray-100 dark:border-gray-600 active:bg-gray-200 text-xs font-mono text-center text-gray-600 dark:text-gray-500"
                            >
                                👉 Звинуватити бекенд
                            </button>
                        </div>

                        {/* Logs Area */}
                        <div className="bg-black/80 text-green-400 p-4 rounded-lg font-mono text-sm h-32 overflow-y-auto shadow-inner border border-gray-700" ref={logContainerRef}>
                            <div className="opacity-50 text-xs border-b border-gray-700 mb-2 pb-1 sticky top-0 bg-black/80">System Logs</div>
                            {logs.length === 0 && <span className="opacity-50">...waiting for input...</span>}
                            {logs.map((log) => (
                                <div key={log.id} className={`mb-1 animate-fadeIn ${log.type === 'danger' ? 'text-red-400 font-bold' : log.type === 'success' ? 'text-green-300' : log.type === 'warning' ? 'text-yellow-300' : ''}`}>
                                    <span className="opacity-50 text-xs">[{new Date(log.id).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}]</span> {log.text}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            {/* Footer / Instructions */}
            <div className="fixed bottom-4 text-xs text-gray-400 text-center w-full pointer-events-none">
                PM Simulator v1.0 | Не сприймати серйозно
            </div>

            <style>{`
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(5px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
                animation: fadeIn 0.3s ease-out forwards;
            }
        `}</style>
        </div>
    );
}