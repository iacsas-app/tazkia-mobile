import { memo, useMemo, useState } from 'react';
import InvocationRepeat from '../../../domains/common/InvocationRepeat';
import ReaderItem from './ReaderItem';

type Props = {
  items: InvocationRepeat[];
  onFinish(): void;
};
function Reader({ items, ...props }: Props) {
  const [index, setIndex] = useState(1);
  const size = useMemo(() => items.length - 2, []);
  const current = items[index];

  function handlePress() {
    if (index < size) {
      setIndex(index + 1);
    }
  }
  return <ReaderItem index={index} value={current} total={size} onDone={handlePress} {...props} />;
}

export default memo(Reader);
