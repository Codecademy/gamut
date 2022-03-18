import { ContainerDifficulty } from '../../types';
import { difficultyNumber } from '..';

describe('difficultyNumber', () => {
  it('returns beginner friendly difficulty', () => {
    expect(difficultyNumber('Beginner')).toEqual(0);
    expect(difficultyNumber(ContainerDifficulty.Beginner)).toEqual(0);
  });
  it('returns intermediate difficulty', () => {
    expect(difficultyNumber('Intermediate')).toEqual(1);
    expect(difficultyNumber(ContainerDifficulty.Intermediate)).toEqual(1);
  });
  it('returns advanced difficulty', () => {
    expect(difficultyNumber('Advanced')).toEqual(2);
    expect(difficultyNumber(ContainerDifficulty.Advanced)).toEqual(2);
  });
});
