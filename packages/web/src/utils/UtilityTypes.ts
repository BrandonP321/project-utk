export type ClassesProp<T extends string> = {
  [key in T]?: string;
};
