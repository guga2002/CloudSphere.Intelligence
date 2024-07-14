export interface PopularChanel {
  channelType: string;
  quantity: number;
  volume: number;
  average: number;
}

export interface PopularChanelResponse {
  data: PopularChanel[];
}
