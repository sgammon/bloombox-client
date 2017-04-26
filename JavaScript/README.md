
# Bloombox API Client: JavaScript


This package, available via NPM, Yarn and Bower, presents an interface for accessing [Bloombox](https://bloombox.io)
APIs. It's built using [Google Cloud Endpoints](https://cloud.google.com/appengine/docs/standard/java/endpoints/),
[Swagger/OpenAPI](http://swagger.io/) and the [Google Client JS API](https://developers.google.com/api-client-library/javascript/start/start-js).

Via [NPM](https://www.npmjs.com):
```bash
npm install --save bloombox-api-client
```

Via [Bower](https://bower.io/):
```bash
bower install --save Bloombox/bloombox-api-client
```

## Services
- *Embed API* - allows embeddeding a Bloombox menu into a webpage, or downloading data to create your own embedded menu

## Usage
The library can be used via [Google Closure Compiler](https://developers.google.com/closure/compiler/), via the compiled
versions kept in `dist/` in this repository, via our CDN (see below), or via Node.JS as a standalone package.

### Via the CDN
The quickest and easiest way to grab the library is via our CDN, which is powered by Google Cloud's global loud
frontend, behind geo-distributed, anycast DNS (this all means it is fast):

```html
<!-- Synchronous mode -->
<html>
<head>
<script type="text/javascript" src="https://app.bloomware.media/apiclient/0.0.1.js"></script>
</head>
...
```

```html
...
<!-- Asynchronous mode -->
<script defer async type="text/javascript" src="https://app.bloomware.media/apiclient/0.0.1.js"></script>
</body>
</html>
```

### Ship with your app
Ship your app with a copy of our API client from `dist`:
- `bloombox-api-client-0.0.1.js`: Pre-packaged with all dependencies
- `bloombox-api-client-behavior.js`: Packaged as a [Polymer Behavior](https://github.com/Bloombox/bloombox-client/blob/master/polymer/README.md)
- `bloombox-api-client.html`: Packaged as a [Polymer element](https://github.com/Bloombox/bloombox-client/blob/master/polymer/README.md)

  
### Closure Compiler
The library is annotated with the traditional set of `goog.require`/`goog.provide` module descriptors, in addition to
the standard JSDoc type annotations needed for advanced compilation.

1) Add the module to your list of sources (for example, `require.resolve('bloombox-api-client/some-path-here.js')`)
2) Require the client via `goog.require('bloombox.api.client')`
3) Require your desired APIs, like so: `goog.require('bloombox.api.embed')`
4) The API object should be available directly at, for instance, `EmbedAPI`

## Building
To build the library yourself, simply clone and run `make`. All external dependencies will be installed for you and the
library will build itself via `gulp`. To learn more about what you can do, run `make help`, which looks like this:

```text
Bloombox API: JavaScript Client

all                            Default routine - build the JavaScript client.
build                          Build the JavaScript client.
clean                          Clean ephemeral build files.
demo                           Build the JavaScript client and open a demo page.
develop                        Run the development server and TDD flow.
distclean                      Clean dependencies and ephemeral build files.
forceclean                     Force clean everything.
release                        Clean, and then build a release copy of the JavaScript client.
test                           Run the testsuite for the JavaScript client, atop PhantomJS.
```

Once you're actually developing things, `gulp` gets more useful. Take a look at the `gulpfile.js` if you're curious
about the tasks at your disposal.

## Contributions

Open contributions are happily accepted, and the library is issued mostly under the
[Apache 2.0 license](https://github.com/Bloombox/bloombox-client/blob/master/LICENSE.txt). Other licenses are noted
where they apply.

### File a bug
All API client bugs are centrally tracked in the master [bloombox-client](https://github.com/bloombox/bloombox-client)
repository. File a bug there, using the builtin issue template, making sure to mention the API client and service that
the issue applies to.

### How to contribute

1) Fork the repo into your own username's namespace
2) File a pull, making sure to tag the bug you're fixing, if applicable, with *Fixes and closes*
3) Once the review builds in CI and passes analysis, request a review
4) Sign the CLA, if applicable
5) That's it!
