
/**
 * Bloombox API: Basic Tests
 *
 * @fileoverview Basic API code tests.
 *
 * @license Private source code, all rights reserved.
 */


describe('common.logging.Logging', function() {
  it('should be accessible on the window', function() {
    expect(window["Logging"]).to.not.equal(undefined);
  });

  it('should expose "say"', function() {
    expect(Logging["say"]).to.not.equal(undefined);
    Logging["say"]("Test", "Hello from a test.");
    say("Test", "Hello from a test.");
  });

  it('should expose "info"', function() {
    expect(Logging["info"]).to.not.equal(undefined);
    Logging["info"]("Test", "Hello from a test.");
    info("Test", "Hello from a test.");
  });

  it('should expose "warn"', function() {
    expect(Logging["warn"]).to.not.equal(undefined);
    Logging["warn"]("Test", "Hello from a test.");
    warn("Test", "Hello from a test.");
  });

  it('should expose "error"', function() {
    expect(Logging["error"]).to.not.equal(undefined);
    Logging["error"]("Test", "Hello from a test.");
    error("Test", "Hello from a test.");
  });

  it('should expose "severe"', function() {
    expect(Logging["severe"]).to.not.equal(undefined);
    Logging["severe"]("Test", "Hello from a test.");
    severe("Test", "Hello from a test.");
  });
});

describe('api.tools', function() {
  setupAPIClient(function() {
    discover("embed", "v1").then(function() {
      it('should be able to setup the Google Client API', function() {
        expect(window["gapi"]["client"]).is.a(Object);
      });
    });
  });
});

describe('common.api.discover', function() {
  setupAPIClient(function() {
    discover("embed", "v1").then(function() {
      var first;
      it('should be able to discover known APIs', function() {
        first = window["gapi"]["client"]["embed"];
        expect(first).is.a(Object);
      });

      it('should be able to discover known APIs', function() {
        expect(window["gapi"]["client"]["embed"]).is.a(Object);
        expect(window["gapi"]["client"]["embed"]).is.equal.to(first);
      });
    });
  });
});

describe('common.api.RPC', function() {
  setupAPIClient(function() {
    discover("embed", "v1").then(function() {
      it('should be constructable', function() {
        expect(new RPC("embed", "view", {
          "partner": "mm",
          "location": "sacramento",
          "style": "MASTER_ONLY"
        }, null)).is.a('Object');
      });

      it('should expose the underlying API and method', function() {
        expect(new RPC("embed", "view", {
          "partner": "mm",
          "location": "sacramento",
          "style": "MASTER_ONLY"
        }, null)).is.a('Object');

        expect(new RPC("embed", "view", {
          "partner": "mm",
          "location": "sacramento",
          "style": "MASTER_ONLY"
        }, null).api).is.equal.to('embed');

        expect(new RPC("embed", "view", {
          "partner": "mm",
          "location": "sacramento",
          "style": "MASTER_ONLY"
        }, null).method).is.equal.to('view');
      });

      it('should expose the underlying parameters', function() {
        expect(new RPC("embed", "view", {
          "partner": "mm",
          "location": "sacramento",
          "style": "MASTER_ONLY"
        }, null).props.partner).is.equal.to('mm');

        expect(new RPC("embed", "view", {
          "partner": "mm",
          "location": "sacramento",
          "style": "MASTER_ONLY"
        }, null).props.location).is.equal.to('sacramento');

        expect(new RPC("embed", "view", {
          "partner": "mm",
          "location": "sacramento",
          "style": "MASTER_ONLY"
        }, null).props.style).is.equal.to('MASTER_ONLY');
      });
    });
  });
});

describe('api.embed.EmbeddedMenu', function() {
  setupAPIClient(function() {
    discover("embed", "v1").then(function() {
      it('should be constructable', function() {
        var x = new EmbeddedMenu(
          "AIzaSyAlKQb0_vGxIhaoWrK0D6aEhuVD3TJJSCE",
          "mm",
          "sacramento",
          "MASTER_ONLY");
      });

      it('should use a default view style of MASTER_ONLY', function() {
        var x = new EmbeddedMenu(
          "AIzaSyAlKQb0_vGxIhaoWrK0D6aEhuVD3TJJSCE",
          "mm",
          "sacramento",
          null);

        expect(x.partner).to.equal('mm');
        expect(x.location).to.equal('sacramento');
        expect(x.style).to.equal('MASTER_ONLY');
      });
    });
  });
});

describe('api.embed.EmbedAPI', function() {
  setupAPIClient(function() {
    discover("embed", "v1").then(function() {
      it('should expose the underlying API and version', function() {
        expect(EmbedAPI.serviceName).to.equal("embed");
        expect(EmbedAPI.serviceName).to.be.a("string");
      });

      it('should be constructable', function() {
        expect(new EmbedAPI("AIzaSyAlKQb0_vGxIhaoWrK0D6aEhuVD3TJJSCE")).to.be.a("object");
      });

      it('"view" should be constructable', function() {
        expect(new EmbedAPI("AIzaSyAlKQb0_vGxIhaoWrK0D6aEhuVD3TJJSCE").view("mm", "sacramento")).to.be.a("object");
      });

      it('"view" should be executable', function() {
        new EmbedAPI("AIzaSyAlKQb0_vGxIhaoWrK0D6aEhuVD3TJJSCE").view("mm", "sacramento", function(response) {
          expect(response).to.be.a("object");
          info("Test:EmbedAPI", "RPC method 'view' succeeded.");
        }, function(error) {
          throw "Error occurred: " + error;
        });
      });
    });
  });
});
