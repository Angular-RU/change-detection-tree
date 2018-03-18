export class Alphabet {
  static readonly index: number = 97;

  static getUniqueIndex() {
    window['position'] = window['position'] || 0;
    return window['position']++;
  }

  static getUniqueId() {
    window['currentPosition'] = window['currentPosition'] || 0;
    window['currentPosition']++;
    const currentPosition = window['currentPosition'];
    return String.fromCharCode(this.index + currentPosition - 1).toUpperCase();
  }

}
