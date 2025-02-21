import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private TOKEN_KEY = 'auth_token';

  // Guarda el token en localStorage o sessionStorage
  saveToken(token: string, remember: boolean): void {
    if (remember) {
      sessionStorage.setItem(this.TOKEN_KEY, token); // Persiste el token
    } else {
      sessionStorage.setItem(this.TOKEN_KEY, token); // Se borra al cerrar el navegador
    }
  }

  // Obtiene el token almacenado
  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY);
  }

  // Elimina el token al cerrar sesión
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.cleanCredencials();
  }

  cleanCredencials(){
    sessionStorage.clear();
  }

}
