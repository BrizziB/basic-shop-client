import { BaseEntity } from './BaseEntity';

export class User extends BaseEntity {
  email: string;
  password: string;
  firstname: string;
  secondname: string;
  age: string;
  country: string;
  city: string;
  address: string;
  mainHobby: string;
  job: string;
  favTvShow: string;
}
