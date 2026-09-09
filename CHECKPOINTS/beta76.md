# Windows FIDE Beta Checkpoint — v1.06.00-beta.76

Parent: `v1.06.00-beta.75`  
Status: **WINDOWS TEST CANDIDATE — NOT FINAL / NOT STABLE**

Scope: make `My Cloud Tournaments` the authoritative organizer-scoped index. A saved provider ID absent from that list is stale and cannot be resurrected by direct snapshot lookup. One matching internalId relinks; multiple matches fail closed; no match permits one new upload from revision 0.

Canonical Windows candidate SHA256: `f18f78061f361e9c8c2a6e080cde6a724bfd3f684ad8ded5ba2674e0f94d58a0`

This candidate was superseded by beta.77 after a live test showed a different failure mode: a copied/imported Desktop file could carry the valid Cloud identity of a different existing tournament.
