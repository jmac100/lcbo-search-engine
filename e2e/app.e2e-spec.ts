import { LcbosearchPage } from './app.po';

describe('lcbosearch App', function() {
  let page: LcbosearchPage;

  beforeEach(() => {
    page = new LcbosearchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
