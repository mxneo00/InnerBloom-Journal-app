export type habit = {
    id: string;
    name: string;
    frequency: 'daily' | 'weekly';
    completionsByDate?: Record<string, boolean>;
    weeklyCompletion?: boolean;
}