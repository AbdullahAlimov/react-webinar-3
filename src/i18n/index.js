import * as translations from './translations';

class I18nService {

  /**
  * @param services {Services} Менеджер сервисов
  * @param config {Object}
  */
  constructor(services, config = {}) {
    this.services = services;
    this.listeners=new Set();
    this.config={
      lang: config.defaultLang || 'ru',
    }

    this.getSnapshot = this.getSnapshot.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.setLang = this.setLang.bind(this);
    this.translate = this.translate.bind(this);
  }

  /**
   * Перевод фразы по словарю
   * @param lang {String} Код языка
   * @param text {String} Текст для перевода
   * @param [plural] {Number} Число для плюрализации
   * @returns {String} Переведенный текст
   */

  translate= (text, plural)=>{
    let localeLang = this.config.lang;

    let result = translations[localeLang] && (text in translations[localeLang])
      ? translations[localeLang][text]
      : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(localeLang).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }

  /**
 * Смена кода языка
 * @param lang {String} Код языка
 */

  setLang= (lang)=> {
    console.log(lang, this.services.api)
    this.config={
      ...this.config,
      lang
    }
    this.services.api.setHeader('X-lang', lang);
    this.refreshListeners()
  }

  subscribe = (listener) => {
    this.listeners.add(listener);

    return () => this.listeners.delete(listener);
  }

  getSnapshot = () => {
    return this.config;
  }
  
  refreshListeners=()=> {
    this.listeners.forEach((listener) => listener());
  }
}

export default I18nService;