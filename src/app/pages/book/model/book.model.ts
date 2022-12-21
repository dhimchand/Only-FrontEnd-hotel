export interface Book {
  id: number;
  status: 'reserved' | 'checked-in' | 'checked-out';
  roomNumber: string;
  duration: number; // dalam satuan malam, jika 2 berarti 2 malam menginap.
  guestCount: number; // jumlah tamu yang menginap dalam 1 kamar
  reserve: Guest;
}

export interface Guest {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface ROOM {
  number: number;
  status : boolean;
}


export const HOTEL = 'hotel'

export const GUESTCOUNT = [1,2,3,4]

export const ROOMNUMBER = ['A1','A2','A3','A4','A5','B1','B2','B3','B4','B5']

export const roomava = [
  {
    number :'a1',
    status : true
  },
  {
    number : 'a2',
    status : false
  }
]




