
The `terraform apply` command executes planned changes to create, update, or destroy infrastructure resources based on your configuration.

This is usually called after [[terraform plan]], after you've decided to confirm the application of the desired resources.

The default number of resources terraform will create in parallel is 10. In order to increase parallelism, update the parallelism variable in your [[Terraform Block]].

```
terraform {
  parallelism = 10  # Limits concurrent operations
}
```

The `-replace=<address>` call can specify to terraform that you need it to completely replace (delete and recreate) a specific resource.