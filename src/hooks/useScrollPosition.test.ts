import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrollPosition } from './useScrollPosition';

describe('useScrollPosition', () => {
  beforeEach(() => {
    // Reset scroll position
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });
  });

  it('should return initial scroll position', () => {
    const { result } = renderHook(() => useScrollPosition());

    expect(result.current.scrollY).toBe(0);
    expect(result.current.isScrolled).toBe(false);
  });

  it('should detect scrolled state when scrollY > threshold', () => {
    Object.defineProperty(window, 'scrollY', { value: 100 });

    const { result } = renderHook(() => useScrollPosition(50));

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.isScrolled).toBe(true);
  });

  it('should use custom threshold', () => {
    Object.defineProperty(window, 'scrollY', { value: 30 });

    const { result } = renderHook(() => useScrollPosition(100));

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.isScrolled).toBe(false);
  });

  it('should update scrollY on scroll', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 200 });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.scrollY).toBe(200);
  });

  it('should cleanup event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useScrollPosition());
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
