export type ClassesProp<T extends string> = {
  [key in T]?: string;
};

export function noopTypeGuard<T>(value: any): value is T {
  return true;
}
