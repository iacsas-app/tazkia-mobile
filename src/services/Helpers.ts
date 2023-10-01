export const groupBy = (items: any, key: any) =>
  items.reduce(
    (result: { [x: string]: any }, item: { [x: string]: string | number }) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {},
  );

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function progressPercentage(day: number, maxDays: number): string {
  return `${((day * 100) / maxDays).toPrecision(2)}%`;
}
