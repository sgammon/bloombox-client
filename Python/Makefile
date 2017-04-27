
#
## Makefile: Bloombox API Client for Python
#

TARGET ?= build
REPORTS ?= reports/
SRC ?= ./

BUILDBOT ?= 0

OUTPUTS ?= base purelib platlib lib


ifeq ($(BUILDBOT),1)
PIP = $(shell pwd)/bin/pip
NOSETESTS = $(shell pwd)/bin/nosetests
else
PIP = bin/pip
NOSETESTS = bin/nosetests
endif


## -- Commands

all: build  ## Default routine - build the Python client.

test:  ## Run the testsuite for the Python client.
	@echo "Running Python client testsuite..."
	@mkdir -p $(REPORTS)
	@cd $(SRC) && $(NOSETESTS) \
	    --with-coverage \
	    --cover-package=bloombox \
	    --cover-html \
	    --cover-html-dir=$(REPORTS)coverage-html \
	    --cover-xml \
	    --cover-xml-file=$(REPORTS)coverage.xml \
	    --with-xunit \
	    --xunit-file=$(REPORTS)xunit.xml \
	    --xunit-testsuite-name=bloombox-api-client;

release: clean build test  ## Clean, and then build a release copy of the Python client.

clean:  ## Clean ephemeral build files.
	@echo "Cleaning Python client..."
	@rm -frv $(TARGET)

distclean: clean  ## Clean dependencies and ephemeral build files.
	@echo "Cleaning dependencies..."
	@rm -frv man lib include .Python .oauth2client.dat

forceclean: distclean  ## Force clean everything.


## -- Outputs
$(TARGET): .Python bin/bloombox lib/python2.7/site-packages/bloombox.pth test  # Build the Python client.
	@echo "Building Bloombox API Client for Python..."
	@bin/python setup.py build build_py bdist bdist_dumb bdist_egg sdist

bin/bloombox:
	@echo "Symlinking Bloombox CLI..."
	@ln -s $(shell pwd)/src/bloombox/__main__.py $(shell pwd)/bin/bloombox
	@chmod +x $(shell pwd)/bin/bloombox

lib/python2.7/site-packages/bloombox.pth:
	@echo "Installing Bloombox for Python into local virtualenv..."
	@echo "$(shell pwd)" > ./lib/python2.7/site-packages/bloombox.pth


## -- Dependencies

.Python:
	@echo "Preparing virtualenv..."
	@virtualenv --prompt="[Bloombox API Client] " .
	@$(PIP) install python-dateutil werkzeug "Jinja2==2.7.3" "protorpc==0.9.1" "git+https://github.com/sgammon/protobuf.git#egg=protobuf"
	@$(PIP) install -r requirements.txt --upgrade

help:  ## Show this help text.
	@echo
	@echo "Bloombox API: Python Client"
	@echo
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo


.PHONY: all release clean
