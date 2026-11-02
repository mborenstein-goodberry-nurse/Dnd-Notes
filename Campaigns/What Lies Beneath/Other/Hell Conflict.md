---
type: Event
subtype: Historical Event
date: 10-23-2026
world: What Lies Beneath
campaigns:
  - What Lies Beneath
period: Approximately 200 years ago (unconfirmed)
status: Historical
certainty: Partially established
locations:
  - "[[Kingdom of Xanthar]]"
  - "[[The Banished Lands]]"
people: []
organizations: []
summary: A historical conflict involving an alleged attempt to open or summon Hell, a red beacon, and the subsequent banishment of tieflings and hellfolk.
aliases: []
tags: []
---
# Hell Conflict

> [!fas-infobox] ✧ Historical Event Overview
> **Period:** `=this.period`
> **Status:** `=this.status`
> **Certainty:** `=this.certainty`
> **Locations:** `=this.locations`
> **People:** `=this.people`
>
> *`=this.summary`*

## Overview
According to the account shared before the campaign, tieflings reportedly attempted to open or summon **Hell** in the mountains. A great red beacon appeared in the sky, followed by conflict and the banishment of tieflings and other hellfolk to the far south.

## Background & Causes
The stated cause is an **alleged** attempt to open or summon Hell. Who initiated it, whether the allegation is accurate, and what the ritual actually involved remain unknown.

## Course of Events
- An attempt to open or summon Hell reportedly took place in a mountainous area.
- An enormous red beacon appeared in the sky.
- A major conflict followed.
- Tieflings and hellfolk were subsequently banished to the southern territory.

## Consequences & Legacy
- The **[[The Banished Lands]]** became associated with the banished populations.
- The banishment appears broadly accepted by many present-day communities, but acceptance does not establish the historical accusation's accuracy.

## People, Places & Affiliations
```dataviewjs
const current = dv.current();
const groups = [["People", current.people], ["Locations", current.locations], ["Organizations", current.organizations]];
const rows = groups.flatMap(([kind, values]) => Array.from(values ?? []).map(value => [kind, value]));
if (rows.length) dv.table(["Category", "Related Note"], rows);
```

## Accounts & Uncertainties
- **Reported account:** Tieflings attempted to open or summon Hell.
- **Established as shared lore:** Red beacon, conflict, subsequent banishment.
- **Approximate chronology:** Around 200 years ago, pending confirmation from Emily.
- **Not established:** Who was responsible, what actually occurred, whether the red beacon and ritual are causally connected, and the exact locations involved.
- **Separate chronology:** [[Shayann]]'s banishment happened when [[Kiara Bashara]] was approximately 20–30 years old. It should **not** be dated to this conflict without confirmation.

## Additional Details
The world treats planar realms unusually, with planes apparently corresponding to physical regions. The precise relationship between Hell and the geography of this event is unresolved.
