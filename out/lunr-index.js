
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



documentTitles["configurationfiles.html#configuration-files"] = "Configuration Files";
index.add({
    url: "configurationfiles.html#configuration-files",
    title: "Configuration Files",
    body: "## Configuration Files There are a few configuration files that exist in the CloudCoreo convention. These files are all overrideable.  "
});

documentTitles["configurationfiles.html#variable-config"] = "Variable Config";
index.add({
    url: "configurationfiles.html#variable-config",
    title: "Variable Config",
    body: "### Variable Config Defined by the `config.yaml` file.  The `config.yaml` file defines variables for the stack. It resides in the `&lt;repository-dir&gt;` base directory. These are exposed in the UI to any user who is utilizing the stack. The yaml file **cannot contain tab characters**. Although the CloudCoreo CLI does work to mitigate this mistake, we must stress this can cause your stack to break.  "
});

documentTitles["configurationfiles.html#cloud-services-config"] = "Cloud Services Config";
index.add({
    url: "configurationfiles.html#cloud-services-config",
    title: "Cloud Services Config",
    body: "### Cloud Services Config Defined by the `config.rb` file.  The `config.rb` file resides in the `&lt;repository-dir&gt;/services` directory and exists to define interactions within the cloud provider in which you are operating. The [API Documentation](http://docs.cloudcoreo.com/docs/frames/index) provides specifics.  We define a ***resource*** as the actual cloud service you are interacting with, such as a *Route53* entry or *Autoscaling Group*. Resources are defined by the desired configuration within your cloud provider account. In general, the structure is: ``` &lt;resource&gt; \&quot;&lt;name&gt;\&quot; do     &lt;property1&gt; &lt;value&gt;     &lt;property2&gt; &lt;value&gt;     &lt;property3&gt; &lt;value&gt;     &lt;property4&gt; &lt;value&gt; end ``` For Example: ``` coreo_aws_vpc_vpc \&quot;my-vpc\&quot; do   action :sustain   cidr \&quot;12.0.0.0/16\&quot;   internet_gateway true end ``` In the above example, CloudCoreo would create a VPC with the CIDR address of \&quot;12.0.0.0/16\&quot; and attach an *internet gateway* to the VPC to allow traffic to the public subnets (which haven't been defined in this specific example).  This is all very inflexible in terms of cloning, which is why ***templating*** has been built into the system.  "
});

documentTitles["configurationfiles.html#templating-system"] = "Templating System";
index.add({
    url: "configurationfiles.html#templating-system",
    title: "Templating System",
    body: "#### Templating System Templateing allows variables to be inserted into the system at runtime, thus allowing a single template to be used in many different environements. The substitution comes from one of:  1. The value provided by the user in the CloudCoreo UI 1. The values set during the run of the CLI tool 1. The default set in the config.yaml file  This is the order in which they are applied. e.g. If there is no UI or CLI variable set, CloudCoreo will apply the default.  The look of the variables is similar to *bash* but many of the bash-isms to not apply. Use a variable as follows `${VARIABLE_NAME}`. For instance, the above example of creating a VPC would be more useful with the following templating. ``` coreo_aws_vpc_vpc \&quot;${VPC_NAME}\&quot; do   action :sustain   cidr \&quot;${VPC_CIDR}\&quot;   internet_gateway true end ``` Within your config.yaml file, you can now call out a `VPC_NAME` variable and apply defaults. This variable name will show up in the web UI for any users to modify. "
});

documentTitles["configurationfiles.html#overriding-resources"] = "Overriding Resources";
index.add({
    url: "configurationfiles.html#overriding-resources",
    title: "Overriding Resources",
    body: "#### Overriding Resources The `services/` directory honors the heirarchy we have discussed elsewhere. The difference, however, is that in the `config.rb` file each ***resource*** is overridable on an individual basis. This is best explained with an example.  Lets say we have the following directory structure and files:  * `&lt;repository-dir&gt;/extends/services/config.rb` and * `&lt;repository-dir&gt;/services/config.rb`  We know from that anything in the `extends/services` directory will be run ***before*** the root `services` directory. This is true, however the resources are compiled before running. What does this mean?  **Any *resource* in the root level `services/config.rb` file will override any *resource* located in the `extends/services/config.rb` file, where the key is the `&lt;resource&gt; \&quot;&lt;name&gt;\&quot; do` line.** This still adheres to our previous rule we have been discussing in an interesting way. Since the resources are effectively keys, as we get closer and close to the root, the keys are added to the compilation stack in order, thus overwriting (overriding) the previously added resources.   Once again, an example will work much better for this description.  Take, for instance, the directory and file structure we have already described:  * `&lt;repository-dir&gt;/extends/services/config.rb` and * `&lt;repository-dir&gt;/services/config.rb`  Lets assume we have a ***VPC*** resource in the `extends/services/config.rb` file as follows: ``` coreo_aws_vpc_vpc \&quot;${VPC_NAME}\&quot; do   action :sustain   cidr \&quot;12.0.0.0/16\&quot;   internet_gateway true end ``` This doesn't do us any good because we can't clone this to different environments. We need to have templating and variables, and we want to add some tags to the VPC. We can override this resource by keying off the `&lt;resource&gt; \&quot;&lt;name&gt;\&quot; do` line and placing the new block in the root `services/config.rb` file. So, within the `&lt;repository-dir&gt;/services/config.rb` file we call out a new ***VPC*** as follows: ``` coreo_aws_vpc_vpc \&quot;${VPC_NAME}\&quot; do   action :sustain   cidr \&quot;${VPC_CIDR}\&quot;   internet_gateway true   tags [      \&quot;Name=${VPC_NAME_TAG}\&quot;,      \&quot;Team=${VPC_TEAM}\&quot;   ] end ``` The point of this is that the *key* is the first line, in this case `coreo_aws_vpc_vpc \&quot;${VPC_NAME}\&quot; do`. This means that as CloudCoreo is compiling the resources, it will see the ***VPC*** resource in the root ***last*** and will replace any existing blocks with this same resource key. The important part is that CloudCoreo will honor the positioning of the resources that it is overriding and simply override the block. We call this ***anchoring***.  "
});

