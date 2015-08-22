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
### Types
#### string
#### number
#### case


### Instance Variables
### Stack Variables