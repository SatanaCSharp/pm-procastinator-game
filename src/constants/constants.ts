export const START_TIME = 9 * 60; // 9:00 AM in minutes
export const END_TIME = 18 * 60; // 6:00 PM in minutes
export const TOTAL_DURATION = END_TIME - START_TIME;
export const TICK_RATE = 200; // ms per tick (game speed)
export const MINUTES_PER_TICK = 2; // how many game minutes pass per tick

export const PM_PHRASES = [
    "Давайте це запаркуємо.",
    "Я вас почув.",
    "Треба зробити сінк.",
    "Це блокер чи не блокер?",
    "А де естімейти?",
    "В нас аджайл, а не водоспад.",
    "Пінгну тебе в особисті.",
    "Зробимо ретроспективу."
];

export const RANDOM_EVENTS = [
    { text: "Джун видалив базу даних на проді.", damageStress: 15, damageSuspicion: 0 },
    { text: "Клієнт хоче змінити колір кнопки на 'прозорий'.", damageStress: 10, damageSuspicion: 0 },
    { text: "Бос зайшов в кімнату (або Zoom).", damageStress: 5, damageSuspicion: 15 },
    { text: "Хтось не зам'ютив мікрофон і їсть чіпси.", damageStress: 8, damageSuspicion: 0 },
    { text: "Тімлід питає: 'Який статус?'", damageStress: 5, damageSuspicion: 10 },
];

export const ACTION_EFFECTS: Record<string, { stressChange: number; suspicionChange: number; coffeeChange: number; logMsg: string; logType: 'info' | 'success' | 'warning' }> = {
    moveTicket: {
        stressChange: -5,
        suspicionChange: -10,
        coffeeChange: -2,
        logMsg: "Пересунув таску туди-сюди в Jira. Виглядає як прогрес.",
        logType: 'success'
    },
    coffee: {
        stressChange: -10,
        suspicionChange: 5,
        coffeeChange: 40,
        logMsg: "Пішов за лате на мигдалевому молоці. +Енергія.",
        logType: 'success'
    },
    callMeeting: {
        stressChange: 5,
        suspicionChange: -20,
        coffeeChange: -5,
        logMsg: "Створив міт 'Sync про Sync'. Всі ненавидять, але це робота.",
        logType: 'warning'
    },
    linkedin: {
        stressChange: -15,
        suspicionChange: 15,
        coffeeChange: -2,
        logMsg: "Пишеш пост про 'Успішний Успіх' в LinkedIn.",
        logType: 'info'
    },
    buzzwords: {
        stressChange: -2,
        suspicionChange: -5,
        coffeeChange: -1,
        logMsg: "", // Will be set dynamically
        logType: 'info'
    },
    blameDev: {
        stressChange: -5,
        suspicionChange: -5,
        coffeeChange: 0,
        logMsg: "Сказав 'Це на стороні бекенду'. Проблема зникла.",
        logType: 'info'
    }
};

