# -*- coding: utf-8 -*-

__doc__ = """

  bloombox: API auth

"""

# stdlib
import sys

# google
import oauth2client
import oauth2client.file
from oauth2client import tools
from oauth2client import client


## Constants
OAUTH_DISPLAY_NAME = None
SCOPE = "https://www.googleapis.com/auth/userinfo.email"
CLIENT_SECRET = "CW8_Q6E9MYDMoJzlwktGouaG"  # public demo client ID and secret
CLIENT_ID = "34559483789-1tl292qtn6fgfd167b6m8eaui2vqq7ke.apps.googleusercontent.com"
OAUTH_STORAGE_PATH = ".oauth2client.dat"
USER_AGENT = None
API_KEY = "AIzaSyCZJ3tEeEt8UpaPhlMGVQXpOiwiBC8ho5g"  # public demo API key

## Globals
storage = None
credentials = None
flow = None


def prepare_auth(display_name, client_secret, client_id, api_key, oauth_storage_path=OAUTH_STORAGE_PATH):

  """ Prepare global auth parameters for use. """

  global OAUTH_DISPLAY_NAME
  global SCOPE
  global CLIENT_SECRET
  global CLIENT_ID
  global OAUTH_STORAGE_PATH
  global API_KEY
  global storage
  global credentials
  global flow

  OAUTH_DISPLAY_NAME = display_name
  CLIENT_SECRET = client_secret
  CLIENT_ID = client_id
  API_KEY = api_key
  OAUTH_STORAGE_PATH = oauth_storage_path

  storage = oauth2client.file.Storage(OAUTH_STORAGE_PATH)
  credentials = storage.get()
  flow = client.OAuth2WebServerFlow(
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        scope=SCOPE,
        user_agent=USER_AGENT,
        oauth_displayname=OAUTH_DISPLAY_NAME)


def reset_creds(arguments):

  """ Reset OAuth2 credential state. """

  global credentials
  if arguments.verbose:
    print "Resetting credentials..."
  credentials = None


def install_creds(arguments):

  """ Read from credential storage and install resulting credentials. """

  global credentials
  if arguments.verbose:
    print "Installing credentials..."
  credentials = storage.get()


def prep_flags(flags):

  """ Prepare an arguments object with flags for the auth flow. """

  setattr(flags, "logging_level", flags.logging)
  setattr(flags, "auth_host_name", "localhost")
  setattr(flags, "auth_host_port", [8000, 8085])
  setattr(flags, "noauth_local_webserver", False)
  return flags


def authenticate(http, flags):

  """ Authorize an HTTP request for use with the REST/RPC API. """

  global credentials
  global storage
  global flow

  if credentials is None or credentials.invalid:

    # setup args
    flags = prep_flags(flags)
    credentials = tools.run_flow(flow, storage, flags)

  credentials = storage.get()
  credentials.authorize(http)
  return http
