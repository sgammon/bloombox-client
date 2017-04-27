# -*- coding: utf-8 -*-

__doc__ = """

  bloombox: CLI output tools

"""

# stdlib
import sys
import json
import pprint
from oauth2client import tools
from googleapiclient.errors import HttpError

from . import colors


# Globals
_old_stdout = sys.stdout
_old_stderr = sys.stderr
pretty_printer = pprint.PrettyPrinter(indent=4)

QUIET = False
VERBOSE = False
COLORS = True


def verbose(message):

  """ Say a verbose-level log message. """

  message = "[Bloombox]: %s" % message
  if not QUIET and VERBOSE:
    if COLORS:
      colors.gray(message)
    else:
      print message


def say(message):

  """ Say an info-level log message. """

  message = "[Bloombox]: %s" % message
  if not QUIET:
    if COLORS:
      colors.cyan(message)
    else:
      print message


def warn(message):

  """ Say a warning-level log message. """

  message = "[Bloombox]: %s" % message
  if not QUIET and VERBOSE:
    if COLORS:
      colors.yellow(message)
    else:
      print message


def success(message):

  """ Say a success-level log message. """

  message = "[Bloombox]: %s" % message
  if not QUIET:
    if COLORS:
      colors.green(message)
    else:
      print message


def error(message):

  """ Say a success-level log message. """

  message = "[Bloombox]: %s" % message
  if COLORS:
    colors.red(message)
  else:
    print message


def execute(arguments, request, fail_on_error=True, fail_on_403=False):

  """ Execute an RPC request, handling some common errors that may occur. """

  if arguments and arguments.debug:  # pragma: no cover
    import pdb; pdb.set_trace()

  try:
    result = request.execute()
  except HttpError as e:  # pragma: no cover
    if e.resp["status"] == "404":
      return None
    elif e.resp["status"] == "403":
      if fail_on_403:
        error("Exiting on 403.")
        exit(1)
      else:
        from .auth import flow, prep_flags, storage, reset_creds, install_creds
        if arguments:
          reset_creds(arguments)
          flags = prep_flags(arguments)
          tools.run_flow(flow, storage, flags)
          install_creds(arguments)

        # okay, if we didn't hit an exception... retry
        return execute(arguments, request, fail_on_403=True)
    else:
      if fail_on_error:
        raise APIError(e.resp, e.content)
      error("Received unrecognized error in underlying API.")
      if arguments and arguments.debug:
        import pdb; pdb.set_trace()

  return result


def confirm(question="Does this look right?", default="y"):  # pragma: no cover

  """ Confirm an operation with the user, with a y/n-style prompt. """

  result = raw_input("%s [y/n, enter for %s]: " % (question, default))
  if result is None or result == "": result = default

  if result != "y":
    error("Exiting on user command.")
    sys.exit(0)
  else:
    verbose("Continuing with operation.")


def object_output(obj):

  """ Pretty-print an object. """

  pretty_printer.pprint(obj)


def keyed_output_items(arguments, raw_response, section, iterable, labelgetter):

  """ Output a set of keyed items, such as a response from a `list`-style method. """

  if arguments and arguments.json:
    print json.dumps(raw_response)
  else:
    if arguments and not arguments.quiet: print section + ":"

    for i, item in enumerate(iterable):
      label = labelgetter(iterable[i])
      print "-- %s" % label
      if arguments.verbose:
        print "  Key: %s" % iterable[i]["key"]
        for key, value in iterable[i]["data"].iteritems():
          print "  [%s]: %s" % (key, value)
        print "\n"


def _apply_logging_settings(arguments):  # pragma: no cover

  """ Apply logging config from command line arguments. """

  global QUIET
  global VERBOSE
  global COLORS

  QUIET = arguments.quiet or False
  VERBOSE = arguments.verbose or False
  COLORS = arguments.colors or False


class APIError(HttpError):

  """ Represents an internal K9 API error. """

  code = None
  error = None
  message = None

  def __init__(self, resp, payload):

    """ Initialize from an HTTP error response payload. """

    self.code = resp["status"]

    # try to decode a JSON error payload
    if "json" in resp["content-type"]:
      inflated = json.loads(payload)
      self.message = inflated["error"]["errors"][0]["message"]
      self.error = inflated["error"]["errors"][0]["message"].replace("[", "").replace("]", "")
