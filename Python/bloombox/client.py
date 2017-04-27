# -*- coding: utf-8 -*-

__doc__ = """

  bloombox: API client

"""

import logging
# stdlib
import sys

# google
import httplib2
from apiclient import discovery

# local
from . import auth

## Constants
API_ROOT = "https://api-dot-bloombox-io.appspot.com/_ah/api/"

## Globals
http = None
logger = logging.getLogger()
_old_stdout = sys.stdout
_old_stderr = sys.stderr
discovery_url = lambda root, api, version: "%s/discovery/v1/apis/%s/%s/rest" % (root, api, version)


def build_service(arguments, root, api, version, authorized=True):

  """ Build a service for a given API and version. """

  # authorize our client
  global http
  global logger
  if http is None:
    http = httplib2.Http()

  if arguments:
    if arguments.verbose:
      logger.setLevel(20)
    else:
      logger.setLevel(30)
    if arguments.quiet:
      logger.setLevel(50)
    if arguments.debug:
      httplib2.debuglevel = 4
      logger.setLevel(10)

  http = auth.authenticate(http, arguments, authorize=authorized)

  # build our service
  discoveryUrl = discovery_url(root, api, version)

  if arguments and arguments.verbose:
    print "Discovering service at endpoint %s..." % discoveryUrl

  service = discovery.build(api, version, discoveryServiceUrl=discoveryUrl, http=http, developerKey=auth.API_KEY, cache_discovery=False)
  return service


def get_client(arguments, api, version, authorized=True):

  """ Get an API client for a given API and version under ``arguments``. """

  return build_service(arguments, API_ROOT, api, version, authorized=authorized)
