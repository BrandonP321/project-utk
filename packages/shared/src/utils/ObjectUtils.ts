export class ObjectUtils {
  /**
   * Filters the properties of an object based on a list of allowed properties.
   * @returns A new object that only includes the allowed properties.
   */
  static filterProps<T extends {}, P extends keyof T>(
    obj: T,
    allowedProps: P[]
  ): Pick<T, P> {
    const filteredEntries = Object.entries(obj)
      .filter(([key]) => allowedProps.includes(key as P))
      .map(([key, value]) => [key, value]);

    return Object.fromEntries(filteredEntries) as Pick<T, P>;
  }
}
