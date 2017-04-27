# Bloombox: Embed API Client for Java

## Overview

This is a client library bundle using Google Cloud Endpoints. In order to use this API client library in your project, you need to build the library using Maven or Gradle.

### Maven

Under the `Java/Embed/Maven` directory of the client bundle, run **_"mvn install"_** in the command console.

#### How to use API client library in a Maven project

<pre style="background-color: #eee;">
  &lt;dependency&gt;
    &lt;groupId&gt;io.bloombox&lt;/groupId&gt;
    &lt;artifactId&gt;bloombox-client-embedapi&lt;/artifactId&gt;
    &lt;version&gt;v1-1.22.0-SNAPSHOT&lt;/version&gt;
  &lt;/dependency&gt;
</pre>

**Step 2**: Add one of the following <dependency> sections to your **_pom.xml_** file, based on your platform (Android/App Engine/Servlet). Google Cloud Endpoints API client is compatible with all supported Java platforms (with minimum Java version 5).

*   **For Android**

<pre style="background-color: #eee;">
  &lt;dependency&gt;
    &lt;groupId&gt;com.google.api-client&lt;/groupId&gt;
    &lt;artifactId&gt;google-api-client-android&lt;/artifactId&gt;
    &lt;version&gt;1.22.0&lt;/version&gt;
  &lt;/dependency&gt;
</pre>

*   **For App Engine**

<pre style="background-color: #eee;">
  &lt;dependency&gt;
    &lt;groupId&gt;com.google.api-client&lt;/groupId&gt;
    &lt;artifactId&gt;google-api-client-appengine&lt;/artifactId&gt;
    &lt;version&gt;1.22.0&lt;/version&gt;
  &lt;/dependency&gt;
</pre>

*   **For Java Servlets**

<pre style="background-color: #eee;">
  &lt;dependency&gt;
    &lt;groupId&gt;com.google.api-client&lt;/groupId&gt;
    &lt;artifactId&gt;google-api-client-servlet&lt;/artifactId&gt;
    &lt;version&gt;1.22.0&lt;/version&gt;
  &lt;/dependency&gt;
</pre>

**Step 3**: Add one of the following <dependency> sections to your **_pom.xml_** file, or directly import AndroidJsonFactory into your Java source, based on your JsonFactory implementation (GSON/Jackson/AndroidJson).

*   **Using GsonFactory**

<pre style="background-color: #eee;">
  &lt;dependency&gt;
    &lt;groupId&gt;com.google.http-client&lt;/groupId&gt;
    &lt;artifactId&gt;google-http-client-gson&lt;/artifactId&gt;
    &lt;version&gt;1.22.0&lt;/version&gt;
  &lt;/dependency&gt;
</pre>

*   **Using JacksonFactory**

<pre style="background-color: #eee;">
  &lt;dependency&gt;
    &lt;groupId&gt;com.google.http-client&lt;/groupId&gt;
    &lt;artifactId&gt;google-http-client-jackson2&lt;/artifactId&gt;
    &lt;version&gt;1.22.0&lt;/version&gt;
  &lt;/dependency&gt;
</pre>

*   **Using AndroidJsonFactory (Android with minimum API level 11)**  
    For Android with minimum API level 11, import AndroidJsonFactory into your Java source.

<pre style="background-color: #eee;">  import com.google.api.client.extensions.android.json.AndroidJsonFactory;</pre>

**Step 4**: Refer to the "Creating the service object" and "Calling the API exposed by the Endpoint" sections of this [Endpoints Java Documentation](https://developers.google.com/appengine/docs/java/endpoints/consume_android) to see how to use the client library in Android.


### Gradle

Under the `Java/Embed/Gradle` directory of the client bundle, run **_"gradle install"_** in the command console. By running this command, this API client bundle would be build by Gradle, and be deployed to local Maven repository. (Gradle doesn't have native repository system, but could leverage repository systems like maven repository.)

#### How to use API client library in a Gradle project

**Step 1**: Add the following _compile_ section to your **_build.gradle_** file.

<pre style="background-color: #eee;">  compile ([group: 'io.bloombox', name: 'bloombox-client-embedapi', version: 'v1-1.22.0-SNAPSHOT'])
</pre>

**Step 2**: Add one of the following _compile_ sections to your **_build.gradle_** file, based on your platform (Android/App Engine/Servlet). Google Cloud Endpoints API client is compatible with all supported Java platforms (with minimum Java version 5).

*   **For Android**

    <pre style="background-color: #eee;">  compile ([group: 'com.google.api-client', name: 'google-api-client-android', version: '1.22.0'])
    </pre>

*   **For App Engine**

    <pre style="background-color: #eee;">  compile ([group: 'com.google.api-client', name: 'google-api-client-appengine', version: '1.22.0'])
    </pre>

*   **For Java Servlet**

    <pre style="background-color: #eee;">  compile ([group: 'com.google.api-client', name: 'google-api-client-servlet', version: '1.22.0'])
    </pre>

**Step 3**: Add one of the following _compile_ sections to your **_build.gradle_** file, or directly import AndroidJsonFactory into your Java source, based on your JsonFactory implementation (GSON/Jackson/AndroidJson).

*   **Using GsonFactory**

    <pre style="background-color: #eee;">  compile ([group: 'com.google.api-client', name: 'google-http-client-gson', version: '1.22.0'])
    </pre>

*   **Using JacksonFactory**

    <pre style="background-color: #eee;">  compile ([group: 'com.google.api-client', name: 'google-http-client-jackson2', version: '1.22.0'])
    </pre>

*   **Using AndroidJsonFactory (Android with minimum API level 11)**  
    For Andoird with minimum API level 11, import AndroidJsonFactory into your Java source.

    <pre style="background-color: #eee;">  import com.google.api.client.extensions.android.json.AndroidJsonFactory;
    </pre>

**Step 4**: Make sure local Maven repository is added to the repository section of **_build.gradle_** file.

<pre style="background-color: #eee;">  repositories {
    mavenCentral()
    **mavenLocal()**
  }
</pre>

**Step 5**: Refer to the "Creating the service object" and "Calling the API exposed by the Endpoint" sections of this [Endpoints Java Documentation](https://developers.google.com/appengine/docs/java/endpoints/consume_android) to see how to use the client library in Android.

