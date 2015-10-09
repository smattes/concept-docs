## Configuration Files
There are a few configuration files that exist in the CloudCoreo convention. These files are all able to be overridden.

### Variable Config
Defined by the `config.yaml` file.

The `config.yaml` file defines variables for the stack and resides in the `<repository-dir>` base directory. These are exposed in the UI to any user who is utilizing the stack.

**Note:** The yaml file **cannot contain tab characters**. Although the CloudCoreo CLI does work to mitigate this mistake, this CAN cause your stack to break. No one wants that.

### Script Order
The configuration file that travels along with, and is located in, the `boot-scripts` directory is defined by the `order.yaml` file. The format is yaml, which means that tab indentations are an error. Here is an example:
```
order:
    - install_packages.sh
    - run_chef.sh
```
CloudCoreo will run (as root) each script in order. The process is to **chmod + X** the files and run with a **./.** So make sure the whole shebang is correct!
