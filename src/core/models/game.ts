import Dexie from 'dexie';

export class Game extends Dexie {
  constructor(name: string) {
    super(name);

    this.version(1).stores({});
  }
}
