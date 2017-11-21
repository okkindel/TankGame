function passwordChecker(pwd, debug = false) {
  if (!pwd) { throw new Error('Nu nu. User very bad!'); }

  function checkPwd(password, letter, iter = 0) {
    if (password.length <= iter) { throw new Error('I\' done already!'); }

    function next() {
      if (password[iter] === letter) {
        return iter + 1;
      }
      return password[0] === letter ? 1 : 0;
    }

    const newIter = next();

    return {
      iter: newIter,
      result: newIter === password.length
    };
  }

  let iter;
  return function closure(letter) {
    const result = checkPwd(pwd, letter, iter);
    iter = result.iter; // eslint-disable-line prefer-destructuring
    return debug ? result : result.result;
  };
}


describe('Password checker test suite', () => {
  it('Empty password is a no go', () => {
    let threw = false;
    try {
      passwordChecker('');
    } catch (error) {
      expect(error.message).toEqual('Nu nu. User very bad!');
      threw = true;
    }
    expect(threw).toEqual(true);
  });

  it('Returns an iterator and a check result', () => {
    const check = passwordChecker('pass', true);
    expect(check('l')).toEqual({ iter: 0, result: false });
  });

  it('Returns an iterator and a check result', () => {
    const check = passwordChecker('pass', true);
    expect(check('p')).toEqual({ iter: 1, result: false });
  });


  describe('closured', () => {
    it('full password check', () => {
      const check = passwordChecker('pass', true);
      expect(check('p')).toEqual({ iter: 1, result: false });
      expect(check('a')).toEqual({ iter: 2, result: false });
      expect(check('s')).toEqual({ iter: 3, result: false });
      expect(check('s')).toEqual({ iter: 4, result: true });
    });

    it('doubled first letter', () => {
      const check = passwordChecker('pass', true);
      expect(check('p')).toEqual({ iter: 1, result: false });
      expect(check('p')).toEqual({ iter: 1, result: false });
      expect(check('a')).toEqual({ iter: 2, result: false });
      expect(check('s')).toEqual({ iter: 3, result: false });
      expect(check('s')).toEqual({ iter: 4, result: true });
    });

    it('first letter, error, then ongoing', () => {
      const check = passwordChecker('pass', true);
      expect(check('p')).toEqual({ iter: 1, result: false });
      expect(check('x')).toEqual({ iter: 0, result: false });
      expect(check('a')).toEqual({ iter: 0, result: false });
      expect(check('s')).toEqual({ iter: 0, result: false });
      expect(check('s')).toEqual({ iter: 0, result: false });
    });

    it('first letter, second, second, then ongoing', () => {
      const check = passwordChecker('pass', true);
      expect(check('p')).toEqual({ iter: 1, result: false });
      expect(check('a')).toEqual({ iter: 2, result: false });
      expect(check('a')).toEqual({ iter: 0, result: false });
      expect(check('s')).toEqual({ iter: 0, result: false });
      expect(check('s')).toEqual({ iter: 0, result: false });
    });

    it('password checker is done', () => {
      const check = passwordChecker('pass', true);
      check('p');
      check('a');
      check('s');
      check('s');

      let threw = false;
      try {
        check('x');
      } catch (error) {
        expect(error.message).toEqual('I\' done already!');
        threw = true;
      }
      expect(threw).toEqual(true);
    });

    it('Closure returns just a boolean', () => {
      const check = passwordChecker('s');
      expect(check('y')).toEqual(false);
      expect(check('s')).toEqual(true);
    });
  });
});
