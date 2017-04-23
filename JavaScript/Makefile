
#
## Makefile: Bloombox API Client for JavaScript
#

TARGET ?= target


## -- Commands

all: build test  ## Default routine - build the JavaScript client.
	@echo "Ready to work with Bloombox API Client for JavaScript."

build: node_modules $(TARGET)  ## Build the JavaScript client.

test: node_modules $(TARGET)  ## Run the testsuite for the JavaScript client, atop PhantomJS.
	@echo "Running JavaScript Client testsuite..."
	@gulp test

release: clean build test  ## Clean, and then build a release copy of the JavaScript client.

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

$(TARGET):
	@echo "Building Bloombox API Client for JavaScript..."
	@gulp


## -- Dependencies

node_modules:
	@echo "Installing Node modules..."
	@yarn


## -- Docs

help:
	@echo
	@echo "Bloombox API: JavaScript Client"
	@echo
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo


.PHONY: all build test release demo clean distclean forceclean help

