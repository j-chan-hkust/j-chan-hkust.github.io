Say you need to limit as an organization what your developers can create. You'd use a policy enforcement frameworks like [[Sentinel]] or OPA (Open Policy Agent), which will check terraform plans against the predefined rules before deployment.

These rules can limit things like:
- Cost thresholds and instance sizes
- Security configurations (encryption, network rules, tags)
- Naming conventions and required metadata
- Geographic regions and availability zones`