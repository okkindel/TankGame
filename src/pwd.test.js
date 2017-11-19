function checkPwd(password, letter, iter = 0) {
  if (!password) { throw new Error('Nu nu. User very bad!'); }

  return {
    iter: (password[iter] === letter ? iter + 1 : iter),
    result: false
  };
}

function passwordChecker(password) {
  let iter;
  return function closure(letter) {
    const result = checkPwd(password, letter, iter);
    iter = result.iter; // eslint-disable-line prefer-destructuring
    return result;
  };
}


describe('Password checker test suite', () => {
  it('Empty password is a no go', () => {
    let threw = false;
    try {
      checkPwd('');
    } catch (error) {
      expect(error.message).toEqual('Nu nu. User very bad!');
      threw = true;
    }
    expect(threw).toEqual(true);
  });

  it('Returns an iterator and a check result', () => {
    expect(checkPwd('pass', 'l')).toEqual({ iter: 0, result: false });
  });

  it('Returns an iterator and a check result', () => {
    expect(checkPwd('pass', 'p')).toEqual({ iter: 1, result: false });
  });


  describe('closured', () => {
    const check = passwordChecker('pass');

    it('Returns an iterator and a check result', () => {
      expect(check('p')).toEqual({ iter: 1, result: false });
      expect(check('a')).toEqual({ iter: 2, result: false });
      expect(check('s')).toEqual({ iter: 3, result: false });
    });
  });
});
