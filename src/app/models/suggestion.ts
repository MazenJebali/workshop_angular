export class Suggestion {
    id!: number;
    title!: string;
    description!: string;
    category!: string;
    date!: Date;
    status!: 'ACCEPTÉE' | 'REFUSÉE' | 'EN_ATTENTE';
    nbLikes!: number;
    isFavorite!: boolean;
}
