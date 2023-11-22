const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * Возвращает конструкцию числа с "раз" или "раза" в зависимости от числа
 * @param count {Number} Число, на основе которого определяется форма слова
 * @returns {String} Конструкции "{count} раз" или "{count} раза"
 */
function getWordForm(count) {
  const units = count % 10;
  const tens = count % 100;

  if([12,13,14].includes(tens)){
    return `${count} раз`
  }
  else if([2,3,4].includes(units)){
    return `${count} разa`
  }
  else{
    return `${count} раз`
  }
}

export {
  createElement,
  getWordForm
}