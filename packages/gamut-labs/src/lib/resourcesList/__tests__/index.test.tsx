import { footerResourcesList, headerResourcesList } from '../index';

const footerResourcesCount = 8;
const headerResourcesCount = 3;

describe('Resources List', () => {
  it('returns all the footer resource items', () => {
    expect(footerResourcesList.length).toBe(footerResourcesCount);
  });

  it('returns all the header resource sections which contain items', () => {
    expect(headerResourcesList.length).toBe(headerResourcesCount);
  });
});
