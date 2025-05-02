import { provideHttpClient } from '@angular/common/http';  // Pour HttpClient
import { provideRouter } from '@angular/router';            // Pour le routage (si nécessaire)
import { CommonModule } from '@angular/common';              // Pour les directives de base (ngIf, ngFor, etc.)
import { provideAnimations } from '@angular/platform-browser/animations';  // Pour les animations
import { AppComponent } from './app.component';              // Votre composant principal

export const appConfig = {
  providers: [
    provideHttpClient(),          // Fournisseur HttpClient
    provideRouter([]),            // Configuration du routage (si nécessaire)
    provideAnimations(),          // Si vous avez besoin d'animations
    CommonModule                  // Pour l'utilisation de directives Angular de base
  ]
};
