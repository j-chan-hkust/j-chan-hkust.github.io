The [[Terraform Public Registry]] follows Semantic Versioning (SemVer). This follows the commonly understood structure of X.Y.Z format (e.g. 2.4.16) where:
- X (Major): Increments when making incompatible API changes  
- Y (Minor): Increments when adding functionality in a backward-compatible manner  
- Z (Patch): Increments when making backward-compatible bug fixes

This concept is relevant when defining [[Module Block]]s using the public registry, when you might specify a version to ensure consistency. You might use the following operators:
- `>=` : Allows any version greater than or equal to the specified version  
- `~>` : Called the "pessimistic constraint operator", allows only **patch** or **minor** version updates within the specified version component  
	- To specify patch update, you might use:
		  version = "~> 1.1.0"
	- To specify minor update, you might use:
		  version = "~> 1.0"
- `=` : Requires an exact version match