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

    it('Entering a password letter adds it', () => {
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

    it('Entering password sets it and showsApp', () => {
      const app = new App({ password: 'pass' });

      expect(app.state).toEqual({
        showApp: false,
        superPrivatePass: ''
      });

      app.combinationListener({ key: 'p' });
      app.combinationListener({ key: 'a' });
      app.combinationListener({ key: 's' });
      app.combinationListener({ key: 's' });

      expect(app.state).toEqual({
        showApp: true,
        superPrivatePass: 'pass'
      });
    });

    it('Entering password (and more) sets just the password and showsApp', () => {
      const app = new App({ password: 'pass' });

      expect(app.state).toEqual({
        showApp: false,
        superPrivatePass: ''
      });

      app.combinationListener({ key: 'p' });
      app.combinationListener({ key: 'a' });
      app.combinationListener({ key: 's' });
      app.combinationListener({ key: 's' });
      app.combinationListener({ key: 'x' });

      expect(app.state).toEqual({
        showApp: true,
        superPrivatePass: 'pass'
      });
    });

    it('Beginning with not a password letter showsApp', () => {
      const app = new App({ password: 'pass' });

      expect(app.state).toEqual({
        showApp: false,
        superPrivatePass: ''
      });

      app.combinationListener({ key: 'x' });
      app.combinationListener({ key: 'p' });
      app.combinationListener({ key: 'a' });
      app.combinationListener({ key: 's' });
      app.combinationListener({ key: 's' });

      expect(app.state).toEqual({
        showApp: true,
        superPrivatePass: 'pass'
      });
    });

    it('Beginning with a password letter (twice) showsApp', () => {
      const app = new App({ password: 'pass' });

      expect(app.state).toEqual({
        showApp: false,
        superPrivatePass: ''
      });

      app.combinationListener({ key: 'a' });
      app.combinationListener({ key: 'p' });
      app.combinationListener({ key: 'a' });
      app.combinationListener({ key: 's' });
      app.combinationListener({ key: 's' });

      expect(app.state).toEqual({
        showApp: true,
        superPrivatePass: 'pass'
      });
    });
  });
});
