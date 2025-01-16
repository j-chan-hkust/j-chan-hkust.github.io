The **import block** allows you to reference existing resources that were not created by Terraform in your .tf files.

```
import {
  to = aws_instance.web
  id = "i-1234567890abcdef0"
}

# Now instance i-1234567890abcdef0 has the name aws_instance.web, and you can do stuff with it in terraform
resource "aws_instance" "web" {
  # ... configuration for the instance ...
}
```

Note that this won't automatically import the configuration code into your codebase. At the moment, there's no easy way to do this. You need to manually write this yourself.
	*I guess its actually by design - and also there's so much metadata associated with each resource that I suspect this would result in really really ugly code*