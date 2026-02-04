import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import JournalScreen from '../src/screens/JournalScreen';
import { Alert } from 'react-native';

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

const mockEntries = [
    {
        id: 'entry-1',
        title: 'First Entry',
        content: 'This is the first journal entry.',
        createdAt: new Date().toISOString(),
        userId: 'test-user-123',
    },
    {
        id: 'entry-2',
        title: 'Second Entry',
        content: 'This is the second journal entry.',
        createdAt: new Date().toISOString(),
        userId: 'test-user-123',
    },
];

describe('JournalScreen', () => {
    let mockNavigation: ReturnType<typeof createMockNavigation>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockNavigation = createMockNavigation();
    });

    it('renders the header correctly', () => {
        render(<JournalScreen entries={mockEntries} navigation={mockNavigation as any} />);
        expect(screen.getByText('Your Journal Entries')).toBeTruthy();
        expect(screen.getByText('Entries: 2')).toBeTruthy();
    });

    it('renders the journal entries', () => {
        render(<JournalScreen entries={mockEntries} navigation={mockNavigation as any} />);
        expect(screen.getByText('First Entry')).toBeTruthy();
        expect(screen.getByText('Second Entry')).toBeTruthy();
    });

    it('navigates to NewEntry screen on add button press', () => {
        render(<JournalScreen entries={mockEntries} navigation={mockNavigation as any} />);
        fireEvent.press(screen.getByText('+'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('NewEntry');
    });

    it('filters entries based on search query', () => {
        render(<JournalScreen entries={mockEntries} navigation={mockNavigation as any} />);
        fireEvent.changeText(screen.getByPlaceholderText('Search journal...'), 'Second');
        expect(screen.queryByText('First Entry')).toBeNull();
        expect(screen.getByText('Second Entry')).toBeTruthy();
    });

    it('shows no entries when search query does not match', () => {
        render(<JournalScreen entries={mockEntries} navigation={mockNavigation as any} />);
        fireEvent.changeText(screen.getByPlaceholderText('Search journal...'), 'Nonexistent');
        expect(screen.queryByText('First Entry')).toBeNull();
        expect(screen.queryByText('Second Entry')).toBeNull();
    });

    it('shows empty state when no entries match search', () => {
        render(<JournalScreen entries={mockEntries} navigation={mockNavigation as any} />);
        fireEvent.changeText(screen.getByPlaceholderText('Search journal...'), 'Nonexistent');
        expect(screen.getByText('No entries yet. Start journaling!')).toBeTruthy();
    });

    it('navigates to ViewEntry screen on entry press', () => {
        render(<JournalScreen entries={mockEntries} navigation={mockNavigation as any} />);
        fireEvent.press(screen.getByText('First Entry'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('ViewEntry', { entry: mockEntries[0] });
    });

    it('shows empty state when there are no entries', () => {
        render(<JournalScreen entries={[]} navigation={mockNavigation as any} />);
        expect(screen.getByText('No entries yet. Start journaling!')).toBeTruthy();
    });
});