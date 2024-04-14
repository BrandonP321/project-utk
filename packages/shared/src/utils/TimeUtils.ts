export class TimeUtils {
  static minutesToMilliseconds(minutes: number): number {
    return minutes * 60 * 1000;
  }

  static hoursToMilliseconds(hours: number): number {
    return hours * 60 * 60 * 1000;
  }
}
