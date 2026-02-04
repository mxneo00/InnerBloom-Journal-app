import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import HabitTrackerScreen from '../src/screens/HabitTrackerScreen';

// Mock the auth service
jest.mock('../src/services/authService', () => ({
  getCurrentUser: jest.fn(() => ({ uid: 'test-user-123' })),
}));

// Create mock navigation
const createMockNavigation = () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    canGoBack: jest.fn(() => true),
    dispatch: jest.fn(),
    reset: jest.fn(),
    isFocused: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    setParams: jest.fn(),
    setOptions: jest.fn(),
    getId: jest.fn(),
    getParent: jest.fn(),
    getState: jest.fn(),
});

const mockHabits = [
    {
        id: 'habit-1',
        name: 'Drink Water',
        frequency: 'daily' as const,
        createdAt: new Date().toISOString(),
        userId: 'test-user-123',
    },
    {
        id: 'habit-2',
        name: 'Exercise',
        frequency: 'weekly' as const,
        createdAt: new Date().toISOString(),
        userId: 'test-user-123',
    },
]

describe('HabitTrackerScreen', () => {
    let mockNavigation: ReturnType<typeof createMockNavigation>;
    const mockSetHabits = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        mockNavigation = createMockNavigation();
    });

    it('renders the habit tracker header', () => {
        render(
            <HabitTrackerScreen habits={mockHabits} setHabits={mockSetHabits} navigation={mockNavigation as any}/>
        );
        expect(screen.getByText('This Weeks Habits')).toBeTruthy();
    });

    it('renders date range', () => {
        render(
            <HabitTrackerScreen habits={mockHabits} setHabits={mockSetHabits} navigation={mockNavigation as any}/>
        );
        expect(screen.getByText(/\d{4}-\d{2}-\d{2}\s:\s\d{4}-\d{2}-\d{2}/)).toBeTruthy();
    });

    it('navigates to AddHabitScreen on add button press', () => {
        render(
            <HabitTrackerScreen habits={mockHabits} setHabits={mockSetHabits} navigation={mockNavigation as any}/>
        );
        fireEvent.press(screen.getByText('+ Add Habit'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('AddHabit')
    });

    it('renders the habit tracker screen with habits', () => {
        render(
            <HabitTrackerScreen habits={mockHabits} setHabits={mockSetHabits} navigation={mockNavigation as any}/>
        );
        expect(screen.getByText('Drink Water')).toBeTruthy();
        expect(screen.getByText('Exercise')).toBeTruthy();
    });

    it('toggles daily habit completion', async () => {
        const { getByText } = render(
            <HabitTrackerScreen habits={mockHabits} setHabits={mockSetHabits} navigation={mockNavigation as any}/>
        );
        fireEvent.press(getByText('Drink Water'));
        expect(getByText('Drink Water')).toBeTruthy();
    });

    it('toggles weekly habit completion', async () => {
        const { getByText } = render(
            <HabitTrackerScreen habits={mockHabits} setHabits={mockSetHabits} navigation={mockNavigation as any}/>
        );
        fireEvent.press(getByText('Exercise'));
        expect(getByText('Exercise')).toBeTruthy();
    });

});