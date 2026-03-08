import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrl: './list-suggestion.component.css'
})
export class ListSuggestionComponent implements OnInit {
  constructor(
  private router: Router
) {}

  suggestions: Suggestion[] = [
    {
    id: 1,
    title: 'Organiser une journée team building',
    description: "Suggestion pour organiser une journée de team building pour renforcer les liens entre les membres de l'équipe.",
    category: 'Événements',
    date: new Date('2025-01-20'),
    status: 'ACCEPTÉE',
    nbLikes:10,
    isFavorite: false
    },
    {
    id: 2,
    title: 'Améliorer le système de réservation',
    description: 'Proposition pour améliorer la gestion des réservations en ligne avec un système de confirmation automatique.',
    category: 'Technologie',
    date: new Date('2025-01-15'),
    status: 'REFUSÉE',
    nbLikes:0,
    isFavorite: false
    },
    {
    id: 3,
    title: 'Créer un système de récompenses',
    description: "Mise en place d'un programme de récompenses pour motiver les employés et reconnaître leurs efforts.",
    category: 'Ressources Humaines',
    date: new Date('2025-01-25'),
    status: 'REFUSÉE',
    nbLikes:0,
    isFavorite: false
    },
    {
    id: 4,
    title: "Moderniser l'interface utilisateur",
    description: "Refonte complète de l'interface utilisateur pour une meilleure expérience utilisateur.",
    category: 'Technologie',
    date: new Date('2025-01-30'),
    status: 'EN_ATTENTE',
    nbLikes:0,
    isFavorite: false
    },
  ];

  filteredSuggestions: Suggestion[] = [];
  searchQuery: string = '';

  ngOnInit(): void {
    this.filteredSuggestions = [...this.suggestions];
  }

  /**
   * Filters suggestions by title or category based on the search query.
   */
  onSearch(): void {
    const query = this.searchQuery.toLowerCase().trim();
    if (!query) {
      this.filteredSuggestions = [...this.suggestions];
    } else {
      this.filteredSuggestions = this.suggestions.filter(s =>
        s.title.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query)
      );
    }
  }

  /**
   * Increments the like count of a suggestion.
   */
  likesuggestion(suggestion: Suggestion): void {
    suggestion.nbLikes++;
  }

  /**
   * Toggles the favorite state of a suggestion.
   */
  addToFavoris(suggestion: Suggestion): void {
    suggestion.isFavorite = !suggestion.isFavorite;
  }

  /**
   * Returns a CSS class based on the suggestion status.
   */
  getStatusClass(status: string): string {
    switch (status) {
      case 'ACCEPTÉE':   return 'status-accepted';
      case 'REFUSÉE':    return 'status-refused';
      case 'EN_ATTENTE': return 'status-pending';
      default:           return '';
    }
  }

  /**
   * Returns a CSS class based on the suggestion category.
   */
  getCategoryClass(category: string): string {
    switch (category) {
      case 'Événements':    return 'cat-events';
      case 'Technologie':   return 'cat-tech';
      case 'Infrastructure': return 'cat-infra';
      default:              return 'cat-default';
    }
  }

  viewDetail(suggestion: Suggestion): void {
  this.router.navigate(['/suggestions', suggestion.id], {
    state: { suggestions: this.suggestions }
  });
}

}
