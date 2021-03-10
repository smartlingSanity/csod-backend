/* eslint-disable no-console */
export default class User {
  constructor(id, enabledLocales) {
    this.id = id;
    this.enabledLocales = enabledLocales;
  }

  get enabledLocales() {
    return this._enabledLocales || [];
  }

  set enabledLocales(locales) {
    this._enabledLocales = locales;
  }

  getDominantLocale() {
    if (this.enabledLocales.length > 0) {
      return this.enabledLocales[0];
    }
    return 'us';
  }
}
