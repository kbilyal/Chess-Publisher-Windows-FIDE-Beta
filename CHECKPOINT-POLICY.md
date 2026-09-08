# Windows FIDE Beta Checkpoint Policy

Effective from beta.70 onward and authoritative in this repository.

Every accepted Windows FIDE beta/checkpoint must preserve an auditable Git checkpoint before further development. Each checkpoint records exact version/parent, package/source hash evidence, Drive release/VCL reference, dedicated and cumulative regression results, protected-core verification, known exceptions/skips, and next TEC blocker.

Rules:
1. Always develop from the newest accepted checkpoint.
2. Never rewrite checkpoint history and never force-push checkpoint refs.
3. No beta checkpoint is Final/Stable merely because deterministic tests pass.
4. Gacrux 1.9.57, Swiss Dutch pairing, TRF16/TRF26 core, BBP checker, Tie-Break core/checker, Chess-Results protocol/core and DGT core are protected.
5. Desktop ↔ Web sync and Windows Fluidity/UI changes must satisfy their dedicated regression gates before a Windows test candidate.
6. Unexpected cumulative failures block checkpoint advancement.
7. The accepted portable package/source snapshot and this Git history must remain aligned.
