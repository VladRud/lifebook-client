import { LifebookPage } from './app.po';

describe('lifebook App', () => {
  let page: LifebookPage;

  beforeEach(() => {
    page = new LifebookPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
