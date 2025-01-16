A **resource block** in Terraform is a fundamental configuration element that creates resources in your infrastructure (like an s3 bucket, ec2 instance, vpc, etc.) with a specific type and local name. 

Each resource block can usually only create 1 type of resource, though you can use some form of enumeration to create more:
Using `count` meta-argument:  
```
resource "aws_instance" "server" {
  count = 3
  ami   = "ami-123456"
}
```
Using `for_each` meta-argument:  
```
resource "aws_instance" "server" {
  for_each = toset(["dev", "staging", "prod"])
  ami      = "ami-123456"
  tags     = {
    Environment = each.key
  }
}
```

