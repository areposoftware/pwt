import Dexie from 'dexie';

export class Database extends Dexie {
  constructor(name: string) {
    super(name);

    this.version(1).stores({});
  }
}
