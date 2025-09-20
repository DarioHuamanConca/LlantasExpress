import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-screen.html',
  styleUrls: ['./loading-screen.scss']
})
export class LoadingScreen implements OnInit, OnDestroy {
  @Output() loadingComplete = new EventEmitter<void>();
  
  progress = 0;
  loadingText = "Iniciando sistema";
  isVisible = true;

  private loadingSteps = [
    { text: "Conectando con servidor", duration: 800 },
    { text: "Cargando catálogo de llantas", duration: 1000 },
    { text: "Verificando disponibilidad", duration: 700 },
    { text: "Preparando experiencia", duration: 900 },
    { text: "¡Listo para rodar!", duration: 500 }
  ];

  private animationFrameId: number | null = null;

  ngOnInit() {
    console.log('LoadingScreen component initialized');
    this.startLoading();
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  startLoading() {
    console.log('Loading started');
    let currentStep = 0;
    const totalSteps = this.loadingSteps.length;
    
    const executeStep = () => {
      if (currentStep >= totalSteps) {
        this.completeLoading();
        return;
      }
      
      const step = this.loadingSteps[currentStep];
      this.loadingText = step.text;
      console.log('Loading step:', step.text);
      
      const targetProgress = ((currentStep + 1) / totalSteps) * 100;
      this.animateProgressBar(this.progress, targetProgress, step.duration);
      
      setTimeout(() => {
        currentStep++;
        executeStep();
      }, step.duration);
    };
    
    executeStep();
  }

  animateProgressBar(start: number, end: number, duration: number) {
    const startTime = Date.now();
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easedProgress = this.easeInOutQuad(progress);
      this.progress = start + (end - start) * easedProgress;
      
      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    this.animationFrameId = requestAnimationFrame(animate);
  }

  private easeInOutQuad(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  completeLoading() {
    console.log('Loading completed, progress 100%');
    this.progress = 100;
    
    setTimeout(() => {
      console.log('Hiding loading screen and emitting event');
      this.isVisible = false;
      this.loadingComplete.emit();
    }, 500);
  }
}