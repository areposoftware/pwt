import localforage from 'localforage';

import { Game } from './game';
import type { Save } from './save';

export class App {
  private static instance_: App;

  public static getInstance(): App {
    if (!App.instance_) {
      App.instance_ = new App();
    }

    return App.instance_;
  }

  private save_: string | undefined;
  private game_: Game | undefined;
  private saves_: Save[];
  private store_: LocalForage;

  private storageName_ = '$__pwt__$';
  private storeName_ = '$__meta__$';

  private constructor() {
    this.saves_ = [] as Save[];
    this.store_ = localforage.createInstance({
      name: this.storageName_,
      storeName: this.storeName_,
    });
  }

  public get save(): string | undefined {
    return this.save_;
  }

  public get store(): LocalForage {
    return this.store_;
  }

  public async game(name?: string): Promise<Game> {
    if (name) {
      this.game_ = new Game(name);
      this.save_ = name;
      await this.store.setItem('save', name);
    }

    if (this.game_ && this.save_ === name) {
      return this.game_;
    }

    if (this.game_) {
      return this.game_;
    }

    throw new Error('Tried to return a Game instance that does not exist.');
  }

  public async getSaves(): Promise<Save[]> {
    this.saves_ = (await this.store.getItem('saves')) ?? ([] as Save[]);
    return this.saves_;
  }

  public async setSaves(): Promise<void> {
    await this.store.setItem('saves', this.saves_);
  }

  public async addSave(save: Save): Promise<void> {
    this.saves_.push(save);
    await this.setSaves();
  }

  public async removeSave(save: Save): Promise<void> {
    this.saves_ = this.saves_.filter((s) => s.uuid !== save.uuid);
    await this.setSaves();
  }
}
