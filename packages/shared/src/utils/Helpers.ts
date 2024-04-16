export class Helpers {
  static wait(ms: number) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }
}
