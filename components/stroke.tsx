export function STROKE(
  size: string | undefined | null,
  color: string | undefined | null = 'white'
) {
  if (!size || !color) return undefined;
  return [
    `-${size} 0 ${color}`,
    `0 ${size} ${color}`,
    `${size} 0 ${color}`,
    `0 -${size} ${color}`
  ].join(', ');
}
