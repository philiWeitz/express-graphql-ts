
import { Model } from 'objection';


export default abstract class BaseModel extends Model {

  readonly id: number;
  createdAt: Date;
  updatedAt: Date;

  static modelPaths = [__dirname];

  $beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }

}