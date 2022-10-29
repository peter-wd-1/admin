export interface Customer {
  className: string;
  classcount: string;
  studentName: string;
  phonenumber: string;
  id: string;
  email: string;
  redeemdate?: string[];
}

export interface Data {
  Items: Customer[];
  Count: number;
  ScannedCount: number;
  LastEvaluatedKey: {
    id: string;
  };
}
