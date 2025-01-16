A **module block** in Terraform is a configuration element that allows you to include and call reusable modules within your Terraform configurations.

When Terraform encounters a module block, it processes that module's configuration files, enabling you to organize and reuse infrastructure code.

```
module "example" {
  source = "./path/to/module"
  # configuration parameters
}
```

The source of modules can be via **local code**, **public git repos**, as well as the [[Terraform Public Registry]]. The ways it's specified in each case is slightly different:

```
# From local path
module "example" {
  source = "./local/path"  
}

# From public Git repository
module "example" {
  source = "github.com/username/repository"
}
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"
}

```

If you need to create multiple modules, you can actually append an extra name at the end (e.g. "example_varname") to define multiple versions of the same module.

 > It's interesting how defining a local name is really **explicit** in [[Resource Block]]s, to the point that you must define a variable name, whereas [[Module Block]]s kind of go by their own name by default. Pikachu is called Pikachu. 
