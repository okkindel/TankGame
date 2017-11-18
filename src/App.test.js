import App from '../src/App';


describe('App logic test suite', () => {
  describe('combinationListener', () => {
    it('Entering a none-password letter changes nothing', () => {
      const app = new App({ password: 'pass' });

      expect(app.state).toEqual({
        showApp: false,
        superPrivatePass: ''
      });

      const event = { key: 'z' };
      app.combinationListener(event);

      expect(app.state).toEqual({
        showApp: false,
        superPrivatePass: ''
      });
    });
  });
});
