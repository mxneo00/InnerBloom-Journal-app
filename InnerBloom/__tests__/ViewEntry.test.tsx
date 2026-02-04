import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { ViewEntryScreen } from '../src/components/ViewEntry';
import { Alert } from 'react-native';

// Mock the auth service
jest.mock('../src/services/authService', () => ({
  getCurrentUser: jest.fn(() => ({ uid: 'test-user-123' })),
}));

// Mock the entries service
const mockDeleteEntry = jest.fn(() => Promise.resolve());

jest.mock('../src/services/entriesService', () => ({
  deleteEntry: (...args: any[]) => mockDeleteEntry(...args),
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

const createMockRoute = () => ({
    key: 'ViewEntry-123',
    name: 'ViewEntry' as const,
    params: { 
        entry: {
            id: 'entry-123',
            title: 'Test Entry',
            content: 'This is a test entry content.',
            createdAt: new Date().toISOString(),
            userId: 'test-user-123',
        } 
    },
});

describe('ViewEntryScreen', () => {
    let mockNavigation: ReturnType<typeof createMockNavigation>;
    let mockRoute: ReturnType<typeof createMockRoute>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockNavigation = createMockNavigation();
        mockRoute = createMockRoute();
    });

    it('renders the entry title and content', async () => {
        render(<ViewEntryScreen navigation={mockNavigation as any} route={mockRoute as any} entries={[]} />);
        
        await waitFor(() => {
            expect(screen.getByText('Test Entry')).toBeTruthy();
            expect(screen.getByText('This is a test entry content.')).toBeTruthy();
        });
    });

    it('renders the edit button', async () => {
        render(<ViewEntryScreen navigation={mockNavigation as any} route={mockRoute as any} entries={[]} />);

        expect(screen.getByText('Edit')).toBeTruthy();
    });

    it('navigates to EditEntry screen when edit button is pressed', async () => {
        render(<ViewEntryScreen navigation={mockNavigation as any} route={mockRoute as any} entries={[]} />);

        fireEvent.press(screen.getByText('Edit'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('EditEntry', { entry: mockRoute.params.entry });
    });

    it('renders the delete button', async () => {
        render(<ViewEntryScreen navigation={mockNavigation as any} route={mockRoute as any} entries={[]} />);
        expect(screen.getByText('Delete')).toBeTruthy();
    });

    it('shows confirmation dialog when delete button is pressed', async () => {
        const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
        render(<ViewEntryScreen navigation={mockNavigation as any} route={mockRoute as any} entries={[]} />);

        fireEvent.press(screen.getByText('Delete'));

        expect(alertSpy).toHaveBeenCalledWith(
            'Delete Entry',
            'Are you sure you want to delete this entry?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: expect.any(Function) },
            ]
        );
    });

    it('navigates to JournalMain after confirming deletion', async () => {
        const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
        render(<ViewEntryScreen navigation={mockNavigation as any} route={mockRoute as any} entries={[]} />);

        fireEvent.press(screen.getByText('Delete'));

        const buttons = alertSpy.mock.calls[0][2] as any[];
        const deleteButton = buttons.find(btn => btn.text === 'Delete');
        deleteButton.onPress();
        await waitFor(() => {
            expect(mockDeleteEntry).toHaveBeenCalledWith('test-user-123', 'entry-123');
            expect(mockNavigation.navigate).toHaveBeenCalledWith('JournalMain');
        });
    });
});