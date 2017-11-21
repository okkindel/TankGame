import AppBase from '../src/App';
import simpleReactTestWrapper from '../test-utils';


const ESCAPE = 'Escape';
const App = simpleReactTestWrapper(AppBase);


describe('simpleReactTestWrapper test suite', () => {
  it('setState works in tests', () => {
    const app = new App();

    expect(app.state).toEqual({ showApp: false, superPrivatePass: '' });

    app.setState({ showApp: true });

    expect(app.state).toEqual({ showApp: true, superPrivatePass: '' });
  });

  it('Default props in tests', () => {
    let app = new App();
    expect(app.props).toEqual({
      password: 'pass',
      quitKey: ESCAPE
    });

    app = new App({ quitKey: 'x' });
    expect(app.props).toEqual({
      password: 'pass',
      quitKey: 'x'
    });
  });
});


describe('App logic test suite', () => {
  describe('combinationListener', () => {
    it('Base state is as follows', () => {
      const app = new App();

      expect(app.state).toEqual({
        showApp: false,
        superPrivatePass: ''
      });
    });

    it('Entering a none-password letter changes nothing', () => {
      const app = new App();

      app.combinationListener({ key: 'z' });

      expect(app.state).toEqual({
        showApp: false,
        superPrivatePass: ''
      });
    });

    it('Entering a mid-password letter changes nothing', () => {
      const app = new App();

      app.combinationListener({ key: 'a' });

      expect(app.state).toEqual({
        showApp: false,
        superPrivatePass: ''
      });
    });

    it('Entering a password letter adds it', () => {
      const app = new App();

      app.combinationListener({ key: 'p' });

      expect(app.state).toEqual({
        showApp: false,
        superPrivatePass: 'p'
      });
    });

    it('Entering password sets it and showsApp', () => {
      const app = new App();

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
      const app = new App();

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
      const app = new App();

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
      const app = new App();

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

    it('Another password should simply showApp', () => {
      const app = new App({ password: 'zxc' });

      app.combinationListener({ key: 'z' });
      app.combinationListener({ key: 'x' });
      app.combinationListener({ key: 'c' });

      expect(app.state).toEqual({
        showApp: true,
        superPrivatePass: 'zxc'
      });
    });

    it('Another password should simply showApp (ewq)', () => {
      const app = new App({ password: 'ewq' });

      app.combinationListener({ key: 'e' });
      app.combinationListener({ key: 'w' });

      expect(app.state).toEqual({
        showApp: false,
        superPrivatePass: 'ew'
      });

      app.combinationListener({ key: 'q' });

      expect(app.state).toEqual({
        showApp: true,
        superPrivatePass: 'ewq'
      });
    });

    it('Resetting and then correct password is passed', () => {
      const app = new App();

      app.combinationListener({ key: 'p' });
      app.combinationListener({ key: 'p' });

      expect(app.state).toEqual({
        showApp: false,
        superPrivatePass: ''
      });

      app.combinationListener({ key: 'q' });

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

    it('Resetting does nothing when app is shown', () => {
      const app = new App();

      app.combinationListener({ key: 'p' });
      app.combinationListener({ key: 'a' });
      app.combinationListener({ key: 's' });
      // app.combinationListener({ key: 's' });

      app.combinationListener({ key: 'q' });

      expect(app.state).toEqual({
        showApp: false,
        superPrivatePass: ''
      });
    });

    it('User can quit the app', () => {
      const app = new App();

      app.combinationListener({ key: 'p' });
      app.combinationListener({ key: 'a' });
      app.combinationListener({ key: 's' });
      app.combinationListener({ key: 's' });

      app.combinationListener({ key: ESCAPE });

      expect(app.state).toEqual({
        showApp: false,
        superPrivatePass: ''
      });
    });

    it('Custom quit button', () => {
      const QUIT = 'x';
      const app = new App({ quitKey: QUIT });

      app.combinationListener({ key: 'p' });
      app.combinationListener({ key: 'a' });
      app.combinationListener({ key: 's' });
      app.combinationListener({ key: 's' });

      // showApp = true

      app.combinationListener({ key: QUIT });

      expect(app.state).toEqual({
        showApp: false,
        superPrivatePass: ''
      });
    });
  });
});
