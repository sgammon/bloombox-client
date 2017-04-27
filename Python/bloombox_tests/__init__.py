# -*- coding: utf-8 -*-

"""
  bloombox: tests
  ~~~~~~~~~~~~~~~

  Testsuite for the Bloombox API Client for Python.

  :author: Sam Gammon <sg@samgammon.com>
  :copyright: (c) Sam Gammon, 2017
  :license: This software makes use of the Apache 2.0 License.
            A copy of this license is included as ``LICENSE.txt`` in
            the root of the project.
"""

if __debug__:

  # test tools
  from canteen import test


  class BloomboxSanityTest(test.AppTest):

    """ Run some basic sanity tests. """

    def test_math_sanity(self):

      """ Test that math still works. """

      self.assertEqual(1 + 1, 2)
      self.assertEqual(2 - 1, 1)

      assert (10 / 2) == 5
      assert (10 % 6) == 4
