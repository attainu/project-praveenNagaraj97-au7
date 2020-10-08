export class useSessionStorage {
  static setSessionItem(name, value) {
    sessionStorage.setItem(name, value);
  }

  static clearSession() {
    sessionStorage.clear();
  }

  static removeSessionItem(name) {
    sessionStorage.removeItem(name);
  }

  static getSessionItem(name) {
    const getItem = sessionStorage.getItem(name);
    return getItem;
  }
}
