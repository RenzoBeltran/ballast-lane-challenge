import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn utility', () => {
  it('should merge class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should handle conditional classes', () => {
    expect(cn('class1', true && 'class2', false && 'class3')).toBe('class1 class2');
  });

  it('should merge tailwind classes correctly', () => {
    // tailwind-merge should override p-2 with p-4
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('should handle arrays and objects', () => {
    expect(cn(['class1', 'class2'], { class3: true, class4: false })).toBe('class1 class2 class3');
  });
});
