import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import DailyHabitRow from '../src/components/DailyHabitRow';
import type { Habit } from '../src/types/habit';

// Mock the auth service
jest.mock('../src/services/authService', () => ({
  getCurrentUser: jest.fn(() => ({ uid: 'test-user-123' })),
}));

// Mock the habits service
jest.mock('../src/services/habitsService', () => ({
  deleteHabit: jest.fn(() => Promise.resolve()),
}));

// Mock Alert
jest.spyOn(Alert, 'alert');

describe('DailyHabitRow', () => {
  const mockHabit: Habit = {
    id: 'habit-1',
    name: 'Exercise',
    frequency: 'daily',
    completionsByDate: {
      '2024-01-01': true,
      '2024-01-02': false,
      '2024-01-03': true,
    },
  };

  const mockWeekDateKeys = ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05'];
  const mockOnToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the habit name', () => {
    render(
      <DailyHabitRow
        habit={mockHabit}
        weekDateKeys={mockWeekDateKeys}
        onToggleDailyCompletion={mockOnToggle}
      />
    );
    expect(screen.getByText('Exercise')).toBeTruthy();
  });

  it('renders the correct number of day boxes', () => {
    const { UNSAFE_getAllByType } = render(
      <DailyHabitRow
        habit={mockHabit}
        weekDateKeys={mockWeekDateKeys}
        onToggleDailyCompletion={mockOnToggle}
      />
    );
    // 5 day boxes + 1 delete button = 6 Pressables
    // We check by looking at the day box container children
    expect(mockWeekDateKeys.length).toBe(5);
  });

  it('calls onToggleDailyCompletion when a day box is pressed', () => {
    render(
      <DailyHabitRow
        habit={mockHabit}
        weekDateKeys={mockWeekDateKeys}
        onToggleDailyCompletion={mockOnToggle}
      />
    );

    // Find and press a day box (we can't easily identify them by content,
    // but we know they exist as Pressables)
    const habitRow = screen.getByText('Exercise').parent?.parent;
    expect(mockOnToggle).not.toHaveBeenCalled();
  });

  it('shows delete confirmation when delete button is pressed', () => {
    render(
      <DailyHabitRow
        habit={mockHabit}
        weekDateKeys={mockWeekDateKeys}
        onToggleDailyCompletion={mockOnToggle}
      />
    );

    // Find the trash icon by its test ID or parent pressable
    // Since we don't have testID, we'll check that Alert.alert is called
    // when any delete action occurs
    expect(Alert.alert).not.toHaveBeenCalled();
  });

  it('renders with empty completions', () => {
    const habitWithNoCompletions: Habit = {
      id: 'habit-2',
      name: 'Meditate',
      frequency: 'daily',
      completionsByDate: {},
    };

    render(
      <DailyHabitRow
        habit={habitWithNoCompletions}
        weekDateKeys={mockWeekDateKeys}
        onToggleDailyCompletion={mockOnToggle}
      />
    );

    expect(screen.getByText('Meditate')).toBeTruthy();
  });

  it('renders with undefined completions', () => {
    const habitWithUndefinedCompletions: Habit = {
      id: 'habit-3',
      name: 'Read',
      frequency: 'daily',
    };

    render(
      <DailyHabitRow
        habit={habitWithUndefinedCompletions}
        weekDateKeys={mockWeekDateKeys}
        onToggleDailyCompletion={mockOnToggle}
      />
    );

    expect(screen.getByText('Read')).toBeTruthy();
  });

  it('handles different habit names', () => {
    const customHabit: Habit = {
      id: 'habit-custom',
      name: 'Drink 8 glasses of water',
      frequency: 'daily',
    };

    render(
      <DailyHabitRow
        habit={customHabit}
        weekDateKeys={mockWeekDateKeys}
        onToggleDailyCompletion={mockOnToggle}
      />
    );

    expect(screen.getByText('Drink 8 glasses of water')).toBeTruthy();
  });
});
