# -*- coding: utf-8 -*-

__doc__ = """

  bloombox: CLI output tools

"""

# stdlib
import sys
import json
import pprint
from StringIO import StringIO
from oauth2client import tools
from googleapiclient.errors import HttpError


# Globals
_old_stdout = sys.stdout
_old_stderr = sys.stderr
pretty_printer = pprint.PrettyPrinter(indent=4)


def execute(arguments, request, fail_on_error=True, fail_on_403=False):

  """ Execute an RPC request, handling some common errors that may occur. """

  if arguments.debug:
    import pdb; pdb.set_trace()

  try:
    result = request.execute()
  except HttpError as e:
    if e.resp["status"] == "404":
      return None
    elif e.resp["status"] == "403":
      if fail_on_403:
        print "Exiting on 403."
        exit(1)
      else:
        from .auth import flow, prep_flags, storage, reset_creds, install_creds
        reset_creds(arguments)
        flags = prep_flags(arguments)
        tools.run_flow(flow, storage, flags)
        install_creds(arguments)

        # okay, if we didn't hit an exception... retry
        return execute(arguments, request, fail_on_403=True)
    else:
      if fail_on_error:
        raise APIError(e.resp, e.content)
      if arguments.debug:
        print "Received unrecognized error in underlying API. Entering debug shell.."
        import pdb; pdb.set_trace()

  return result


def confirm(question="Does this look right?", default="y"):

  """ Confirm an operation with the user, with a y/n-style prompt. """

  result = raw_input("%s [y/n, enter for %s]: " % (question, default))
  if result is None or result == "": result = default
  
  if result != "y":
    print "Exiting on user command."
    sys.exit(0)
  else:
    print "Continuing with operation."


def object_output(obj):

  """ Pretty-print an object. """

  pretty_printer.pprint(obj)


def keyed_output_items(arguments, raw_response, section, iterable, labelgetter):

  """ Output a set of keyed items, such as a response from a `list`-style method. """

  if arguments.json:
    print json.dumps(raw_response)
  else:
    if not arguments.quiet: print section + ":"
    
    for i, item in enumerate(iterable):
      label = labelgetter(iterable[i])
      print "-- %s" % label
      if arguments.verbose:
        print "  Key: %s" % iterable[i]["key"]
        for key, value in iterable[i]["data"].iteritems():
          print "  [%s]: %s" % (key, value)
        print "\n"


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
