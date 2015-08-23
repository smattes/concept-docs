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

Take, for instance, the following stack structure. `my-stack` is the the one im creating, and i've 'added' the same stack twice, perhaps a web server and a scheduler. The directory structure might look like this:
```
my-stack/
├── config.yaml
├── stack-scheduler
│   └── config.yaml
└── stack-webserver
    └── config.yaml
```
where both of these `stack-*` directories are pointers to the exact same external stack.

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

We can't have that. The answer is `overrides`.

When you add an overrides property to a config.yaml file in the <stack>::<name> format, it modifys the variable(s) it calls out, and only that variable. What's more, it modifys the variable **starting in the stack** and everything from that stack down. If the <stack>:: is left out, it will modify the variable in all stacks. Once again, an example make this easier to understand. Lets use the same structure we have set up.
```
my-stack/
├── config.yaml      | empty file
├── stack-scheduler
│   └── config.yaml  | DNS_ENTRY variable, default "my-server.example.com"
└── stack-webserver 
    └── config.yaml  | DNS_ENTRY variable, default "my-server.example.com"
```
We can *override* this by adding a ***new*** variable to the top level config.yaml file, calling out an override on DNS_ENTRY. So:
```
MY_NEW_DNS:
  overrides:
    - DNS_ENTRY
  default: my-new-dns.example.com
```
Whatever the `MY_NEW_DNS` variable is set to will also be propagated down to all `DNS_ENTRY` values in all stacks added 'under' this config.yaml This also means that any stack inheriting or adding this stack must use `MY_NEW_DNS` because `DNS_ENTRY` effectivly no longer exists (it's been overriden).

If the `<stack>::` notation is used, the same rules apply, but this time only to the stack(s) it calls out. For instance if we change our override property slightly:
```
MY_NEW_DNS:
  overrides:
    - stack-scheduler::DNS_ENTRY
  default: my-new-dns.example.com
```
We have added a `stack-scheduler::` prefix to the overrides `DNS_ENTRY` entry. This will override DNS_ENTRY within the stack-schedule and ***not*** in the stack-webserver. The stack-webserver will still honor any entries for `DNS_ENTRY` and will no nothing of the `MY_NEW_DNS` variable that has been added.

### property: type
#### string
The string type is fairly self-explainitory
#### number
#### case


### Instance Variables
### Stack Variables