import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import NewEntryScreen from '../src/components/NewEntry';

// Mock the auth service
jest.mock('../src/services/authService', () => ({
  getCurrentUser: jest.fn(() => ({ uid: 'test-user-123' })),
}));

// Mock the entries service
const mockCreateEntry = jest.fn(() => Promise.resolve());
jest.mock('../src/services/entriesService', () => ({
  createEntry: (...args: any[]) => mockCreateEntry(...args),
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
  key: 'NewEntry-123',
  name: 'NewEntry' as const,
  params: undefined,
});

describe('NewEntryScreen', () => {
  let mockNavigation: ReturnType<typeof createMockNavigation>;
  let mockRoute: ReturnType<typeof createMockRoute>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigation = createMockNavigation();
    mockRoute = createMockRoute();
  });

  it('renders the title input', () => {
    render(<NewEntryScreen navigation={mockNavigation as any} route={mockRoute as any} />);
    expect(screen.getByPlaceholderText('Title')).toBeTruthy();
  });

  it('renders the content input', () => {
    render(<NewEntryScreen navigation={mockNavigation as any} route={mockRoute as any} />);
    expect(screen.getByPlaceholderText('Write something...')).toBeTruthy();
  });

  it('renders the save button', () => {
    render(<NewEntryScreen navigation={mockNavigation as any} route={mockRoute as any} />);
    expect(screen.getByText('Save Entry')).toBeTruthy();
  });

  it('allows entering a title', () => {
    render(<NewEntryScreen navigation={mockNavigation as any} route={mockRoute as any} />);
    const titleInput = screen.getByPlaceholderText('Title');

    fireEvent.changeText(titleInput, 'My Journal Entry');
    expect(titleInput.props.value).toBe('My Journal Entry');
  });

  it('allows entering content', () => {
    render(<NewEntryScreen navigation={mockNavigation as any} route={mockRoute as any} />);
    const contentInput = screen.getByPlaceholderText('Write something...');

    fireEvent.changeText(contentInput, 'Today was a great day!');
    expect(contentInput.props.value).toBe('Today was a great day!');
  });

  it('does not save entry with empty content', async () => {
    render(<NewEntryScreen navigation={mockNavigation as any} route={mockRoute as any} />);

    const saveButton = screen.getByText('Save Entry');
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(mockCreateEntry).not.toHaveBeenCalled();
    });
  });

  it('does not save entry with only whitespace content', async () => {
    render(<NewEntryScreen navigation={mockNavigation as any} route={mockRoute as any} />);

    const contentInput = screen.getByPlaceholderText('Write something...');
    fireEvent.changeText(contentInput, '   ');

    const saveButton = screen.getByText('Save Entry');
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(mockCreateEntry).not.toHaveBeenCalled();
    });
  });

  it('saves entry and navigates back on successful save', async () => {
    mockNavigation.canGoBack.mockReturnValue(true);

    render(<NewEntryScreen navigation={mockNavigation as any} route={mockRoute as any} />);

    const titleInput = screen.getByPlaceholderText('Title');
    const contentInput = screen.getByPlaceholderText('Write something...');

    fireEvent.changeText(titleInput, 'Test Entry');
    fireEvent.changeText(contentInput, 'This is test content');

    const saveButton = screen.getByText('Save Entry');
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(mockCreateEntry).toHaveBeenCalledWith('test-user-123', {
        title: 'Test Entry',
        content: 'This is test content',
      });
    });

    await waitFor(() => {
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });
  });

  it('navigates to JournalMain when cannot go back', async () => {
    mockNavigation.canGoBack.mockReturnValue(false);

    render(<NewEntryScreen navigation={mockNavigation as any} route={mockRoute as any} />);

    const contentInput = screen.getByPlaceholderText('Write something...');
    fireEvent.changeText(contentInput, 'Entry content');

    const saveButton = screen.getByText('Save Entry');
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('JournalMain');
    });
  });

  it('clears inputs after successful save', async () => {
    render(<NewEntryScreen navigation={mockNavigation as any} route={mockRoute as any} />);

    const titleInput = screen.getByPlaceholderText('Title');
    const contentInput = screen.getByPlaceholderText('Write something...');

    fireEvent.changeText(titleInput, 'Clear Test');
    fireEvent.changeText(contentInput, 'Content to clear');

    const saveButton = screen.getByText('Save Entry');
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(titleInput.props.value).toBe('');
      expect(contentInput.props.value).toBe('');
    });
  });

  it('handles save error gracefully', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockCreateEntry.mockRejectedValueOnce(new Error('Save failed'));

    render(<NewEntryScreen navigation={mockNavigation as any} route={mockRoute as any} />);

    const contentInput = screen.getByPlaceholderText('Write something...');
    fireEvent.changeText(contentInput, 'Content that will fail');

    const saveButton = screen.getByText('Save Entry');
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith('Error saving entry:', expect.any(Error));
    });

    consoleError.mockRestore();
  });

  it('allows saving entry with only content (no title)', async () => {
    render(<NewEntryScreen navigation={mockNavigation as any} route={mockRoute as any} />);

    const contentInput = screen.getByPlaceholderText('Write something...');
    fireEvent.changeText(contentInput, 'Entry without title');

    const saveButton = screen.getByText('Save Entry');
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(mockCreateEntry).toHaveBeenCalledWith('test-user-123', {
        title: '',
        content: 'Entry without title',
      });
    });
  });
});
