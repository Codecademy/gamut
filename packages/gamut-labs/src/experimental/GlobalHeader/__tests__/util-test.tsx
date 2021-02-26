describe('getGlobalHeaderHeight', () => {
  xit(`should return headerHeight as a number`, () => {
    document.documentElement.style.setProperty('--headerHeight', '420');

    expect('x').toEqual(420);
  });
});
