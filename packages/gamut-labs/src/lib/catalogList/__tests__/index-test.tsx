import { headerCatalogDropdownList } from '../index';

const catalogSectionCount = 3;

describe('Catalog List', () => {
  it('returns all the catalog sections', () => {
    expect(headerCatalogDropdownList(false).length).toBe(catalogSectionCount);
  });

  it('does return career path, popular courses, and practice tools sections if user has career access', () => {
    expect(headerCatalogDropdownList()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Top career paths' }),
        expect.objectContaining({ title: 'Popular courses' }),
        expect.objectContaining({ title: 'Practice tools' }),
      ])
    );
  });

  it('does not return career path section if user does not have career access', () => {
    expect(headerCatalogDropdownList(true).length).toBe(
      catalogSectionCount - 1
    );

    expect(headerCatalogDropdownList(true)).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Top career paths' }),
      ])
    );
    expect(headerCatalogDropdownList(true)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'Popular courses' }),
        expect.objectContaining({ title: 'Practice tools' }),
      ])
    );
  });
});
