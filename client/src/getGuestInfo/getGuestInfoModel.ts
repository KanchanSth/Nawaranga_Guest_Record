export interface GuestInfoModel {

  room_no:string;
  passport_no:string;
  name: string;
  email: string;
  address: string;
purpose_of_visit?: string;
 
}

export interface GuestInfoRespnseModel {
  _id: string;
  room_no:string;
  passport_no:string;
  name: string;
  email: string;
  address: string;
purpose_of_visit?: string;
 
}
