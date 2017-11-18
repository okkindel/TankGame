import { extend } from 'lodash';
import App from '../src/App';


describe('App logic test suite', () => {
  describe('combinationListener', () => {
    App.prototype.setState = function setStateStub(obj) {
      extend(this.state, obj);
    };

    it('Entering a none-password letter changes nothing', () => {
      const app = new App({ password: 'pass' });

      expect(app.state).toEqual({
        showApp: false,
        superPrivatePass: ''
      });

      app.combinationListener({ key: 'z' });

      expect(app.state).toEqual({
        showApp: false,
        superPrivatePass: ''
      });
    });

    it('Entering a mid-password letter changes nothing', () => {
      const app = new App({ password: 'pass' });

      expect(app.state).toEqual({
        showApp: false,
        superPrivatePass: ''
      });

      app.combinationListener({ key: 'a' });

      expect(app.state).toEqual({
        showApp: false,
        superPrivatePass: ''
      });
    });

    it('Entering a mid-password letter changes nothing', () => {
      const app = new App({ password: 'pass' });

      expect(app.state).toEqual({
        showApp: false,
        superPrivatePass: ''
      });

      app.combinationListener({ key: 'p' });

      expect(app.state).toEqual({
        showApp: false,
        superPrivatePass: 'p'
      });
    });
  });
});
