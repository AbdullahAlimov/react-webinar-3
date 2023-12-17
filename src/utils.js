
/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @param {Number} start - Начальное значение для генератора.
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Добавление дефисов для указания уровня вложенности в иерархии
 * @param {String} title - название категории.
 * @param {Number} depth - глубина вложенности
 * @returns {String} - item с дефисами для указания уровня вложенности.
 */
function addHierarchyDash(title,depth) {
  return ("- ".repeat(depth) + title)
}

/**
 * Преобразование категорий в структурированный формат с указанием глубины вложенности
 * @param {Array} categories - Массив категорий.
 * @param {Number} depth - Глубина вложенности (по умолчанию 0).
 * @returns {Array} - Структурированный массив категорий с указанием глубины вложенности.
 */
export function processCategories(categories, depth = 0) {

  const updatedCategories = []; // Массив для хранения обрабртанных категорий
  const processedItems = []; // Массив для хранения уже отработанных id, с помощью него значительно уменьшается кол-во вызовов рекурсивной функции.

  /**
   * Рекурсивная функция для обхода и структурирования категорий
   * @param {Array} list - Массив категорий для обработки.
   * @param {Number} depth - Глубина вложенности.
   */
  function recursionPush(list, depth) {
    list.map((item) => {
      if (!processedItems.includes(item._id)) {
        const children = categories.filter((children) => item._id === children.parent?._id);// Получаем дочерние категории

        if (children.length || depth !== 0) {
          processedItems.push(item._id);
          updatedCategories.push({ value: item._id, title: addHierarchyDash(item.title,depth) });// Добавляем структурированную категорию в массив
          recursionPush(children, depth + 1); // Рекурсивно вызываем функцию для дочерних категорий
        }
      }
    });
  }
  // Начинаем обработку с корневых категорий
  recursionPush(categories, depth);

  return updatedCategories;
}