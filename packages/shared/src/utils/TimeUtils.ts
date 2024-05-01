export class TimeUtils {
  static minutesToMilliseconds(minutes: number): number {
    return minutes * 60 * 1000;
  }

  static hoursToMilliseconds(hours: number): number {
    return hours * 60 * 60 * 1000;
  }

  static minutesToSeconds(minutes: number): number {
    return minutes * 60;
  }

  static hoursToSeconds(hours: number): number {
    return hours * 60 * 60;
  }

  static daysToSeconds(days: number): number {
    return days * 24 * 60 * 60;
  }
}
