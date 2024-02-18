/* eslint-disable node/no-unpublished-import */
import {Galleria} from '../../common/Model';

export class Store {
  private static instance: Store;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    this.galleria = {items: []};
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }

    return Store.instance;
  }

  // Model
  private galleria: Galleria;

  public getGalleria(): Galleria {
    return this.galleria;
  }

  public deleteItem(index: number) {
    this.galleria.items = this.galleria.items.filter(
      item => item.index !== index
    );
  }
}
