
# Bloombox API Client: JavaScript


This package, available via NPM, Yarn and Bower, presents an interface for accessing [Bloombox](https://bloombox.io)
APIs. It's built using [Google Cloud Endpoints](https://cloud.google.com/appengine/docs/standard/java/endpoints/),
[Swagger/OpenAPI](http://swagger.io/) and the [Google Client JS API](https://developers.google.com/api-client-library/javascript/start/start-js).

## Services
- *Embed API* - allows embeddeding a Bloombox menu into a webpage, or downloading data to create your own embedded menu

## Usage
The library can be used via [Google Closure Compiler](https://developers.google.com/closure/compiler/), via the compiled
versions kept in `dist/` in this repository, via our CDN (see below), or via Node.JS as a standalone package.
  
### Closure Compiler
The library is annotated with the traditional set of `goog.require`/`goog.provide` module descriptors, in addition to
the standard JSDoc type annotations needed for advanced compilation.

1) Add the module to your list of sources (for example, `require.resolve('bloombox-api-client/some-path-here.js')`)
2) Require the client via `goog.require('bloombox.api.client')`
3) Require your desired APIs, like so: `goog.require('bloombox.api.embed')`
