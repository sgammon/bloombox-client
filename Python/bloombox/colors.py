# -*- coding: utf-8 -*-

__doc__ = """

  bloombox: CLI color support

"""

# colorama
from colorama import init, Fore, Style

init()


def green(message):

  """ Output a green message. """

  print Fore.GREEN + message + Fore.RESET + Style.RESET_ALL


def red(message):

  """ Output a red message. """

  print Fore.RED + message + Fore.RESET + Style.RESET_ALL


def yellow(message):

  """ Output a yellow message. """

  print Fore.YELLOW + message + Fore.RESET + Style.RESET_ALL


def cyan(message):

  """ Output a cyan message. """

  print Fore.CYAN + message + Fore.RESET + Style.RESET_ALL
