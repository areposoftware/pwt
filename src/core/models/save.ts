import type { SaveInterface } from '../interfaces/save-interface';

export class Save implements SaveInterface {
  createdAt: Date = new Date();
  lastPlayed: Date = new Date();
  name = 'New Game';
  uuid = '';
}
