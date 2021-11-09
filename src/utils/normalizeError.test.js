import { normalizeError } from '.';

describe('normalizeError', () => {
  it('should be tested!', () => {
    const rawError = {
      foo: 'bar',
    };
    expect(normalizeError(rawError).normalized).toBe(true);
  });
});
