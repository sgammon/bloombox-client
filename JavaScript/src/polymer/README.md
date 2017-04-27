
# Bloombox API Client: Polymer

The Bloombox Client for JavaScript comes with special support for [Polymer](https://www.polymer-project.org/). We use
Polymer and the technologies surrounding it extensively at Bloombox, and, if you use it, too, we can plug into your
stack with in a particularly seamless fashion.

## Bower
```bash
bower install --save Bloombox/bloombox-api-client
```

## Options for integrating
There are two main options for talking to Bloombox from Polymer:
- Via the `bloombox-api-client` element, which will:
  - Load the client library scripts for you, if they aren't there
  - Initialize the library from declared properties in Polymer
- Via `BloomboxAPIClientBehavior`, which:
  - Leaves loading to the user, so as not to control the network connection
  - Does not initialize the library on behalf of the implementor
  - Exports its functionality into a contained `bloombox` property on the consuming element

### Usage

#### As an element
```html
<link rel="import" href="bower_components/bloombox-api-client/bloombox-api-client.html">

<!-- later... -->

<bloombox-api-client
  library="{{bloombox}}"
  api-key="abc123"
  partner="your-partner-name"
  location="your-location-name"></bloombox-api-client>
```

#### As a behavior
```html
<link rel="import" href="bower_components/bloombox-api-client/bloombox-api-client-behavior.html">

<dom-module id="sample-component">
  <template strip-whitespace>
    ... some template ...
  </template>

  <script type="text/javascript">
    let SampleComponent = Polymer({
      is: "sample-component",
      behaviors: [BloomboxAPIClientBehavior],
      
      properties: {
        ...
      },
      
      someMethodThatTalksToBloombox: function() {
        this.bloombox;  // < -- API client is available because of the behavior
      }
    });
  </script>
</dom-module>
```
