import { footerResourcesList, headerResourcesList } from '../index';

const resourcesCount = 7;

describe('Resources List', () => {
  it('returns all the footer items', () => {
    expect(footerResourcesList.length).toBe(resourcesCount);
  });

  it('returns all the header items', () => {
    expect(headerResourcesList.length).toBe(resourcesCount);
  });
});
