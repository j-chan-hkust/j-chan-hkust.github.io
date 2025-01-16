Used to define local values in TF, for constant variables like username, tags, etc. Looks something like:
```
locals {
  common_tags = {
	service_name = "forum"
	owner = "community team"
    Environment = "production"
    Project     = "example"
  }
}
```