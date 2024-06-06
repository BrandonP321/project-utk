export type StackNameParams = {
  stage?: string;
  lowerCase?: boolean;
  prefixOverride?: string;
};

export function stackName(name: string, params?: StackNameParams) {
  const { lowerCase, prefixOverride = "UTK", stage } = params ?? {};

  let modifiedName = stage
    ? `${prefixOverride}-${name}-${stage}`
    : `${prefixOverride}-${name}`;

  if (lowerCase) {
    modifiedName = modifiedName.toLowerCase();
  }

  modifiedName = modifiedName.replace(" ", "-");

  return modifiedName;
}
