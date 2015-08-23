## Variables

The root directory can contain a `config.yaml` file to define variables for use in the stack. Variables allow a user to create many copies of CloudCoreo stacks without creating conflict (unless conflict is desired of course). There are a number of properties that can be set. Here is an example `config.yaml` file:
```
variables:
  MY_DNS_ZONE:
    default: cloudcoreo.com
    description: this dns zone variable is used for setting up route53 entries
    required: true
    type: string
    overrides:
      - stack-tomcat:DNS_ZONE
  SWAP_SIZE_IN_GB:
    default: 2
    description: create a swap file of this size in gigabytes
    required: false
    type: number
  SERVER_AMI:
    description: the ami to launch
    switch: INSTANCE::region
    cases:
      us-east-1: ami-1ecae776
      us-west-1: ami-d114f295
      us-west-2: ami-e7527ed7
    type: case
```
### property: default
### property: description
### property: required
### property: overrides
Overrides allow you to effective take ownership of or rename the a variable used in extended stacks. This is useful if your stack includes multiple of the same stack but you wish the variables to be set differently. This is best explained by an example.

Take, for instance, the following stack structure. `my-stack` is the stack im creating, and i've added the same stack twice for some reason, perhaps a web server and a scheduler. The directory structure might look like this:
```
my-stack/
├── config.yaml
├── stack-scheduler
│   └── config.yaml
└── stack-webserver
    └── config.yaml
```
where both of these `stack-*` directories are pointers to the exact same stack.

Now lets look at the `config.yaml` in the `stack-*` directories. Knowing that each of these stacks are identical, we know that the `config.yaml` files are identical. Here it is:
```
variables:
  DNS_ENTRY:
    default: my-server.example.com
    required: true
    type: string
    description: this is the dns record to assign to the server
```

Adding the `DNS_ENTRY` variable to your top level `config.yaml` file that is under your control allows you to override all of the `DNS_ENTRY` values below you. This is global though, meaning that it will change **both** the stack-scheduler value as well as the stack-webserver value and anything below them.

What will happen here is both stacks will get the same variable, which is not good in this case. Assuming this variable is used to manage DNS, it means that the dns records will stomp on eachother and one will end up not having an entry. 

We can't have that. The answer is `overrides
### property: type
#### string
The string type is fairly self-explainitory
#### number
#### case


### Instance Variables
### Stack Variables