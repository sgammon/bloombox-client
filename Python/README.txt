
# Bloombox API Client: Python

This Python egg, available via PyPI, exposes a Python interface for accessing Bloombox (https://bloombox.io) APIs.
It's built using Google Cloud Endpoints, Swagger/OpenAPI and the Google API Client for Python.

Via PyPI:
echo "bloombox" >> requirements.txt && pip install -r requirements.txt

## Services
- Embed API - allows embeddeding a Bloombox menu into a webpage, or downloading data to create your own embedded menu

## Usage

from bloombox import auth
from bloombox.api.embed import Embed

auth.API_KEY = "your-api-key-here"
Embed.view("partner-id", "location-id")


## Building
To build the library yourself, simply clone and run `make`. All external dependencies will be installed for you and the
library will build itself via `setup.py`. To learn more about what you can do, run `make help`, which looks like this:


Bloombox API: Python Client

all                            Default routine - build the Python client.
clean                          Clean ephemeral build files.
distclean                      Clean dependencies and ephemeral build files.
forceclean                     Force clean everything.
help                           Show this help text.
release                        Clean, and then build a release copy of the Python client.
test                           Run the testsuite for the Python client.


## Contributions

Open contributions are happily accepted, and the library is issued mostly under the Apache 2.0 license. Other licenses
are noted where they apply.

### File a bug
All API client bugs are centrally tracked in the master https://github.com/bloombox/bloombox-client repository. File a
ug there, using the builtin issue template, making sure to mention the API client and service that the issue applies to.

### How to contribute

1) Fork the repo into your own username's namespace
2) File a pull, making sure to tag the bug you're fixing, if applicable, with *Fixes and closes*
3) Once the review builds in CI and passes analysis, request a review
4) Sign the CLA, if applicable
5) That's it!
