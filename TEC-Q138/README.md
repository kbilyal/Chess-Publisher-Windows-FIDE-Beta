# TEC Q138 — Rating consistency-check policy

Status: **implemented + regression-tested in staging; not merged into the Windows product and not a release candidate yet**.

Q138 is the remaining Rating Lists policy item in the beta.89 VCL matrix: the existing application can perform manual and automatic rating consistency checks, but the user had no persistent enable/disable policy.

## Implemented

- Tournament-scoped `settings.ratingConsistencyChecksEnabled`.
- Legacy/missing value migrates to `true`, preserving existing behavior.
- Explicit UI checkbox: **Automatic rating consistency checks**.
- Disabled policy blocks beta.56 automatic checks before FIDE lookup/comparison work.
- Disabled policy does not create a recurring retry loop.
- A pending rating-list revision is retained while disabled.
- Re-enabling immediately asks beta.56 to retry the pending check.
- Manual user-requested checks remain available; the persistent policy controls automatic checking.

## beta.56 point patch

The existing automatic checker receives only a small policy boundary:

1. `consistencyPolicyEnabled()` delegates to `window.cpQ138.isEnabled()` when available.
2. `safeContext()` returns `reason: 'disabled'` when the current tournament policy is off.
3. `tryAutomaticConsistency()` does not schedule a retry for `disabled`.
4. The hook is exported for regression evidence.

## Tests

Dedicated Q138: **12 PASS / 0 FAIL**.

Existing beta.56 automatic-consistency suite re-run against the patched beta.56: **57 PASS / 0 FAIL**.

## Staging bundle

`BETA98-Q138-STAGING-BUNDLE.base64`

```bash
base64 -d BETA98-Q138-STAGING-BUNDLE.base64 > BETA98-Q138-STAGING-BUNDLE.tar.gz
tar -xzf BETA98-Q138-STAGING-BUNDLE.tar.gz
```

Decoded tar.gz SHA256:

`3f4d46f2fee0ca3fbd8dd5f8ff61ff10a739c773d22ffed4e7dfa2fbeaccc96a`

Bundle base64 SHA256:

`9cf707b1a2e5dd524cfb99ca87baf38f262bdba5a8cf9d3adc9d53c6ccf0ef3c`

Implementation module SHA256:

`9573203790c8b5de2bb17d55c53e2ac3466ab1d460e85b8e2e18a648675c4e9b`

beta.56 patch SHA256:

`ca1f96558440069af23b8e444c1ccc49004be859bbf8938cb3591d84016c6fc1`

Dedicated regression SHA256:

`ca2a73bb913db2965a0c1e73299193b29980dc1fc1a8e14647f411daa44fb703`

## Protected boundary

No changes to Gacrux 1.9.57, Swiss Dutch pairing, TRF pairing path, BBP, protected tie-break formulas, Chess-Results, Cloud/SYNC or Linux.

Like Q117, Q138 must not be marked production PASS until integrated into the exact beta.97 authoritative source and passed through the full current Windows release gate.
