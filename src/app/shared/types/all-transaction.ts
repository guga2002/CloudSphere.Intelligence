export interface Transaction {
  amount: number;
  categoryId: number;
  channelId: number;
  currencyNameId: number;
  date: string;
  equivalentInGel: number;
  merchantId: number;
  transactionId: string;
  status: string;
}
