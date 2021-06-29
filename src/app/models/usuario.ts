export class Usuario {
  id: string;
  nombre: string;
  email: string;
  role: string;
  bearer: string;

  constructor(item?: any) {
    this.id = item?.id ?? '';
    this.nombre = item?.nombre ?? '';
    this.email = item?.email ?? '';
    this.role = item?.role ?? '';
    this.bearer = item?.bearer ?? '';
  }
}
