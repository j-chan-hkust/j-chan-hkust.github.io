The `terraform plan` command creates an execution plan that previews the changes Terraform will make to your infrastructure by comparing your configuration with the current state.

An example of what this plan might look like:
```
Terraform will perform the following actions:

  # aws_instance.web_server will be created
  + resource "aws_instance" "web_server" {
      + ami           = "ami-1234567890"
      + instance_type = "t2.micro"
      + tags         = {
          + "Environment" = "Production"
          + "Name"        = "WebServer"
        }
    }

  # aws_s3_bucket.data will be destroyed
  - resource "aws_s3_bucket" "data" {
      - bucket = "my-data-bucket" -> null
      - tags   = {
          - "Environment" = "Dev" -> null
        }
    }

  # aws_security_group.allow_http will be updated in-place
  ~ resource "aws_security_group" "allow_http" {
      ~ description = "Allow HTP inbound" -> "Allow HTTP and HTTPS inbound"
      ~ ingress     = [
          + {
              + from_port   = 443
              + to_port     = 443
              + protocol    = "tcp"
              + cidr_blocks = ["0.0.0.0/0"]
            }
        ]
    }

Plan: 1 to add, 1 to change, 1 to destroy

```

When forming the plan, Terraform will analyze [[Resource Block]]s to find references to other objects, and use this to create a [[Implicit Dependencies]] map to manage the order of object creation.

Some common flags you might use:
**Functional:**
- `-refresh-only`: Updates state file to match real infrastructure without proposing changes
- `-out`: Saves plan to a file for later execution
- `-target`: Limits planning to specific resources
- `-var`: Sets a variable value
- `-var-file`: Specifies a file containing variable values
- `-detailed-exitcode`: Returns specific exit codes for different plan states
- `-destroy`: Creates a plan to destroy all resources

**UI:**
- `-no-color`: Disables color output
- `-input=false`: Disables interactive prompts