import { Viaje } from './viaje';

export class ViajesGridResult {
  rows: Viaje[];
  count: number;

  constructor(item?: any) {
    this.rows = item?.rows ? item.rows.map((x: any) => new Viaje(x)) : [];
    this.count = item?.count ?? 0;
  }
}
