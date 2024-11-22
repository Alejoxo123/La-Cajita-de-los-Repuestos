import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // URL de la API de autenticación
  private role: string | null = null; // Rol del usuario en memoria
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false); // Estado de autenticación
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable(); // Observable del estado de autenticación

  private roleSubject = new BehaviorSubject<string | null>(null); // Observa los cambios en el rol
  public role$ = this.roleSubject.asObservable(); // Exposición del observable del rol

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // Inyección para verificar si estamos en el navegador
  ) {
    // Inicializa el rol desde localStorage, si está disponible
    if (this.isLocalStorageAvailable()) {
      const storedRole = localStorage.getItem('user_role');
      if (storedRole) {
        this.role = storedRole; // Carga el rol en memoria
        this.roleSubject.next(storedRole); // Notifica el rol inicial
        this.isAuthenticatedSubject.next(true); // Marca como autenticado
      }
    }
  }

  // Verifica si `localStorage` está disponible
  private isLocalStorageAvailable(): boolean {
    return isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined';
  }

  // Método de login
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  // Establecer el rol del usuario
  setRole(role: string): void {
    this.role = role; // Almacena el rol en memoria
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('user_role', role); // Guarda el rol en localStorage
    }
    this.roleSubject.next(role); // Notifica el nuevo rol
    this.isAuthenticatedSubject.next(true); // Cambia el estado de autenticación a 'true'
  }

  // Obtener el rol del usuario
  getRole(): string | null {
    if (this.role) {
      return this.role; // Retorna el rol en memoria si está disponible
    }
    if (this.isLocalStorageAvailable()) {
      const storedRole = localStorage.getItem('user_role');
      if (storedRole) {
        this.role = storedRole; // Sincroniza el rol en memoria
        this.roleSubject.next(storedRole); // Notifica el rol
      }
      return storedRole;
    }
    return null;
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    if (this.isLocalStorageAvailable()) {
      return !!localStorage.getItem('user_role');
    }
    return false;
  }

  // Método de logout
  logout(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('user_role'); // Elimina el rol del localStorage
    }
    this.role = null; // Resetea el rol en memoria
    this.roleSubject.next(null); // Notifica que no hay rol
    this.isAuthenticatedSubject.next(false); // Cambia el estado de autenticación a 'false'
  }
}
