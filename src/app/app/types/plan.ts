// {
//     "id": 1,
//     "name": "Basic",
//     "monthly_price": 10,
//     "yearly_price": 110,
//     "description": "Basic to start with",
//     "scans": 5
//   },

export type PlanType = {
  id: number;
  name: string;
  monthly_price: number;
  yearly_price: number;
  description: string;
  scans: number;
  /** USD per model view. Decimal from the API, so it may arrive as a string. */
  per_view_rate?: number | string;
};
