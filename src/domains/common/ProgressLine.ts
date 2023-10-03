export default interface ProgressLine {
  startDate: number; // first date of progression
  day: number; // last day of progression ie : (1, 2, 3) - the day is 3
  errors: number[]; // occurred errors during progression
  evaluated: boolean;
}
