import { footerResourcesList, headerResourcesList } from '../index';

const resourcesCount = 8;

describe('Resources List', () => {
  it('returns all the footer items', () => {
    expect(footerResourcesList.length).toBe(resourcesCount);
  });

  it('returns all the header items', () => {
    expect(headerResourcesList().length).toBe(resourcesCount);
  });

  it('does not return projects and challenges in header if user is in experiment', () => {
    expect(headerResourcesList(true).length).toBe(resourcesCount - 2);
  });
});
