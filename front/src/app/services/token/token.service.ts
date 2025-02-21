import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token';

  constructor() {}

  // Guardar el token en sessionStorage o localStorage
  saveToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token); // Guarda en sessionStorage si no
  }

  // Elimina el token al cerrar sesión
  removeToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  // Obtener el token desde sessionStorage
  getToken(): string | null {
    return (
      sessionStorage.getItem(this.TOKEN_KEY) ||
      localStorage.getItem(this.TOKEN_KEY)
    );
  }

}
