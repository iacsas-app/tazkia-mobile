import ProgressLine from './ProgressLine';

export default interface Rule {
  id: number;
  title: string;
  description: string;
  progress: ProgressLine[];
  summary?: string;
  status?: 'progress' | 'completed';
  disabled?: boolean;
}
