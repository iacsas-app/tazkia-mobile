import { memo, useMemo, useState } from 'react';
import InvocationRepeat from '../../../domains/common/InvocationRepeat';
import ReaderItem from './ReaderItem';

type Props = {
  items: InvocationRepeat[];
  onFinished(): void;
};
function Reader({ items, ...props }: Props) {
  const [index, setIndex] = useState(0);
  const size = useMemo(() => items.length - 1, []);
  const current = items[index];

  function handleCompleted() {
    if (index < size) {
      setIndex(index + 1);
    } else {
      props.onFinished();
    }
  }
  return <ReaderItem index={index + 1} value={current} total={size} onCompleted={handleCompleted} />;
}

export default memo(Reader);
