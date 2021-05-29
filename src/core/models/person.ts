import type { PersonInterface } from '../interfaces/person-interface';

export class Person implements PersonInterface {
  uuid: string;

  constructor() {
    this.uuid = '';
  }
}
