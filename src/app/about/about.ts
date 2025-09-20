import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About implements OnInit, AfterViewInit {
  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.setMetaTags();
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      this.animateStats();
    }
  }

  setMetaTags() {
    this.titleService.setTitle('Llantas Express - Sobre Nosotros | Calidad y Experiencia');
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Conoce Llantas Express: más de 12 años ofreciendo llantas de calidad, servicio especializado y compromiso con tu seguridad vial.' 
    });
    this.metaService.updateTag({ 
      property: 'og:title', 
      content: 'Llantas Express - Sobre Nosotros' 
    });
    this.metaService.updateTag({ 
      property: 'og:description', 
      content: 'Descubre nuestra historia, misión, visión y el equipo profesional que hace de Llantas Express tu mejor opción en neumáticos.' 
    });
    this.metaService.updateTag({ 
      property: 'og:image', 
      content: 'https://images.unsplash.com/photo-1563720223880-4d93eef1f0c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' 
    });
    this.metaService.updateTag({ 
      property: 'og:url', 
      content: typeof window !== 'undefined' ? window.location.href : '' 
    });
  }

  animateStats() {
    const statElements = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startCounting(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statElements.forEach(stat => observer.observe(stat));
  }

  startCounting(element: Element) {
    const target = parseInt(element.getAttribute('data-count') || '0');
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60 fps
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;
    
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.round(target * progress);
      
      element.textContent = currentCount.toString();
      
      if (frame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
  }
}