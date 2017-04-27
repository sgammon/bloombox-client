# -*- coding: utf-8 -*-

"""
  bloombox: output tests
  ~~~~~~~~~~~~~~~~~~~~~~

  Tests for output tools.

  :author: Sam Gammon <sg@samgammon.com>
  :copyright: (c) Sam Gammon, 2017
  :license: This software makes use of the Apache 2.0 License.
            A copy of this license is included as ``LICENSE.txt`` in
            the root of the project.
"""

# test tools
from canteen import test

from bloombox import output


class OutputToolsTest(test.AppTest):

  """ Run some tests to exercise the API client's output tools. """

  def test_object_output(self):

    """ Test that pretty-printing an object works """

    output.object_output({
      "sample": "hi"
    })

  def test_logging_no_colors(self):

    """ Test that logging functions exist and work with no colors """

    output.LOGGING = True
    output.COLORS = False
    output.VERBOSE = True
    output.say("This should be cyan")
    output.verbose("This should be cyan")
    output.warn("This should be yellow")
    output.error("This should be red")
    output.success("This should be green")
    output.VERBOSE = False
    output.LOGGING = False

  def test_logging_with_colors(self):

    """ Test that logging functions exist and work with colors """

    output.LOGGING = True
    output.COLORS = True
    output.VERBOSE = True
    output.say("This should be cyan")
    output.verbose("This should be cyan")
    output.warn("This should be yellow")
    output.error("This should be red")
    output.success("This should be green")
    output.VERBOSE = False
    output.LOGGING = False
    output.COLORS = False
