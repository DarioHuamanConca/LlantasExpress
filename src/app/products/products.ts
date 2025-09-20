import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products implements OnInit {
  products = [
    { 
      id: 1,
      name: 'Michelin Energy Saver', 
      brand: 'Michelin',
      price: 120, 
      originalPrice: 140,
      description: 'Diseñada para maximizar el ahorro de combustible y ofrecer una conducción suave y silenciosa.', 
      image: 'https://images.unsplash.com/photo-1603712610494-7e2d429a4c28?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'auto',
      features: ['Ahorro combustible', 'Bajo ruido', 'Larga duración'],
      isNew: true,
      discount: 15
    },
    { 
      id: 2,
      name: 'Bridgestone Turanza T005', 
      brand: 'Bridgestone',
      price: 140, 
      description: 'Ofrece un excelente rendimiento en mojado y seco, con máximo confort en viajes largos.', 
      image: 'https://images.unsplash.com/photo-1554748299-4ff5cb6b2e15?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'auto',
      features: ['Alta seguridad', 'Confort superior', 'Rendimiento mojado'],
      isNew: false,
      discount: 0
    },
    { 
      id: 3,
      name: 'Pirelli Scorpion Verde', 
      brand: 'Pirelli',
      price: 160, 
      description: 'Llantas ecológicas para SUV con excelente tracción en todo tipo de terrenos.', 
      image: 'https://images.unsplash.com/photo-1616594039964-ae9023a9b5ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'suv',
      features: ['Ecológica', 'Tracción superior', 'SUV'],
      isNew: true,
      discount: 10
    },
    { 
      id: 4,
      name: 'Goodyear Eagle F1', 
      brand: 'Goodyear',
      price: 180, 
      description: 'Alto rendimiento para deportivos con agarre excepcional en curvas.', 
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'deportivo',
      features: ['Deportiva', 'Máximo agarre', 'Alto rendimiento'],
      isNew: false,
      discount: 0
    },
    { 
      id: 5,
      name: 'Continental CrossContact', 
      brand: 'Continental',
      price: 155, 
      originalPrice: 175,
      description: 'Perfecta para camionetas con capacidad de carga pesada y durabilidad extrema.', 
      image: 'https://images.unsplash.com/photo-1544636331-ece79d20d73a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'camioneta',
      features: ['Carga pesada', 'Durabilidad', 'Todo terreno'],
      isNew: false,
      discount: 12
    },
    { 
      id: 6,
      name: 'Michelin Pilot Sport 4', 
      brand: 'Michelin',
      price: 195, 
      description: 'Rendimiento deportivo con seguridad superior en condiciones mojadas.', 
      image: 'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'deportivo',
      features: ['Deportiva', 'Seguridad mojado', 'Precision'],
      isNew: true,
      discount: 5
    }
  ];

  filteredProducts: any[] = [];
  currentCategory: string = 'all';
  currentBrand: string = 'all';
  currentSort: string = 'name';

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit() {
    this.filteredProducts = [...this.products];
    this.setMetaTags();
  }

  setMetaTags() {
    this.titleService.setTitle('Llantas Express - Productos | Calidad y Seguridad');
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Explora nuestra selección premium de llantas: Michelin, Bridgestone, Pirelli, Goodyear y Continental para todo tipo de vehículos.' 
    });
    this.metaService.updateTag({ 
      property: 'og:title', 
      content: 'Llantas Express - Catálogo Completo de Productos' 
    });
    this.metaService.updateTag({ 
      property: 'og:description', 
      content: 'Encuentra las mejores llantas para tu auto, SUV, camioneta o deportivo. Calidad garantizada y precios competitivos.' 
    });
    this.metaService.updateTag({ 
      property: 'og:image', 
      content: 'https://images.unsplash.com/photo-1603712610494-7e2d429a4c28?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' 
    });
    this.metaService.updateTag({ 
      property: 'og:url', 
      content: typeof window !== 'undefined' ? window.location.href : '' 
    });
  }

  filterByCategory(event: any) {
    this.currentCategory = event.target.value;
    this.applyFilters();
  }

  filterByBrand(event: any) {
    this.currentBrand = event.target.value;
    this.applyFilters();
  }

  sortProducts(event: any) {
    this.currentSort = event.target.value;
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.products];

    // Filtrar por categoría
    if (this.currentCategory !== 'all') {
      filtered = filtered.filter(product => product.category === this.currentCategory);
    }

    // Filtrar por marca
    if (this.currentBrand !== 'all') {
      filtered = filtered.filter(product => product.brand.toLowerCase() === this.currentBrand);
    }

    // Ordenar
    switch (this.currentSort) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
    }

    this.filteredProducts = filtered;
  }

  resetFilters() {
    this.currentCategory = 'all';
    this.currentBrand = 'all';
    this.currentSort = 'name';
    
    // Resetear selects
    const categorySelect = document.getElementById('category-filter') as HTMLSelectElement;
    const brandSelect = document.getElementById('brand-filter') as HTMLSelectElement;
    const sortSelect = document.getElementById('sort-filter') as HTMLSelectElement;
    
    if (categorySelect) categorySelect.value = 'all';
    if (brandSelect) brandSelect.value = 'all';
    if (sortSelect) sortSelect.value = 'name';
    
    this.filteredProducts = [...this.products];
  }

  addToCart(product: any) {
    // Simular añadir al carrito
    console.log('Producto añadido al carrito:', product);
    // Aquí integrarías con tu servicio de carrito
    alert(`¡${product.name} añadido al carrito!`);
  }

  viewDetails(product: any) {
    // Navegar a página de detalles
    console.log('Ver detalles:', product);
    // Aquí implementarías la navegación a la página de detalles
  }
}