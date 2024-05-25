export function stackName(name: string, stage?: string) {
  return stage ? `UTK-${name}-${stage}` : `UTK-${name}`;
}
