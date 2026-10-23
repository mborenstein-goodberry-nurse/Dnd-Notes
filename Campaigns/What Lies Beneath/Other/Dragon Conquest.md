---
type: Event
subtype: Historical Event
date: 10-23-2026
world: What Lies Beneath
campaigns:
  - What Lies Beneath
period: "Unknown"
status: Historical
certainty: Partially established
locations: ["[[Southwestern Crater]]"]
people: ["[[Xurxus]]"]
organizations: []
summary: "An attempted conquest by dragons was defeated; their remains and ruins are associated with the southwestern crater."
aliases: []
tags: []
---
# Dragon Conquest

> [!fas-infobox] ✧ Historical Event Overview
> **Period:** `=this.period`
> **Status:** `=this.status`
> **Certainty:** `=this.certainty`
> **Locations:** `=this.locations`
> **People:** `=this.people`
>
> *`=this.summary`*

## Overview
Dragons once attempted to conquer the world. **[[Xurxus]]**, god of balance, defeated them, possibly with assistance from others. Their remains and ruins are associated with the **[[Southwestern Crater]]**.

## Background & Causes
The dragons' motivations, leaders, and original territories are not yet known.

## Course of Events
- Dragons attempted to conquer the world.
- Xurxus defeated them; whether he acted alone is unknown.
- The circumstances surrounding the creation of the crater have not been established.

## Consequences & Legacy
- Dragon remains and ruins are found in the southwestern crater region.
- Reptilian peoples, including dragonborn and lizardfolk, face distrust in some communities because of associations with the dragons. This prejudice is a social attitude, not evidence of individual culpability.

## People, Places & Affiliations
```dataviewjs
const current = dv.current();
const groups = [["People", current.people], ["Locations", current.locations], ["Organizations", current.organizations]];
const rows = groups.flatMap(([kind, values]) => Array.from(values ?? []).map(value => [kind, value]));
if (rows.length) dv.table(["Category", "Related Note"], rows);
```

## Accounts & Uncertainties
- **Established in campaign lore:** Dragon conquest attempt, defeat associated with Xurxus, ruins/remains in the crater.
- **Unconfirmed:** When this occurred; whether other gods or armies assisted; whether the crater was caused by the war; identities of the dragons.

## Additional Details
This event may explain present-day attitudes toward dragonborn and lizardfolk, but the exact historical connection is not yet known.
