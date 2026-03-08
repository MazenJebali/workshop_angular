import { Component, Input, OnInit } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
export class SuggestionDetailsComponent implements OnInit {

  /** Route param — available as a fallback reference */
  suggestionId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  suggestion: Suggestion | null = null;

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.suggestionId = paramId ? +paramId : null;
    const suggestionList: Suggestion[] = history.state.suggestions ?? [];
    this.suggestion = suggestionList?.find(s => s.id === this.suggestionId) || null;
  }

  /** Increment like count */
  like(): void {
    if (this.suggestion) {
      this.suggestion.nbLikes++;
    }
  }

  /** Toggle favorite */
  toggleFavoris(): void {
    if (this.suggestion) {
      this.suggestion.isFavorite = !this.suggestion.isFavorite;
    }
  }

  /** Navigate back */
  goBack(): void {
    this.router.navigate(['/suggestions']);
  }

  /** CSS class for status badge */
  getStatusClass(status: string): string {
    switch (status) {
      case 'ACCEPTEE':
      case 'ACCEPTÉE':   return 'status-accepted';
      case 'REFUSE':
      case 'REFUSÉE':
      case 'REFUSEE':    return 'status-refused';
      case 'EN_ATTENTE':
      case 'EN ATTENTE': return 'status-pending';
      default:           return 'status-pending';
    }
  }

  /** Human-readable status label */
  getStatusLabel(status: string): string {
    switch (status) {
      case 'ACCEPTEE':
      case 'ACCEPTÉE':   return 'ACCEPTÉE';
      case 'REFUSE':
      case 'REFUSÉE':
      case 'REFUSEE':    return 'REFUSÉE';
      case 'EN_ATTENTE':
      case 'EN ATTENTE': return 'EN ATTENTE';
      default:           return status;
    }
  }

  /** CSS class for category badge */
  getCategoryClass(category: string): string {
    switch (category) {
      case 'Événements':     return 'cat-events';
      case 'Technologie':    return 'cat-tech';
      case 'Infrastructure': return 'cat-infra';
      default:               return 'cat-default';
    }
  }
}
