# Caring Guide Server

## Folder Structure
The main project folder (<project_root>) can contain the following files:

* **local.settings.json** - Used to store app settings and connection strings when running locally. This file doesn't get published to Azure.

* **requirements.txt** - Contains the list of Python packages the system installs when publishing to Azure.

* **host.json** - Contains global configuration options that affect all functions in a function app. This file does get published to Azure. Not all options are supported when running locally.

* **.venv/** - Contains a Python virtual environment used by local development.
  
Each function has its own code file and binding configuration file ([**function.json**](https://aka.ms/azure-functions/python/function.json)).


Main thing:

https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-python?tabs=asgi%2Capplication-level&pivots=python-mode-decorators


## For Apple Silicon Macs
At the moment, Azure Functions do not support ARM for local development. Below are instructions to emulate x86 on your ARM based system. 

## For Windows
For Windows, you can use the [Azure Functions Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=v4%2Cwindows%2Ccsharp%2Cportal%2Cbash#install-the-azure-functions-core-tools) to run the stack locally.

### Install the i386 version of homebrew
```sh
$ arch -x86_64  /bin/bash  -c  "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```



### Setup your ~/.zshrc
Run the below in your terminal to open up .zschrc in Vim. 
```sh
$ vi ~/.zshrc
```

Add the following to your ~/.zshrc to allow for environment switching to different architecture switching. 
```
# Architecture switching
alias arm="env /usr/bin/arch -arm64 /bin/zsh --login"
alias intel="env /usr/bin/arch -x86_64 /bin/zsh --login"

# Homebrew distributions
alias ibrew='arch -x86_64 /usr/local/bin/brew'
alias mbrew='arch -arm64e /opt/homebrew/bin/brew'
```


### Install azure dependencies for i386
```sh
$ ibrew tap azure/functions
$ ibrew install azure-functions-core-tools@4
```
  

### Ensure you have functions installed
```sh
$ ls /usr/local/bin/func
$ /usr/local/bin/func
```


### Install dependencies
In the /server folder, create a local.settings.json file and paste the below in. 
```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "python",
    "AzureWebJobsFeatureFlags": "EnableWorkerIndexing",
    "AzureWebJobsStorage": ""
  }
}
```

Install dependencies with the below command. 
```sh
$ python3 -m install -r requirements.txt
```


## Run the stack
Activate your virtual environment. 
```sh
$ source .venv/bin/activate
```

Run the stack
```sh
$ arch -x86_64 /usr/local/bin/func start host
```

## Misc

Use thing like this to disable endpoints
"AzureWebJobs.HttpTrigger1.Disabled": "false"