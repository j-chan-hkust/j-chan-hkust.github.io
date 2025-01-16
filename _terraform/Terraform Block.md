A terraform block is a special configuration block that specifies Terraform's core settings, including the required provider versions and backend configuration for storing state.

```
terraform {
  required_version = ">= 1.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.11.0, < 6.0.0"
    }
  }
}
```

The `terraform` block only needs to be declared once per root module (your main configuration), even if you have multiple `.tf` files in your project. While you could theoretically have more than one, they can't conflict, so effectively you should only maintain one, preferably in a separate file.