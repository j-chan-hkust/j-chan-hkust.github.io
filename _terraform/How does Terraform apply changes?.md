Terraform manages infrastructure changes through a two-step process:

1. First, Terraform creates an **[[terraform plan|execution plan]]** that outlines the changes it needs to make to reach the desired state defined in your configuration [1](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/aws-change)
2. During `terraform apply`, Terraform follows its **built-in dependency graph** to implement the changes while using **lifecycle arguments** to manage operations and minimize potential downtime [2](https://developer.hashicorp.com/terraform/tutorials/state/resource-lifecycle)

These changes are made using the providers APIs, with authentication using the provided configurations.