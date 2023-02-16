export class UserData {
  fullName: string;
  gender: string;
  email: string;
  birthDate: string;
  address: string;
  city: string;
  country: string;
  hobbies: string[];
  favoriteColor: string;
  requiredSeats: number;
  motorType: string;

  constructor(data: any = {}) {
    this.fullName = data.fullName;
    this.gender = data.gender;
    this.email = data.email;
    this.birthDate = data.birthDate;
    this.address = data.address;
    this.city = data.city;
    this.country = data.country;
    this.hobbies = data.hobbies;
    this.favoriteColor = data.favoriteColor;
    this.requiredSeats = data.requiredSeats;
    this.motorType = data.motorType;
  }
}
