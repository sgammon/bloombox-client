
#
## Makefile: Bloombox API Client for JavaScript
#

VERSION ?= 0.0.1

TARGET ?= target
DEPENDENCIES ?= node_modules components

BUILDBOT ?= 0

ifeq ($(BUILDBOT),1)
DEPENDENCY_COMMAND ?= npm install
TEST_SETUP ?= setup_x
TEST_ENVIRONMENT ?= DISPLAY=99.0 CHROME_BIN=$(which google-chrome)
else
DEPENDENCY_COMMAND ?= yarn
TEST_SETUP ?=
TEST_ENVIRONMENT ?=
endif


## -- Commands

all: build test  ## Default routine - build the JavaScript client.
	@echo "Ready to work with Bloombox API Client for JavaScript."

build: $(DEPENDENCIES) $(TARGET)  ## Build the JavaScript client.

test: $(DEPENDENCIES) $(TARGET) $(TEST_SETUP)  ## Run the testsuite for the JavaScript client, atop PhantomJS.
	@echo "Running JavaScript Client testsuite..."
	@$(TEST_ENVIRONMENT) gulp test

release: clean build test  ## Clean, and then build a release copy of the JavaScript client.
	@echo "Building release tarball bloombox-js-client-$(VERSION).tar.gz..."
	@mv $(TARGET) bloombox-js-client-$(VERSION) && \
		tar -czvf bloombox-js-client-$(VERSION).tar.gz bloombox-js-client-$(VERSION) && \
		mv bloombox-js-client-$(VERSION) $(TARGET);
	@echo "Release tarball ready."

demo: release  ## Build the JavaScript client and open a demo page.
	@echo "Starting demo server..."
	@gulp serve

develop:  ## Run the development server and TDD flow.
	@echo "Starting developer flow..."
	@gulp develop

clean:  ## Clean ephemeral build files.
	@echo "Cleaning JavaScript client..."
	@rm -frv $(TARGET) coverage

distclean: clean  ## Clean dependencies and ephemeral build files.
	@echo "Cleaning dependencies..."
	@rm -frv node_modules

forceclean: distclean  ## Force clean everything.
	@echo "Cleaning unrecognized files..."
	@git clean -xdf


## -- Outputs

setup_x:
	@echo "Starting XVFB for browser testing..."
	@test -e /tmp/.X99-lock || sudo /usr/bin/Xvfb :99 &

$(TARGET):
	@echo "Building Bloombox API Client for JavaScript..."
	@gulp


## -- Dependencies

node_modules:
	@echo "Installing Node modules..."
	@$(DEPENDENCY_COMMAND)

components:
	@echo "Installing Bower components..."
	@bower install


## -- Docs

help:
	@echo
	@echo "Bloombox API: JavaScript Client"
	@echo
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo


.PHONY: all build test release demo clean distclean forceclean help

