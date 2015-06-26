# Stack Anatomy
'Stack' is, admittedly, very much an over used term in our industry. It seems that for some reason, everyone is quick to redefine it. 

...and we are no different!

A 'stack' for us is everything in your cloud deployment. ***Virtual Machines*** are a given, but we include *everything else* as well. What does *everything else* actually mean? Well, *everything*.

* Networks
* Managed Services
  * Databases
  * Search
  * Queues
  * Email services
  * Transcoding
  * etc.
* Hard Drives
* Network Cards
* DNS Entries
* Scaling Policies

The list goes on and on.

To create or maintain a `stack` in CloudCoreo, you have to know how it is all set up. When you see it all spelled out, it is really quite simple. The following is our attempt to spell it out.

## Directory Structure
CloudCoreo relies on convention over configuration for the most part. Each repository can contain whatever you like, which is useful for running scripts or laying down code you rely on. There are some directories that we reserve the right to, and this is a list of those directories as well as what they do.

The directory structure has much to do with how CloudCoreo works. The convention we have defined dictates what gets overridden, what runs during boot of a server, what runs as Cloud Services, etc. The [CLI Tool](https://github.com/CloudCoreo/cloudcoreo-cli) will do much of the work for you, but you should still know what it all means.

### extends
The `extends` directory is one of the most basic but important concepts in CloudCoreo. This is how you are able to **leverage the work of others** and bring it all within your own deployment.

The simple way to think about `extends` is as the base for anything you are doing in this stack. In other words, **any and all work defined in `extends` will be completed before moving on to the parent directory**.

### stack-*
Any subdirectory beginning with `stack-` is reserved in CloudCoreo. The work in these directories is completed **after** the `extends` directory (if it exists) but before anything else in the current repository. This makes it suitable to *add an external stack* to your stack.

When adding a stack, you must be considerate of the future needs of people *overriding* and *extending* and/or extending your stack. This actually doesn't mean anything other than the fact that you can make everyones life easier in the future by creating blank directories in which they can add their own bits of code and overrides. In order to ease the administration efforts of creating these directories, the CLI tool does the following with the `stack-`. 

#### What does this all mean? An example
Lets assume you want to add a stack from git (github.com:example/tomcat.git) into your own and call it `tomcat`. The directory structure that would ease this for future use is to create a `stack-tomcat` directory to signify it is special within the CloudCoreo framework. Next, create an `extends` directory inside and extend the stack into this directory. This is actually utilizing both concepts. Because you have used a `stack-*` directory to the `<repository-dir>`, it will get run **after** the `<repository-dir>/extends`. Because you have added the stack to the `<repository-dir>/stack-tomcat/extends` it will run **before** everything else inside the `stack-tomcat* directory. This gives anyone utilizing your stack a convenient place to insert configuration and setup between your stack and the added tomcat stack.

### services
The `services` directory exists to define the stack's interaction with the cloud provider in which the server is launched. Specifically, the `<repository-dir>/services/config.rb` file. This is in-depth enough to contain its own documentation section.

### boot-scripts
The `<repository-dir>/boot-scripts` directory exists to define boot time configuration of a server. If this directory exists, CloudCoreo will run scripts as defined by:

1. The directory layout (extends, stack-*, etc.) 
1. and then the order defined in the `order.yaml` file within this directory.

For instance, if your directory structure contains the following paths:
* `extends/stack-example/extends/boot-scripts`
and
* `extends/stack-example/boot-scripts`
CloudCoreo will run each script in the `extends/stack-example/extends/boot-scripts/order.yaml` file **before** moving on to the `extends/stack-example/boot-scripts/order.yaml`. As a matter of fact, each of the scripts in the base directory can be overridden at any point.

### operational-scripts
The files contained within the `<repository-dir>/operational-scripts` directory are scripts you would like to be able to run on an ad-hoc basis from the CloudCoreo GUI or CLI. The structure and scripts within this directory honor the order and overrides defined within the rest of this document.

### shutdown-scripts
The `<repository-dir>/shutdown-scripts` directory contains scripts that CloudCoreo will **attempt** to run. These are not guaranteed because many times failures are a complete loss of a system with no warning. The structure and scripts within this directory honor the order and overrides defined within the rest of this document.

### overrides
Anything contained in this directory will act as an override for the stack in which it is contained.

The paths should be considered relative to the parent of this directory.

For example, if you have a directory structure like this, 
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
Because the directory structure within the override directory matches the structure of the parent, the 'order.yaml' file will be ignored in the stack-a directory and instead the overrides/stack-a order.yaml file will be used.


## Configuration Files
There are a few configuration files that exist in the CloudCoreo convention. These files are all override-able.

### Variable Config
Defined by the `config.yaml` file.

The `config.yaml` file defines variables for the stack. It resides in the `<repository-dir>` base directory. These are exposed in the UI to any user who is utilizing the stack. The yaml file **cannot contain tab characters**. Although the CloudCoreo CLI does work to mitigate this mistake, we must stress this can cause your stack to break.

### Script Order
Defined by the `order.yaml` file is the configuration file that travels along with and is located in the `boot-scripts` directory. The format is *yaml* which means that **tab indentations are an error**. Here is an example:
```
order:
    - install_packages.sh
    - run_chef.sh
```
CloudCoreo will run (as root) each script in order. The process is to **chmod +x** the files and run with a **./<filename>** so make sure the shebang is correct.

## Cloud Services
Defined by the `config.rb` file.

The `config.rb` file resides in the `<repository-dir>/services` directory and exists to define interactions within the cloud provider in which you are operating. The [API Documentation](http://docs.cloudcoreo.com/docs/frames/index) provides specifics.

We define a ***resource*** as the actual cloud service you are interacting with, such as a *Route53* entry or *Autoscaling Group*. Resources are defined by the desired configuration within your cloud provider account.
In general, the structure is:
```
<resource> "<name>" do
    <property1> <value>
    <property2> <value>
    <property3> <value>
    <property4> <value>
end
```
For Example:
```
coreo_aws_vpc_vpc "my-vpc" do
  action :sustain
  cidr "12.0.0.0/16"
  internet_gateway true
end
```
In the above example, CloudCoreo would create a VPC with the CIDR address of "12.0.0.0/16" and attach an *internet gateway* to the VPC to allow traffic to the public subnets (which haven't been defined in this specific example).

This is all very inflexible in terms of cloning, which is why ***templating*** has been built into the system.

### Templating System
Templating allows variables to be inserted into the system at runtime, thus allowing a single template to be used in many different environments. The substitution comes from one of:

1. The value provided by the user in the CloudCoreo UI
1. The values set during the run of the CLI tool
1. The default set in the config.yaml file

This is the order in which they are applied. e.g. If there is no UI or CLI variable set, CloudCoreo will apply the default.

The look of the variables is similar to *bash* but many of the bash-isms to not apply. Use a variable as follows `${VARIABLE_NAME}`. For instance, the above example of creating a VPC would be more useful with the following templating.
```
coreo_aws_vpc_vpc "${VPC_NAME}" do
  action :sustain
  cidr "${VPC_CIDR}"
  internet_gateway true
end
```
Within your config.yaml file, you can now call out a `VPC_NAME` variable and apply defaults. This variable name will show up in the web UI for any users to modify.
### Overriding Resources
The `services/` directory honors the hierarchy we have discussed elsewhere. The difference, however, is that in the `config.rb` file each ***resource*** is over-ridable on an individual basis. This is best explained with an example.

Lets say we have the following directory structure and files:

* `<repository-dir>/extends/services/config.rb`
and
* `<repository-dir>/services/config.rb`

We know from that anything in the `extends/services` directory will be run ***before*** the root `services` directory. This is true, however the resources are compiled before running. What does this mean?

**Any *resource* in the root level `services/config.rb` file will override any *resource* located in the `extends/services/config.rb` file, where the key is the `<resource> "<name>" do` line.** This still adheres to our previous rule we have been discussing in an interesting way. Since the resources are effectively keys, as we get closer and close to the root, the keys are added to the compilation stack in order, thus overwriting (overriding) the previously added resources. 

Once again, an example will work much better for this description.

Take, for instance, the directory and file structure we have already described:

* `<repository-dir>/extends/services/config.rb`
and
* `<repository-dir>/services/config.rb`

Lets assume we have a ***VPC*** resource in the `extends/services/config.rb` file as follows:
```
coreo_aws_vpc_vpc "${VPC_NAME}" do
  action :sustain
  cidr "12.0.0.0/16"
  internet_gateway true
end
```
This doesn't do us any good because we can't clone this to different environments. We need to have templating and variables, and we want to add some tags to the VPC. We can override this resource by keying off the `<resource> "<name>" do` line and placing the new block in the root `services/config.rb` file. So, within the `<repository-dir>/services/config.rb` file we call out a new ***VPC*** as follows:
```
coreo_aws_vpc_vpc "${VPC_NAME}" do
  action :sustain
  cidr "${VPC_CIDR}"
  internet_gateway true
  tags [
     "Name=${VPC_NAME_TAG}",
     "Team=${VPC_TEAM}"
  ]
end
```
The point of this is that the *key* is the first line, in this case `coreo_aws_vpc_vpc "${VPC_NAME}" do`. This means that as CloudCoreo is compiling the resources, it will see the ***VPC*** resource in the root ***last*** and will replace any existing blocks with this same resource key. The important part is that CloudCoreo will honor the positioning of the resources that it is overriding and simply override the block. We call this ***anchoring***.

### Anchoring
Anchoring is what CloudCoreo does with overridden resources. The key (`<resource> "<name>" do`) that is being overridden becomes an anchor for all pre-requisite resources found in an overriding file. That's a mouthful. Here's an abstract example. Please do not pay attention to the blocks because they are irrelevant and shortened for clarity.

Begin again with our standard directory structure we have been using:

* `<repository-dir>/extends/services/config.rb`
and
* `<repository-dir>/services/config.rb`

In our `extends/services/config.rb` file we will have a ***subnet definition*** and an ***elastic load balancer***.
```
coreo_aws_vpc_subnet 'public-subnet' do
   vpc 'my-vpc'
   map_public_ip_on_launch true
end

coreo_aws_ec2_elb 'my-elb' do
   type 'public'
   subnet 'public-subnet'
end
```
We decide this is not adequate. First of all we want the elb to contain a security group and we want it to be an `internal` load balancer and not public. To achieve this we move to our root `services/config.rb` file and add our key resource. This will become an anchor and we can modify anything other than the key itself.
```
coreo_aws_ec2_elb 'my-elb' do
   type 'internal'
   subnet 'private-subnet'
   security_groups ['my-elb-sg']
end
```
This one is modified correctly, but we are missing some pieces, namely the private subnet and the security groups. We re-edit our file knowing our anchor bring the pieces along that it requires. Our new root-level `services/config.rb` file looks as follows.
```
coreo_aws_vpc_subnet 'private-subnet' do
   vpc 'my-vpc'
   map_public_ip_on_launch false
end

coreo_aws_ec2_securityGroup 'my-elb-sg' do
   vpc 'my-vpc'
   allows [ 
            { 
              :direction => :ingress,
              :protocol => :tcp,
              :ports => ${INGRESS_PORTS},
              :cidrs => ${INGRESS_CIDRS}
            }
          ]
end

coreo_aws_ec2_elb 'my-elb' do
   type 'internal'
   subnet 'private-subnet'
   security_groups ['my-elb-sg']
end
```

The ***anchor*** in this is the elb resource. What this means is that anything above that has not already overridden something will be considered a prerequisite of the resource doing the overriding (the key). This means that the root level `services/config.rb` file's coreo_aws_ec2_elb resource block will override the one found in the `extends/services/config.rb` file. Not only that, but all the resources above the key in the root level will maintain order and override with the key. The final compilation will be a merge of the two files with the *anchor* located in the same place as the original, with any other non-overriding resources preceding it from the overriding file. Here is what the compiled version would become.
```
coreo_aws_vpc_subnet 'public-subnet' do
   vpc 'my-vpc'
   map_public_ip_on_launch true
end

coreo_aws_vpc_subnet 'private-subnet' do
   vpc 'my-vpc'
   map_public_ip_on_launch false
end

coreo_aws_ec2_securityGroup 'my-elb-sg' do
   vpc 'my-vpc'
   allows [ 
            { 
              :direction => :ingress,
              :protocol => :tcp,
              :ports => ${INGRESS_PORTS},
              :cidrs => ${INGRESS_CIDRS}
            }
          ]
end

coreo_aws_ec2_elb 'my-elb' do
   type 'internal'
   subnet 'private-subnet'
   security_groups ['my-elb-sg']
end
```
The '*public-subnet*' resource has been included from the `extends/services/config.rb` file, while the '*my-elb*' from the `extends/services/config.rb` essentially *becomes* the '*private-subnet*' + '*my-elb-sg*' + '*my-elb*'.

### API Docs
If you are working on services within CloudCoreo, you need to know what options, parameters etc you can use. For those head over to our [API Documentation](http://docs.cloudcoreo.com/docs/frames/index).

## Variables
Documentation on the usage of template variables is **Coming Soon!!**


# CloudCoreo CLI
======================================================================

## Install

Installation of the [CloudCoreo](http://www.cloudcoreo.com/) CLI tool is simple and managed via NPM. For a global install (recommended) run:

```
npm install -g cloudcoreo-cli
```

## Commands

The following is a list of commands that can be run with the CLI tool. This is auto-generated.

##### Options

```
-h, --help output usage information
-V, --version output the version number
```

The [CloudCoreo](http://www.cloudcoreo.com/) CLI uses git-style subcommands.
For help, try:
```
coreo help <command>
```
or
```
coreo <command> help <subcommand>
```

### coreo init

The init command houses everything necessary to create new AppStacks
#### Options

```
-h, --help output usage information
-V, --version output the version number
-D, --directory <fully-qualified-path> the working directory
```
#### Actions

##### Action: new-stack

  new description

###### Options:

```
-h, --help output usage information
-s, --stack-type <stack type> What will this stack be? (server | stack)
```
###### Examples:

```

Excluding the -D (--directory) option assumes your working directory is
where your AppStack exists

$ coreo init new-stack -s server
$ coreo init new-stack --stack-type stack
```

### coreo stack

Subcommands and Actions housed within the stack command will handle all types of AppStack manipulation
#### Options

```
-h, --help output usage information
-V, --version output the version number
-D, --directory <fully-qualified-path> the working directory
```
#### Actions

##### Action: add

  Add a sibling stack

###### Options:

```
-h, --help output usage information
-s, --stack-type <stack type> What will this stack be? (server | stack)
-n, --stack-name <stack name> The name you would like to give to the sibling stack
-g, --from-git <git ssh url> The git ssh url from which this stack will be extended.
```
###### Examples:

```

Excluding the -D (--directory) option assumes your working directory is
where your AppStack exists

This command will add a VPN server to your AppStack

$ coreo stack add -s "server" -g "git@github.com:CloudCoreo/servers-vpn.git" -n "vpn"
$ coreo stack add --stack-type "server" --from-git "git@github.com:CloudCoreo/servers-vpn.git" -stack-name "vpn"
```
##### Action: extend

  Extend a stack

###### Options:

```
-h, --help output usage information
-g, --from-git <git ssh url> The git ssh url from which this stack will be extended.
```
###### Examples:

```

Excluding the -D (--directory) option assumes your working directory is
where your AppStack exists

This command will set your AppStack up to extend the CloudCoreo VPC

$ coreo stack extend -g git@github.com:cloudcoreo/cloudcoreo-vpc
```

### coreo account

work on a CloudCoreo Account
#### Options

```
-h, --help output usage information
-V, --version output the version number
```
#### Actions

##### Action: create

  create a new CloudCoreo account

###### Options:

```
-h, --help output usage information
-u, --username <username> What username to use on your new account
-e, --email <email> What email address to use on your new account
```
###### Examples:

```

This will create a new CloudCoreo account and key pairs
which can be used for accessing your account via the CLI tool.

The CLI tool will create a $HOME/.cloudcoreo directory and add a
config file with a JSON representation of the key pair and your username

$ coreo account create -u my_new_username -e me@example.com
```

### coreo solo

run processes on a stack without a CloudCoreo Account
#### Options

```
-h, --help output usage information
```
#### Actions

##### Action: run

  create a new CloudCoreo account

###### Options:

```
-h, --help output usage information
-p, --profile <profile> the CloudCoreo profile to use. if it does not exist, it will be created and associated with the cloud account
-a, --access-key-id <access-key-id> What amazon aws access key id to use
-e, --secret-access-key <secret-access-key> The secret access key associated with the corresponding access key id
-r, --region <region> The region in which this should be launched. If nothing is specified, it will look to launch in the default region supplied by a aws cli config file. If there is no cli config specified, an error will occur.
```
###### Examples:

```

This will create a new CloudCoreo account and key pairs
which can be used for accessing your account via the CLI tool.

The CLI tool will create a $HOME/.cloudcoreo directory and add a
config file with a JSON representation of the key pair and your username

$ coreo account create -u my_new_username -e me@example.com
```

# The Web UI
Documentation for how to use the web interface is **Coming Soon!!**
