Hashicorp suggests you align the equals sign for consecutive arguments for easing readability for configurations:

```
resource "aws_instance" "web" {
  ami           = "ami-123456"
  instance_type = "t3.micro"
  subnet_id     = "subnet-abc123"
  tags          = {
    Name = "web-server"
  }
}
```

To get to this effect, use CLI command `terraform fmt` or use the plugins in VS Code and Jetbrains (and others).
