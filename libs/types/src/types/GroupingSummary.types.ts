export type GroupingSummary = {
  _id: string;
  name: string;
  amount: number;
  balance: number;
  currency: string;
  rentability: number;
  positionDate: Date | string;
  isOwn: boolean;
  fxRate: number;
  fxDate: string | null;
  benchmarks: Array<{
    securityId: string;
    isPrimary: boolean;
  }>;
};