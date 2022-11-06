import { toRaw } from 'vue'
import {
  DAY_IN_MILLISEC,
  TAG_SEPARATOR,
	MONTH_IN_SEC,
	YEAR_IN_SEC,
	DAY_IN_SEC,
	HOUR_IN_SEC,
	MINUTE_IN_SEC
} from './constants';
import timeStatuses from './enums/timeStatuses';
import taskStatuses from './enums/taskStatuses';

export const getTagsArrayFromString = tags => {
  const array = tags.split(TAG_SEPARATOR);
  return array.slice(1, array.length);
};

export const getTimeStatus = dueDate => {
  if (!dueDate) {
    return '';
  }
  const currentTime = Date.now();
  const taskTime = Date.parse(dueDate);
  const timeDelta = taskTime - currentTime;
  if (timeDelta > DAY_IN_MILLISEC) {
    return '';
  }
  return timeDelta < 0 ? timeStatuses.DEADLINE : timeStatuses.EXPIRED;
};

export const normalizeTask = task => {
  return {
    ...task,
    status: task.statusId ? taskStatuses[task.statusId] : '',
    timeStatus: getTimeStatus(task.dueDate)
  };
};

export const getTargetColumnTasks = (toColumnId, tasks) => {
  return tasks.filter(task => task.columnId === toColumnId).map(task => toRaw(task));
};

export const addActive = (active, toTask, tasks) => {
  const activeIndex = tasks.findIndex(task => task.id === active.id);
  if (~activeIndex) {
    tasks.splice(activeIndex, 1);
  }

  tasks.sort((a, b) => a.sortOrder - b.sortOrder);

  if (toTask) {
    const toTaskIndex = tasks.findIndex(task => task.id === toTask.id);
    tasks.splice(toTaskIndex, 0, active);
  } else {
    tasks.push(active);
  }
  return tasks;
};

export const getImage = image => {
  // https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url
  return new URL(`../assets/img/${image}`, import.meta.url).href
}

export const getTimeAgo = date => {
	// Проверяем если дата приходит в корректном формате
  if (isNaN(Date.parse(date))) {
    return '... время не указано ...';
  }
  const seconds = Math.floor((new Date() - Date.parse(date)) / 1000);
  function getFinalString(number, pronounce) {
    return `${number} ${pronounce} назад`;
  }
	// Определяем правильное окончание
  function getPronounce(number, single, pluralTwoFour, pluralFive) {
    return number === 1
      ? single
      : number > 1 && number < 5
        ? pluralTwoFour
        : pluralFive;
  }
	// Проверяем если задача создана более года назад
	let interval = seconds / YEAR_IN_SEC;
  if (interval > 1) {
    const number = Math.floor(interval);
    const pronounce = getPronounce(number, 'год', 'года', 'лет');
    return getFinalString(number, pronounce);
  }
	// Проверяем если задача создана более месяца назад
  interval = seconds / MONTH_IN_SEC;
  if (interval > 1) {
    const number = Math.floor(interval);
    const pronounce = getPronounce(number, 'месяц', 'месяца', 'месяцев');
    return getFinalString(number, pronounce);
  }
	// Проверяем если задача создана более одного дня назад
  interval = seconds / DAY_IN_SEC;
  if (interval > 1) {
    const number = Math.floor(interval);
    const pronounce = getPronounce(number, 'день', 'дня', 'дней');
    return getFinalString(number, pronounce);
  }
	// Проверяем если задача создана более одного часа назад
  interval = seconds / HOUR_IN_SEC;
  if (interval > 1) {
    const number = Math.floor(interval);
    const pronounce = getPronounce(number, 'час', 'часа', 'часов');
    return getFinalString(number, pronounce);
  }
	// Проверяем если задача создана более одной минуты назад
  interval = seconds / MINUTE_IN_SEC;
  if (interval > 1) {
    const number = Math.floor(interval);
    const pronounce = getPronounce(number, 'минуту', 'минуты', 'минут');
    return getFinalString(number, pronounce);
  }
  return 'сейчас';
};

export const getReadableDate = date => {
	if (isNaN(Date.parse(date))) return ''
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const day = newDate.getDate();
  return `${day}.${month + 1}.${year}`;
};

export const createUUIDv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const createNewDate = () => {
  return new Date(new Date().setHours(23,59,59,999));
};

export const getPublicImage = path => {
	const publicUrl = '/api'
	return `${publicUrl}/${path}`
}
