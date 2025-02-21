import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token';

  constructor() {}

  // Guardar el token en sessionStorage o localStorage
  saveToken(token: string, remember: boolean): void {
    if (remember) {
      localStorage.setItem(this.TOKEN_KEY, token); // Guarda en localStorage si el usuario quiere recordar
    } else {
      sessionStorage.setItem(this.TOKEN_KEY, token); // Guarda en sessionStorage si no
    }
  }

  // Obtener el token desde sessionStorage o localStorage
  getToken(): string | null {
    return (
      sessionStorage.getItem(this.TOKEN_KEY) ||
      localStorage.getItem(this.TOKEN_KEY)
    );
  }

  // Eliminar el token al hacer logout
  removeToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
