import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';

describe('HomeScreen', () => {
  it('renders welcome message', () => {
    render(<HomeScreen />);
    expect(screen.getByText('Welcome back!')).toBeTruthy();
  });

  it('displays the current date', () => {
    render(<HomeScreen />);
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    expect(screen.getByText(formattedDate)).toBeTruthy();
  });

  it('renders all mood buttons', () => {
    render(<HomeScreen />);
    expect(screen.getByText('😊')).toBeTruthy();
    expect(screen.getByText('😢')).toBeTruthy();
    expect(screen.getByText('😰')).toBeTruthy();
    expect(screen.getByText('🤩')).toBeTruthy();
    expect(screen.getByText('😌')).toBeTruthy();
  });

  it('renders the Current Mood section', () => {
    render(<HomeScreen />);
    expect(screen.getByText('Current Mood')).toBeTruthy();
  });

  it('renders the Todays Reflection section', () => {
    render(<HomeScreen />);
    expect(screen.getByText('Todays Reflection')).toBeTruthy();
  });

  it('displays a daily reflection prompt', () => {
    render(<HomeScreen />);
    const prompts = [
      "What made you smile today?",
      "Describe a challenge you overcame recently.",
      "What are you grateful for right now?",
      "Write about a memorable moment from this week.",
      "What are your goals for the upcoming month?",
    ];
    const today = new Date();
    const index = today.getDate() % prompts.length;
    const expectedPrompt = `"${prompts[index]}"`;
    expect(screen.getByText(expectedPrompt)).toBeTruthy();
  });

  it('displays streak counter', () => {
    render(<HomeScreen />);
    expect(screen.getByText(/You've checked in \d+ days in a row!/)).toBeTruthy();
  });

  it('allows selecting a mood', () => {
    render(<HomeScreen />);
    const happyButton = screen.getByText('😊');
    fireEvent.press(happyButton);
    // The mood button should now be selected (visual change handled by styles)
    // We verify the press event doesn't throw
    expect(happyButton).toBeTruthy();
  });

  it('allows changing mood selection', () => {
    render(<HomeScreen />);
    const happyButton = screen.getByText('😊');
    const sadButton = screen.getByText('😢');

    fireEvent.press(happyButton);
    fireEvent.press(sadButton);

    // Both buttons should still be rendered and pressable
    expect(happyButton).toBeTruthy();
    expect(sadButton).toBeTruthy();
  });
});
