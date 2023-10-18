import { ReactNode } from 'react';
import ProgressLine from './ProgressLine';

export default interface Rule {
  id: number;
  title: string;
  progress: ProgressLine[];
  description?: ReactNode;
  summary?: string;
  status?: 'progress' | 'completed';
  disabled?: boolean;
}
