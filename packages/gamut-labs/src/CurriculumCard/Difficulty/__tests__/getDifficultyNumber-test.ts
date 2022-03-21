import { getDifficultyNumber } from '../getDifficultyNumber';
import { ContainerDifficulty } from '../types';

describe('difficultyNumber', () => {
  it('returns beginner friendly difficulty', () => {
    expect(getDifficultyNumber('Beginner')).toEqual(0);
    expect(getDifficultyNumber(ContainerDifficulty.Beginner)).toEqual(0);
  });
  it('returns intermediate difficulty', () => {
    expect(getDifficultyNumber('Intermediate')).toEqual(1);
    expect(getDifficultyNumber(ContainerDifficulty.Intermediate)).toEqual(1);
  });
  it('returns advanced difficulty', () => {
    expect(getDifficultyNumber('Advanced')).toEqual(2);
    expect(getDifficultyNumber(ContainerDifficulty.Advanced)).toEqual(2);
  });
});