documentTitles["configurationfiles.html#anchoring"] = "Anchoring";
index.add({
    url: "configurationfiles.html#anchoring",
    title: "Anchoring",
    body: "#### Anchoring Anchoring is what CloudCoreo does with overridden resources. The key (`&lt;resource&gt; \&quot;&lt;name&gt;\&quot; do`) that is being overriden becomes an anchor for all pre-requisite resources found in an overriding file. That's a mouthful. Here's an abstract example. Please do not pay attention to the blocks because they are irrelevant and shortened for clarity.  Begin again with our standard directory struture we have been using:  * `&lt;repository-dir&gt;/extends/services/config.rb` and * `&lt;repository-dir&gt;/services/config.rb`  In our `extends/services/config.rb` file we will have a ***subnet definition*** and an ***elastic load balancer***. ``` coreo_aws_vpc_subnet 'public-subnet' do    vpc 'my-vpc'    map_public_ip_on_launch true end  coreo_aws_ec2_elb 'my-elb' do    type 'public'    subnet 'public-subnet' end ``` We decide this is not adequate. First of all we want the elb to contain a security group and we want it to be an `internal` load balancer and not public. To achieve this we move to our root `services/config.rb` file and add our key resource. This will become an anchor and we can modify anything other than the key itself. ``` coreo_aws_ec2_elb 'my-elb' do    type 'internal'    subnet 'private-subnet'    security_groups ['my-elb-sg'] end ``` This one is modified correctly, but we are missing some pieces, namely the private subnet and the security groups. We re-edit our file knowing our anchor bring the pieces along that it requires. Our new root-level `services/config.rb` file looks as follows. ``` coreo_aws_vpc_subnet 'private-subnet' do    vpc 'my-vpc'    map_public_ip_on_launch false end  coreo_aws_ec2_securityGroup 'my-elb-sg' do    vpc 'my-vpc'    allows [              {                :direction =&gt; :ingress,               :protocol =&gt; :tcp,               :ports =&gt; ${INGRESS_PORTS},               :cidrs =&gt; ${INGRESS_CIDRS}             }           ] end  coreo_aws_ec2_elb 'my-elb' do    type 'internal'    subnet 'private-subnet'    security_groups ['my-elb-sg'] end ```  The ***anchor*** in this is the elb resource. What this means is that anything above that has not already overridden something will be considered a prerequisite of the resource doing the overrideing (the key). This means that the root level `services/config.rb` file's coreo_aws_ec2_elb resource block will override the one found in the `extends/services/config.rb` file. Not only that, but all the resources above the key in the root level will maintain order and override with the key. The final compliation will be a merge of the two files with the *anchor* located in the same place as the orriginal, with any other non-overriding resources preceding it from the overriding file. Here is what the compiled version would become. ``` coreo_aws_vpc_subnet 'public-subnet' do    vpc 'my-vpc'    map_public_ip_on_launch true end  coreo_aws_vpc_subnet 'private-subnet' do    vpc 'my-vpc'    map_public_ip_on_launch false end  coreo_aws_ec2_securityGroup 'my-elb-sg' do    vpc 'my-vpc'    allows [              {                :direction =&gt; :ingress,               :protocol =&gt; :tcp,               :ports =&gt; ${INGRESS_PORTS},               :cidrs =&gt; ${INGRESS_CIDRS}             }           ] end  coreo_aws_ec2_elb 'my-elb' do    type 'internal'    subnet 'private-subnet'    security_groups ['my-elb-sg'] end ``` The '*public-subnet*' resource has been included from the `extends/services/config.rb` file, while the '*my-elb*' from the `extends/services/config.rb` essentially *becomes* the '*private-subnet*' + '*my-elb-sg*' + '*my-elb*'.  "
});

documentTitles["configurationfiles.html#script-order"] = "Script Order";
index.add({
    url: "configurationfiles.html#script-order",
    title: "Script Order",
    body: "### Script Order Defined by the `order.yaml` file is the configuration file that travels along with and is located in the `boot-scripts` directory. The format is *yaml* which means that **tab indentations are an error**. Here is an example: ``` order:     - install_packges.sh     - run_chef.sh ``` CloudCoreo will run (as root) each script in order. The proccess is to **chmod +x** the files and run with a **./&lt;filename&gt;** so make sure the shebang is correct."
});



documentTitles["cloudservices.html#cloud-services"] = "Cloud Services";
index.add({
    url: "cloudservices.html#cloud-services",
    title: "Cloud Services",
    body: "## Cloud Services This is all about services and thats all seriously - yep"
});


