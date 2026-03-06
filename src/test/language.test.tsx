import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';

// Simple consumer component for testing
function LangDisplay() {
  const { lang, toggle } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <button onClick={toggle}>toggle</button>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <MemoryRouter>
      <LanguageProvider>
        <LangDisplay />
      </LanguageProvider>
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
});

describe('language toggle', () => {
  it('defaults to English when localStorage is empty', () => {
    renderWithProvider();
    expect(screen.getByTestId('lang').textContent).toBe('en');
  });

  it('toggles from EN to ZH on button click and updates UI', () => {
    renderWithProvider();
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }));
    expect(screen.getByTestId('lang').textContent).toBe('zh');
  });

  it('persists language to localStorage on toggle', () => {
    renderWithProvider();
    fireEvent.click(screen.getByRole('button', { name: 'toggle' }));
    expect(localStorage.getItem('lang')).toBe('zh');
  });

  it('reads saved language from localStorage on mount', () => {
    localStorage.setItem('lang', 'zh');
    renderWithProvider();
    expect(screen.getByTestId('lang').textContent).toBe('zh');
  });

  it('all components in tree share the same language state', () => {
    function SecondConsumer() {
      const { lang } = useLanguage();
      return <span data-testid="lang2">{lang}</span>;
    }

    render(
      <MemoryRouter>
        <LanguageProvider>
          <LangDisplay />
          <SecondConsumer />
        </LanguageProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('lang').textContent).toBe('en');
    expect(screen.getByTestId('lang2').textContent).toBe('en');

    fireEvent.click(screen.getByRole('button', { name: 'toggle' }));

    expect(screen.getByTestId('lang').textContent).toBe('zh');
    expect(screen.getByTestId('lang2').textContent).toBe('zh');
  });
});
