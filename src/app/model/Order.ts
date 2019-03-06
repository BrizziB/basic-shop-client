import { User } from './User';
import { Product } from './Product';
import { BaseEntity } from './BaseEntity';

export class Order extends BaseEntity {
  buyes: User;
  items: Product[];

}
