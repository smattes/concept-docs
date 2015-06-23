
var index = lunr(function () {
    this.field('body');
    this.ref('url');
});

var documentTitles = {};



documentTitles["directorystructure.html#directory-structure"] = "Directory Structure";
index.add({
    url: "directorystructure.html#directory-structure",
    title: "Directory Structure",
    body: "## Directory Structure CloudCoreo relies on convention over configuartaion for the most part. Each repository can contain whatever you like, which is useful for running scripts or laying down code you rely on. There are some directories that we reserve the right to, and this is a list of those directories as well as whay they do.  The directory structure has much to do with how CloudCoreo works. The convention we have defined dictates what gets overridden, what runs during boot of a server, what runs as Cloud Services, etc. The [CLI Tool](https://github.com/CloudCoreo/cloudcoreo-cli) will do much of the work for you, but you should still know what it all means.  "
});

documentTitles["directorystructure.html#extends"] = "extends";
index.add({
    url: "directorystructure.html#extends",
    title: "extends",
    body: "### extends The `extends` directory is one of the most basic but importanct concepts in CloudCoreo. This is how you are able to **leverage the work of others** and bring it all within your own deployment.  The simple way to think about `extends` is as the base for anything you are doing in this stack. In other words, **any and all work defined in `extends` will be completed before moving on to the parent directory**.  "
});

documentTitles["directorystructure.html#stack-"] = "stack-*";
index.add({
    url: "directorystructure.html#stack-",
    title: "stack-*",
    body: "### stack-* Any subdirectory begining with `stack-` is reserved in CloudCoreo. The work in these directories is completed **after** the `extends` directory (if it exists) but before anything else in the current repository. This makes it suitable to *add an external stack* to your stack.  When adding a stack, you must be considerate of the future needs of people *overriding* and *extending* and/or extending your stack. This actually doesn't mean anything other than the fact that you can make everyones life easier in the future by creating blank directories in which they can add their own bits of code and overrides. In order to ease the administration efforts of creating these directories, the CLI tool does the following with the `stack-`.   "
});

documentTitles["directorystructure.html#what-does-this-all-mean-an-example"] = "What does this all mean? An example";
index.add({
    url: "directorystructure.html#what-does-this-all-mean-an-example",
    title: "What does this all mean? An example",
    body: "#### What does this all mean? An example Lets assume you want to add a stack from git (github.com:example/tomcat.git) into your own and call it `tomcat`. The directory structure that would ease this for future use is to create a `stack-tomcat` directory to signify it is special within the CloudCoreo framework. Next, create an `extends` directory inside and extend the stack into this directory. This is actually utilizing both concepts. Because you have used a `stack-*` directory to the `&lt;repository-dir&gt;`, it will get run **after** the `&lt;repository-dir&gt;/extends`. Because you have added the stack to the `&lt;repository-dir&gt;/stack-tomcat/extends` it will run **before** everything else inside the `stack-tomcat* directory. This gives anyone utilizing your stack a conveninent place to insert configuration and setup between your stack and the added tomcat stack.  "
});

documentTitles["directorystructure.html#services"] = "services";
index.add({
    url: "directorystructure.html#services",
    title: "services",
    body: "### services The `services` directory exists to define the stack's interaction with the cloud provider in which the server is launched. Specifically, the `&lt;repository-dir&gt;/services/config.rb` file. This is in-depth enough to contain its own documentation section.  "
});

documentTitles["directorystructure.html#boot-scripts"] = "boot-scripts";
index.add({
    url: "directorystructure.html#boot-scripts",
    title: "boot-scripts",
    body: "### boot-scripts The `&lt;repository-dir&gt;/boot-scripts` directory exists to define boot time configuration of a server. If this directory exists, CloudCoreo will run scripts as defined by:  1. The directory layout (extends, stack-*, etc.)  1. and then the order defined in the `order.yaml` file within this directory.  For instance, if your directory structure contains the following paths: * `extends/stack-example/extends/boot-scripts` and * `extends/stack-example/boot-scripts` CloudCoreo will run each script in the `extends/stack-example/extends/boot-scripts/order.yaml` file **before** moving on to the `extends/stack-example/boot-scripts/order.yaml`. As a matter of fact, each of the scripts in the base directory can be overridden at any point.  "
});

documentTitles["directorystructure.html#operational-scripts"] = "operational-scripts";
index.add({
    url: "directorystructure.html#operational-scripts",
    title: "operational-scripts",
    body: "### operational-scripts The files contained within the `&lt;repository-dir&gt;/operational-scripts` directory are scripts you would like to be able to run on an ad-hoc basis from the CloudCoreo GUI or CLI. The structure and scripts within this directory honor the order and overrides defined within the rest of this document.  "
});

documentTitles["directorystructure.html#shutdown-scripts"] = "shutdown-scripts";
index.add({
    url: "directorystructure.html#shutdown-scripts",
    title: "shutdown-scripts",
    body: "### shutdown-scripts The `&lt;repository-dir&gt;/shutdown-scripts` directory contains scripts that CloudCoreo will **attempt** to run. These are not gaurenteed because many times failures are a complete loss of a system with no warning. The structure and scripts within this directory honor the order and overrides defined within the rest of this document.  "
});

documentTitles["directorystructure.html#overrides"] = "overrides";
index.add({
    url: "directorystructure.html#overrides",
    title: "overrides",
    body: "### overrides Anything contained in this directory will act as an override for the stack in which it is contained.  The paths should be considered relative to the parent of this directory.  For example, if you have a directory structure like this,  ``` +-- parent |   +-- overrides |   |   +-- stack-a |   |   |   +-- boot-scripts |   |   |   |   +-- order.yaml |   +-- stack-a |   |   +-- boot-scripts |   |   |   +-- order.yaml ``` Because the directory structure within the override directory matches the structure of the parent, the 'order.yaml' file will be ignored in the stack-a directory and instead the overrides/stack-a order.yaml file will be used.  "
});



documentTitles["cloudservices.html#cloud-services"] = "Cloud Services";
index.add({
    url: "cloudservices.html#cloud-services",
    title: "Cloud Services",
    body: "## Cloud Services This is all about services and thats all seriously - yep"
});


