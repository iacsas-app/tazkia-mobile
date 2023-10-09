export default interface Rule {
  id: number;
  title: string;
  description: string;
  summary?: string;
  status?: 'progress' | 'completed';
}
