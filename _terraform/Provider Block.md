A provider block configures a specific infrastructure platform (like AWS, Azure) with authentication and configuration details.
```
provider "aws" {
  region = "us-west-2"
  access_key = "MY_ACCESS_KEY"
  secret_key = "MY_SECRET_KEY"
}

# Later used implicitly in resources/data sources:
resource "aws_instance" "example" {
  ami           = "ami-123456"
  instance_type = "t2.micro"
}
```
Once you've defined a provider, each call of an aws resource will automatically use the configuration information of the defined provider.

If you need to define multiple providers, you can add an alias so terraform knows which provider details to use.
```
# Default AWS provider (no alias needed)
provider "aws" {
  region = "us-west-2"
}

# Second AWS provider with alias
provider "aws" {
  alias  = "east"
  region = "us-east-1"
}

# Using default provider
resource "aws_instance" "west" {
  ami = "ami-123"
}

# Using aliased provider
resource "aws_instance" "east" {
  provider = aws.east  # Specify which provider to use
  ami = "ami-456"
}
```
