export class Usuario {
  id: string;
  nombre: string;
  email: string;
  role: string;
  bearer: string;
  expires_in: number;
  refresh_token: string;

  constructor(item?: any) {
    this.id = item?.id ?? '';
    this.nombre = item?.nombre ?? '';
    this.email = item?.email ?? '';
    this.role = item?.role ?? '';
    this.bearer = item?.bearer ?? '';
    this.expires_in = item?.expires_in ?? 0;
    this.refresh_token = item?.refresh_token ?? '';
  }
}
