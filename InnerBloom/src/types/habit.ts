export type habit = {
    id: string;
    name: string;
    frequency: 'daily' | 'weekly' | 'monthly';
    streak: number;
}