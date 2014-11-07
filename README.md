# capta

```
npm install capta
```

Capta was born to make playing with promise in REPL easier.
It will tell you when the promise is resolved
and store the value in `obj._`.

```javascript
$ node
> var cap = require('capta');
> var result = cap(somePromise);
// wait a bit...
Promise captured!
> result._
'some value'
```

When the promise encounters an error,
it will be stored in `obj.err`.

```javascript
$ node
> var cap = require('capta');
> var result = cap(someBrokenPromise);
// wait a bit...
Promise error!
> result.err
'some error'
```

If you know the promise will return multiple arguments,
use `cap.spread` or `cap.all`:

```javascript
$ node
> var cap = require('capta');
> var result = cap.spread(somePromise);
// wait a bit...
Promise captured!
> result._
['some value']
```
