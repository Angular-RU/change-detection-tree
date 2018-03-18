export class Timer {
  readonly start = performance.now();

  public getCurrentTime() {
    if (!this.start) {
      return null;
    }

    const time = performance.now() - this.start;
    return Math.round(time);
  }

}
