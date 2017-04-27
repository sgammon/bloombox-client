# -*- coding: utf-8 -*-

"""
  bloombox: setup
  ~~~~~~~~~~~~~~~

  Egg builder script for the Bloombox API Client for Python.

  :author: Sam Gammon <sg@samgammon.com>
  :copyright: (c) Sam Gammon, 2017
  :license: This software makes use of the Apache 2.0 License.
            A copy of this license is included as ``LICENSE.txt`` in
            the root of the project.
"""

from os import path

from setuptools import setup

import bloombox

# read requirements.txt, filtering out empty lines, and splitting out egg names
with open(path.join(path.abspath(path.dirname(__file__)), 'requirements.txt')) as f:
  requirements = map(lambda i: (
    "egg=" in i and i.split("egg=")[-1] or i
  ), filter(lambda f: f, f.read().split("\n")))


setup(
  name='bloombox',

  # Versions should comply with PEP440.  For a discussion on single-sourcing
  # the version across setup.py and the project code, see
  # https://packaging.python.org/en/latest/single_source_version.html
  version=".".join(map(unicode, bloombox.__version__)),

  description='A sample Python project',
  long_description=bloombox.__doc__.lstrip().rstrip(),

  # The project's main homepage.
  url='https://github.com/bloombox/api-client-python',

  # Author details
  author='Sam Gammon',
  author_email='sam@momentum.io',

  contact='Bloombox',
  contact_email='info@bloombox.io',

  # Choose your license
  license='Apache 2.0',

  # See https://pypi.python.org/pypi?%3Aaction=list_classifiers
  classifiers=[
    # How mature is this project? Common values are
    #   3 - Alpha
    #   4 - Beta
    #   5 - Production/Stable
    'Development Status :: 4 - Beta',

    'Intended Audience :: Developers',
    'Topic :: Software Development :: Build Tools',

    # Pick your license as you wish (should match "license" above)
    'License :: OSI Approved :: Apache 2.0',

    # Specify the Python versions you support here. In particular, ensure
    # that you indicate whether you support Python 2, Python 3 or both.
    'Programming Language :: Python :: 2',
    'Programming Language :: Python :: 2.7',
    'Programming Language :: Python :: 3',
    'Programming Language :: Python :: 3.3',
    'Programming Language :: Python :: 3.4',
    'Programming Language :: Python :: 3.5',
  ],

  # What does your project relate to?
  keywords='api client bloombox',

  # You can just specify the packages manually here if your project is
  # simple. Or you can use find_packages().
  packages=['bloombox', 'bloombox.api', 'bloombox_tests'],

  package_data={'': ['requirements.txt', 'LICENSE.txt', 'README.txt']},

  # List run-time dependencies here.  These will be installed by pip when
  # your project is installed. For an analysis of "install_requires" vs pip's
  # requirements files see:
  # https://packaging.python.org/en/latest/requirements.html
  install_requires=requirements,

  # To provide executable scripts, use entry points in preference to the
  # "scripts" keyword. Entry points provide cross-platform support and allow
  # pip to create the appropriate form of executable for the target platform.
  entry_points={
    'console_scripts': [
      'bloombox=bloombox',
    ],
  },
)
