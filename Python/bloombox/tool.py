# -*- coding: utf-8 -*-

__doc__ = """

  bloombox: API CLI

"""

__version__ = (0, 0, 1)
__author__ = "Sam Gammon <sam@momentum.io>"

# canteen
from canteen.util import cli

# utils
from . import auth
# subtools
from .api import embed

## Lambdas
version_label = lambda: ".".join(map(unicode, __version__))

## Constants
auth.USER_AGENT = "bloombox-public-cli/%s" % version_label()


class Bloombox(cli.Tool):

  """ bloombox toolchain """

  arguments = (
    ("--apikey", "-k", {"type": str, "help": "API key"}),
    ("--client", {"type": str, "help": "OAuth2 client ID to use"}),
    ("--secret", {"type": str, "help": "OAuth2 client secret to use"}),
    ("--json", "-js", {"action": "store_true", "help": "output raw JSON instead of pretty text"}),
    ("--force", "-f", {"action": "store_true", "help": "force our way thru whatever checks may fail"}),
    ("--debug", "-d", {"action": "store_true", "help": "output debug info"}),
    ("--quiet", "-q", {"action": "store_true", "help": "suppress most output"}),
    ("--verbose", "-v", {"action": "count", "help": "output a lot of useful info"}),
    ("--no-colors", {"action": "store_true", "help": "don't output colorized logs"}),
    ("--logging", "-ll", {"type": str, "metavar": "L", "default": "ERROR", "help": "logging level name"}),
    ("--version", "-V", {"action": "version", "help": "print version and exit", "version":
        "bloombox CLI %s" % version_label()}))

  Embed = embed.Embed  # embed tools


if __name__ == "__main__": Bloombox(autorun=True)
