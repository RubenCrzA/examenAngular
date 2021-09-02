import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';

@Injectable({
  providedIn: 'root',
})
export class NewslaterServiceService {
  public apiRoot: string;

  constructor(private _http: HttpClient, public configService: ConfigService) {
    this.apiRoot = configService.config.webApiBaseUrl;
  }

  validarLogin(user: string, password: string): Observable<any> {
    return this._http.get<any>(
      `${this.apiRoot}/autenticar/${user}/${password}`
    );
  }

  obtenerNoticias(contry: string, lenguage: string): Observable<any> {
    return this._http.get<any>(`${this.apiRoot}/news/${contry}/${lenguage}`);
  }

  registrarUsuarios(user: any): Observable<any> {
    return this._http.post<any>(`${this.apiRoot}/altaUsuario/`, user);
  }
}
