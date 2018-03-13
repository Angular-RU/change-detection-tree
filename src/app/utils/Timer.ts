export class Timer {
  readonly start = performance.now();

  stop() {
    const time = performance.now() - this.start;
    return (Math.round(time) + 'ms');
  }
}
