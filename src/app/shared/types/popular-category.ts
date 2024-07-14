export interface PopularCategoryResponse {
  data: PopularCategory[];
  errors: any[];
  hasViewPermission: boolean | null;
  messages: any[];
  succeeded: boolean;
}

export interface PopularCategory {
  transactionCategory: string;
  transactionTypeId: number;
  transactionCount: number;
  transactionVolume: number;
}
