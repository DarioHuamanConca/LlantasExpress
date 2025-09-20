import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingScreen } from './loading-screen';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, LoadingScreen],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  isMenuOpen = false;
  isLoading = true;

  ngOnInit() {
    // Solo como respaldo por si la pantalla de carga falla
    setTimeout(() => {
      if (this.isLoading) {
        console.warn('Loading screen timeout - forcing completion');
        this.isLoading = false;
      }
    }, 8000); // 8 segundos como respaldo
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onLoadingComplete(): void {
    this.isLoading = false;
  }
}