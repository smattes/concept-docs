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
