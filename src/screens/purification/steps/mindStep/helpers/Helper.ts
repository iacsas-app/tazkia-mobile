import Mind from '../../../../../domains/purification/Mind';

export function orderMindLevels(items: Mind[]) {
  return items.sort((a: Mind, b: Mind) => {
    if (a.level > b.level) {
      return -1;
    } else if (a.level < b.level) {
      return 1;
    }
    return 0;
  });
}
