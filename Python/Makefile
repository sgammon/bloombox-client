
#
## Makefile: Bloombox API Client for Python
#

TARGET ?= target/


## -- Commands

all: build

build: .Python bin/bloombox lib/python2.7/site-packages/bloombox.pth $(TARGET)
	@echo "Ready to work with Bloombox API client."

release: clean build

clean:
	@echo "Cleaning Python client..."
	@rm -frv man lib include .Python .oauth2client.dat $(TARGET)

## -- Outputs

$(TARGET):
	@echo "Building Bloombox API Client for Python..."	

bin/bloombox:
	@echo "Symlinking Bloombox CLI..."
	@ln -s $(shell pwd)/bloombox/__main__.py $(shell pwd)/bin/bloombox
	@chmod +x $(shell pwd)/bin/bloombox

lib/python2.7/site-packages/bloombox.pth:
	@echo "Installing Bloombox for Python into local virtualenv..."
	@echo "$(shell pwd)" > ./lib/python2.7/site-packages/bloombox.pth


## -- Dependencies

.Python:
	@echo "Preparing virtualenv..."
	@virtualenv --prompt="[Bloombox API Client] " .
	@bin/pip install -r requirements.txt
	@bin/pip install "git+https://github.com/sgammon/canteen.git#egg=canteen"


.PHONY: all build release clean

