import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.titleService.setTitle('Llantas Express - Inicio | Seguridad y Confianza');
    this.metaService.updateTag({
      name: 'description',
      content: 'Bienvenido a Llantas Express, tu mejor opción en llantas de calidad para autos, SUV y camionetas.'
    });
    this.metaService.updateTag({ property: 'og:title', content: 'Llantas Express - Inicio' });
    this.metaService.updateTag({ property: 'og:description', content: 'Seguridad y confianza en cada kilómetro.' });
    this.metaService.updateTag({ 
      property: 'og:image', 
      content: 'https://images.unsplash.com/photo-1549399542-7e82138d0d73?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' 
    });
    this.metaService.updateTag({ property: 'og:url', content: typeof window !== 'undefined' ? window.location.href : '' });
  }

  // Función para animar elementos al hacer scroll
  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      this.initAnimations();
    }
  }

  initAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observar elementos para animación
    document.querySelectorAll('.feature-card, .brand-item, .testimonial-card').forEach(el => {
      observer.observe(el);
    });
  }
}