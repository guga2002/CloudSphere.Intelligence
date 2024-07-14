// popular-location.ts
export interface PopularLocation {
  location: string;
  quantity: number;
}

export interface PopularLocationResponse {
  data: PopularLocation[];
  errors: any[];
  hasViewPermission: boolean | null;
  messages: any[];
  succeeded: boolean;
}
