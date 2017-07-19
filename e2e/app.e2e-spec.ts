import { AutocallerPage } from './app.po';

describe('autocaller App', () => {
  let page: AutocallerPage;

  beforeEach(() => {
    page = new AutocallerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
