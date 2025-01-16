Jinja is a python based templating engine that is used by AFT, more specifically AWS CodeBuild. CodeBuild will take the .jinja files, and use them to generate lots and lots of generic files that are required to manage all these accounts.

So instead of loading 100 backends and AFT providers files for 100 accounts - instead you just need to write 1. Jinja is an **abstraction layer** that helps reduce the amount of similar code in a single repository.

There's nothing really special about Jinja and it's relation to Terraform, it's mainly a tooling choice that's been made by AFT. 