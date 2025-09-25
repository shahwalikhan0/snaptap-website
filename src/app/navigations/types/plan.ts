// {
//     "id": 1,
//     "name": "Starter",
//     "total_scans": 50
//     "monthly_price": 9.99,
//     "yearly_price": 99.99,
//   },

export interface Plan {
  id: number;
  name: string;
  total_scans: number;
  monthly_price: number;
  yearly_price: number;
}
