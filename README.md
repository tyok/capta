# capta

```
npm install capta
```

Capta was born to make playing with promise in REPL easier.
It will tell you when the promise is resolved
and store the values in `obj._`.

```javascript
$ node
> var cap = require('capta');
> var result = cap(somePromise);
// wait a bit...
Promise captured!
> result._
['some value']
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

If you know the promise will only return a single value,
use `cap.first` or `cap.one`:

```javascript
$ node
> var cap = require('capta');
> var result = cap.first(somePromise);
// wait a bit...
Promise captured!
> result._
'some value'
```
