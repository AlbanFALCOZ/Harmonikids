import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PasswordService {
    private readonly PASSWORD_KEY = 'ergoPassword';

    constructor() { }

    // Méthode pour obtenir le mot de passe stocké
    getPassword(): string | null {
        return localStorage.getItem(this.PASSWORD_KEY);
    }

    // Méthode pour définir un nouveau mot de passe
    setPassword(password: string): void {
        localStorage.setItem(this.PASSWORD_KEY, password);
    }

    // Méthode pour vérifier si le mot de passe est défini
    isPasswordSet(): boolean {
        return this.getPassword() !== null;
    }
}
