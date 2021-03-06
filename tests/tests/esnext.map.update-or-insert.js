QUnit.test('Map#updateOrInsert', assert => {
  const { updateOrInsert } = Map.prototype;
  assert.isFunction(updateOrInsert);
  assert.arity(updateOrInsert, 3);
  assert.name(updateOrInsert, 'updateOrInsert');
  assert.looksNative(updateOrInsert);
  assert.nonEnumerable(Map.prototype, 'updateOrInsert');

  const map = new Map([['a', 2]]);
  // eslint-disable-next-line prefer-arrow-callback
  assert.same(map.updateOrInsert('a', function (value) {
    assert.same(arguments.length, 1, 'correct number of callback arguments');
    assert.same(value, 2, 'correct value in callback');
    return value ** 2;
  }, () => {
    assert.ok(false, 'should not be called');
    return 3;
  }), 4, 'returns a correct value');
  assert.same(map.updateOrInsert('b', value => {
    assert.ok(false, 'should not be called');
    return value ** 2;
  // eslint-disable-next-line prefer-arrow-callback
  }, function () {
    assert.same(arguments.length, 0, 'correct number of callback arguments');
    return 3;
  }), 3, 'returns a correct value');
  assert.same(map.size, 2, 'correct size');
  assert.same(map.get('a'), 4, 'correct result #1');
  assert.same(map.get('b'), 3, 'correct result #2');

  assert.throws(() => new Map([['a', 2]]).updateOrInsert('b', null, () => 3), TypeError);
  assert.throws(() => new Map([['a', 2]]).updateOrInsert('a', value => value ** 2), TypeError);

  assert.throws(() => updateOrInsert.call({}, 'a', () => { /* empty */ }, () => { /* empty */ }), TypeError);
  assert.throws(() => updateOrInsert.call([], 'a', () => { /* empty */ }, () => { /* empty */ }), TypeError);
  assert.throws(() => updateOrInsert.call(undefined, 'a', () => { /* empty */ }, () => { /* empty */ }), TypeError);
  assert.throws(() => updateOrInsert.call(null, 'a', () => { /* empty */ }, () => { /* empty */ }), TypeError);
});
