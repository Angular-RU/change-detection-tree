export class Process {
  static sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
