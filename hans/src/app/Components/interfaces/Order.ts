export interface Order {
  id: string
  name: string;
  wohnhausId: number; 
  wohnhaus: string;
  datum: string;
  products: [];
  week: string;
}