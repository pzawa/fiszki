import { describe, expect, it } from 'vitest';
import { SEED_CATEGORIES } from './seed';

describe('gotowe kategorie', () => {
  it('jest ich 40, w kolejności z listy', () => {
    expect(SEED_CATEGORIES).toHaveLength(40);
    expect(SEED_CATEGORIES[0]).toEqual({ name: 'Cześć!', description: 'nowi ludzie, kilka słów o sobie, jak zagadać' });
    expect(SEED_CATEGORIES[39].name).toBe('Metry a stopy');
  });

  it('kategoria bez opisu ma tylko nazwę', () => {
    expect(SEED_CATEGORIES.find((c) => c.name === 'Relaks i hobby')).toEqual({ name: 'Relaks i hobby' });
  });

  it('nazwy z przecinkami i myślnikami są poprawnie rozdzielone', () => {
    expect(SEED_CATEGORIES.find((c) => c.name === 'Pieniądze, ach, pieniądze')?.description).toBe(
      'bank, oszczędzanie, podatki',
    );
    expect(SEED_CATEGORIES.find((c) => c.name === 'Telefon')?.description).toBe('SMS-y, zasięg, emotikony i selfie');
  });

  it('nazwy są unikalne', () => {
    expect(new Set(SEED_CATEGORIES.map((c) => c.name.toLowerCase())).size).toBe(40);
  });
});
