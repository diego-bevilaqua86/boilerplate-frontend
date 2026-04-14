export type DataSet = {
  label: string;
  value: number;
};

export type PeriodType =
  | 'month'
  | 'year'
  | 'threeMonths'
  | 'sixMonths'
  | 'twelveMonths'
  | 'twentyFourMonths'
  | 'sinceInception'
  | [string, string];
