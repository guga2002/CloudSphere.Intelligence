export interface Merchant {
  name: string;
  volume: number;
  quantity: number;
  average: number;
}

export interface MerchantResponse {
  data: Merchant[];
  errors: string[];
  hasViewPermission: boolean;
  messages: string[];
  succeeded: boolean;
}
