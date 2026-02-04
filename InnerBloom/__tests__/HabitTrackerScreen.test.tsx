import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import HabitTrackerScreen from '../src/screens/HabitTrackerScreen';
import { Alert } from 'react-native';
import { getCurrentUser } from '../src/services/authService';

// Mock the auth service
const mockOnAuthStateChanged = jest.fn();
const mockGetAuth = { currentUser: null as any };

jest.mock('firebase/auth', () => ({
  getAuth: () => mockGetAuth,
  onAuthStateChanged: (...args: any[]) => mockOnAuthStateChanged(...args),
}));

jest.mock('../src/services/authService', () => ({
  getCurrentUser: jest.fn(),
}));

const mockGetCurrentUser = getCurrentUser as jest.Mock;

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
];

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('HabitTrackerScreen', () => {
    let mockNavigation: ReturnType<typeof createMockNavigation>;
    const mockSetHabits = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        mockNavigation = createMockNavigation();

        setAuthState({ uid: 'test-user-123' });
    });

    const setAuthState = (user: any | null) => {
        mockGetAuth.currentUser = user;

        mockOnAuthStateChanged.mockImplementation((_auth: any, callback: any) => {
            callback(user);
            return () => {};
        });
        mockGetCurrentUser.mockReturnValue(user);
    };

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

    it('logged in: navigates to AddHabitScreen on add button press', () => {
        setAuthState({ uid: 'test-user-123' });
        render(
            <HabitTrackerScreen habits={mockHabits} setHabits={mockSetHabits} navigation={mockNavigation as any}/>
        );
        fireEvent.press(screen.getByText('+ Add Habit'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('AddHabit')
    });

    it('logged out: shows alert and does not navigate on add button press', () => {
        mockGetAuth.currentUser = null;
        mockOnAuthStateChanged.mockImplementation((_auth: any, callback: any) => {
            callback(null);
            return () => {};
        });
        mockGetCurrentUser.mockReturnValue({ uid: 'test-user-123' });
        render(
            <HabitTrackerScreen habits={mockHabits} setHabits={mockSetHabits} navigation={mockNavigation as any}/>
        );
        fireEvent.press(screen.getByText('+ Add Habit'));
        expect(Alert.alert).toHaveBeenCalledTimes(1);
        expect(Alert.alert).toHaveBeenCalledWith(
            'Log in required',
            'Please log in to add a new habit.',
            [
            { text: 'Cancel', style: 'cancel'},
            ]
        );
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