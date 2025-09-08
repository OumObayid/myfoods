export interface Good{
  id?:string,
  name?:string,   //? indicates that it is optional
  price: number,
  photoUrl?:string,
  amount?: any
}
