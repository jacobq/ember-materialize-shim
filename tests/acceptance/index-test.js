import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import Materialize from 'materialize';

moduleForAcceptance('Materialize Shim Tests');

test('Installation verification', function(assert) {
  visit('/');

  andThen(function() {
    console.log('font-family', find('#title'));
    console.log('font-family', find('#title').css('font-family'));
    debugger;
    assert.ok(
      find('#title')
        .css('font-family')
        .indexOf('Roboto') >= 0,
      'Stylesheet is installed'
    );
    assert.equal(
      find('.material-icons')
        .css('font-family')
        .replace(/['"]/g, ''),
      'Material Icons',
      'Icons are installed'
    );
    assert.equal(typeof Materialize, 'object', 'JS is installed as an ES6 module');
    assert.equal(currentURL(), '/');
  });
});
