import App from '../src/App';


describe('App logic test suite', () => {
  describe('combinationListener', () => {
    it('Not much of a test', () => {
      const app = new App({ password: 'pass' });
      const event = { key: 'z' };
      app.combinationListener(event);
    });
  });
});
