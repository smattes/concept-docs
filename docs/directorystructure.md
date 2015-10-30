## Directory Structure
CloudCoreo relies on convention over configuration for the most part, achieving simplicity and flexibility. Each repository can contain whatever you want, which is useful for running scripts or laying down solid code. There are some directories that we reserve the right to, and below you'll see a list of those directories and their functions.

The directory structure precisely relates to how CloudCoreo actually works. The convention we have defined dictates what gets overridden, what runs during the boot of a server, what runs as Cloud Services, and more.  The [CLI Tool](https://github.com/CloudCoreo/cloudcoreo-cli) will do much of the work for you, but you should still know what it all means. That's where this page, and the wealth of knowledge included in it, is going to come in handy. Read on!

### extends
`extends` is one of the most basic, but important, concepts in CloudCoreo. This directory enables you to **leverage the work of others** and bring it all within your own deployment. You can literally crowdsource your stack, which saves you oodles of time.

`extends` is the base for anything you are doing in this stack. **Any and all work defined in `extends` will be completed before moving on to the parent directory.**

### stack-*
Any subdirectory beginning with `stack-` is reserved in CloudCoreo. The work in these directories is completed after the `extends` directory (if it exists) but before anything else in the current repository. This makes it suitable to *add an external stack* to your stack.

When adding a stack, consider the needs of people *overriding* or *extending* your stack in the future. For instance, creating blank directories for dropping in bits of code and overrides will make everyone's life easier in the future. To help ease the administration efforts of creating these directories, use `stack-` in the CLI tool.

**But what does `stack-` do?!**

Say you want to add a stack from Git (github.com:example/tomcat.git) into your own stack and call it 'tomcat'. The ideal directory structure would require you to create a `stack-tomcat` directory to signify that it's special within the CloudCoreo framework. Next, create an `extends` directory inside that, and extend the stack into this directory. Now you are utilizing both concepts. Because you used a `stack-*` directory to the `<repository-dir>`, it will run **after** `<repository-dir>/extends`. Because you have added the stack to `<repository-dir>/stack-tomcat/extends` it will run **before** everything else inside the `stack-tomcat*` directory. Now, anyone utilizing your stack has a convenient place to insert configuration and setup between your stack and the added Tomcat stack.

### services
The `services` directory exists to define the stack's interaction with the cloud provider in which the server is launched; specifically, the `<repository-dir>/services/config.rb file`. This is in-depth enough to contain its own documentation section!

### boot-scripts
The `<repository-dir>/boot-scripts` directory exists to define boot time configuration of a server. If this directory exists, CloudCoreo will run scripts as defined by:

1. The directory layout (`extends`, `stack-*`, etc.)
1. Then the order defined in the `order.yaml` file within this directory

As an example, if your directory structure contains the following paths CloudCoreo will run each script in the `extends/stack-example/extends/boot-scripts/order.yaml` file before moving on to the `extends/stack-example/boot-scripts/order.yaml`:

* `extends/stack-example/extends/boot-scripts`
* `extends/stack-example/boot-scripts`

As a matter of fact, each of the scripts in the base directory can be overridden at any point.

### operational-scripts
The files contained within the `<repository-dir>/operational-scripts` directory are scripts you might want to run on an ad-hoc basis from the CloudCoreo GUI or CLI. The structure and scripts within this directory honor the order and overrides defined within the rest of this document.

### shutdown-scripts
The `<repository-dir>/shutdown-scripts` directory contains scripts that CloudCoreo will **attempt** to run. These are not guaranteed because many times failures are a complete loss of a system, with no warning whatsoever. The structure and scripts within this directory honor the order and overrides defined within the rest of this document.

### overrides
Anything contained in this directory will act as an override for the stack in which it is contained.

The paths should be considered relative to the parent of this directory.

If you have a directory structure like this...

```
+-- parent
|   +-- overrides
|   |   +-- stack-a
|   |   |   +-- boot-scripts
|   |   |   |   +-- order.yaml
|   +-- stack-a
|   |   +-- boot-scripts
|   |   |   +-- order.yaml
```
The `order.yaml` file will be ignored in the `stack-a directory`, and instead the `overrides/stack-a order.yaml` file will be used, because the directory structure within the override directory matches the structure of the parent.
