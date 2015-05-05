#Contributing

Contributions are **welcome** and will be fully **credited**.

Contributions can be made via a Pull Request on [Github](https://github.com/mike182uk/timestring).

##Pull Requests

- **[jQuery coding style](https://contribute.jquery.org/style-guide/js/)** - [JSCS](http://jscs.info/). Make sure you run `gulp sa` before commiting your code.

- **Add tests where appropriate** - [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/)

- **Document any change in behaviour** - Make sure the README and any other relevant documentation are kept up-to-date.

- **Create topic branches** - i.e `feature/some-awesome-feature`.

- **One pull request per feature**

- **Send coherent history** - Make sure each individual commit in your pull request is meaningful. If you had to make multiple intermediate commits while developing, please squash them before submitting.

##Building The Project

[Gulp](http://gulpjs.com/) is used to build the project. The project uses ES6 so it needs to be transpiled. Once transpiled the code is then [browserified](http://browserify.org/). You can build the project by running:

```bash
gulp build
```

This will perform all build steps, including running the tests and static analysis tools.

##Running Tests

Once the project has been built, the tests can be run with:

```bash
gulp test
```

Alternatively, to build and test at the same time you can run:

```bash
gulp ci
```

This will transpile, browserify and run the tests and static analysis tools.


