import { RehauadminPage } from './app.po';

describe('rehauadmin App', () => {
  let page: RehauadminPage;

  beforeEach(() => {
    page = new RehauadminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
