export function stackName(name: string, stage?: string, lowerCase = false) {
  let modifiedName = stage ? `UTK-${name}-${stage}` : `UTK-${name}`;

  if (lowerCase) {
    modifiedName = modifiedName.toLowerCase();
  }

  modifiedName = modifiedName.replace(" ", "-");

  return modifiedName;
}
