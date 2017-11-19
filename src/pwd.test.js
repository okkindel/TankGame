function checkPwd(password, letter, iter = 0) {
  if (!password) { throw new Error('Nu nu. User very bad!'); }
  return { iter, result: false };
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
});
