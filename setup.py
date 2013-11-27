# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this file,
# You can obtain one at http://mozilla.org/MPL/2.0/.

import sys
from setuptools import setup

PACKAGE_NAME = "mozscreenshots"
PACKAGE_VERSION = '0.1'

desc = """Takes screenshots of different states of an application"""

deps = ['mozrunner >= 5.0']

setup(name=PACKAGE_NAME,
      version=PACKAGE_VERSION,
      description=desc,
      long_description="",
      classifiers=['Environment :: Console',
                   'Intended Audience :: Developers',
                   'License :: OSI Approved :: Mozilla Public License 2.0 (MPL 2.0)',
                   'Natural Language :: English',
                   'Operating System :: OS Independent',
                   'Programming Language :: JavaScript',
                   'Programming Language :: Python',
                   'Topic :: Software Development :: Libraries :: Python Modules',
                   ],
      keywords='mozilla',
      author='Matthew Noorenberghe',
      author_email='mnoorenberghe+mozscreenshots@mozilla.com',
      url='https://github.com/mnoorenberghe/mozscreenshots',
      license='MPL 2.0',
      packages=['mozscreenshots'],
      package_dir={'mozscreenshots': 'mozscreenshots'},
      package_data={'mozscreenshots': [
            'extension/*.*',
            'extension/configurations/*.jsm',
            'extension/lib/*.*'
            ]},
      zip_safe=False,
      install_requires = deps,
      entry_points="""
# -*- Entry points: -*-
[console_scripts]
mozscreenshots = mozscreenshots:cli
""",
    )