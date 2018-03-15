import { SampleSpringRestPage } from './app.po';

describe('sample-spring-rest App', () => {
  let page: SampleSpringRestPage;

  beforeEach(() => {
    page = new SampleSpringRestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
