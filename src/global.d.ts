import { Database } from './core/models/database';

declare global {
  // eslint-disable-next-line no-var
  var __DB_NAME__: string;
  // eslint-disable-next-line no-var
  var __DB__: Database;
}
