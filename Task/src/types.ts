export interface Item {
    id: number;
    title: string;
    description: string;
    createdAt: string;
  }
  
  export interface ApiResponse {
    total: number;
    skip: number;
    take: number;
    data: Item[] | [];
  }