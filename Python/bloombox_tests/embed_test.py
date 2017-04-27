# -*- coding: utf-8 -*-

"""
  bloombox: embed API tests
  ~~~~~~~~~~~~~~~~~~~~~~~~~

  Tests the embed API from Python.

  :author: Sam Gammon <sg@samgammon.com>
  :copyright: (c) Sam Gammon, 2017
  :license: This software makes use of the Apache 2.0 License.
            A copy of this license is included as ``LICENSE.txt`` in
            the root of the project.
"""

# test tools
from canteen import test

from bloombox.api import embed


class EmbedAPITest(test.AppTest):
  """ Run some tests to exercise the API client's output tools. """

  def test_embed_view(self):

    """ Test RPC method `Embed.view` """

    embed.Embed.view("mm", "sacramento")
