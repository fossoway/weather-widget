const addZero = (n) => n < 10 ? `0${n}` : n;

export const getCurrentDateTime = () => {
    const months = [
        'янв',
        'фев',
        'мар',
        'апр',
        'май',
        'июн',
        'июл',
        'авг',
        'сен',
        'окт',
        'ноя',
        'дек',
    ];

    const weekdays = [
        'воскресенье',
        'понедельник',
        'вторник',
        'среда',
        'четверг',
        'пятница',
        'суббота',
    ];

    const date = new Date();

    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const dayOfWeek = weekdays[date.getDay()];

    const hours = addZero(date.getHours());
    const minutes = addZero(date.getMinutes());

    return {dayOfMonth, month, year, dayOfWeek, hours, minutes};
};