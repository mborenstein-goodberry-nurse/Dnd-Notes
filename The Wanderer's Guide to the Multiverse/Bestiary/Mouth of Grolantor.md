---
type: Creature
subtype: Creature
statblock: inline
aliases:
  - Mouths of Grolantor
source: "Volo's Guide to Monsters (2016), p. 149; reprinted in Mordenkainen Presents: Monsters of the Multiverse (2022), p. 187"
---
# Mouth of Grolantor

**Huge giant (hill giant), chaotic evil — CR 6 (2,300 XP)**  
**Armor Class:** 14 (natural armor) · **Hit Points:** 105 (10d12 + 40) · **Speed:** 50 ft.

## Combat Reference

**Uncontrolled hunger:** Each turn, the giant moves toward the nearest creature or anything it believes it can eat. Its attack pattern is chosen randomly with a d10, not by a normal Multiattack action.

| d10 | Attack pattern |
| --- | --- |
| 1–3 | Three fist strikes against one randomly chosen target in reach; if nobody is available, it becomes enraged and gains advantage on attacks until the end of its next turn. |
| 4–5 | One fist strike against every creature it can reach; with no other targets, it strikes itself. |
| 6–7 | One bite against a random target in reach; with no other targets, it is stunned until its next turn begins. |
| 8–10 | One bite and two fist strikes against a randomly chosen target in reach; with nobody available, it enters the same brief rage as on 1–3. |

**Bite:** +8 to hit, 5-ft. reach; 15 (3d6 + 5) piercing damage. The giant heals for the damage actually dealt.  
**Fist:** +8 to hit, 10-ft. reach; 18 (3d8 + 5) bludgeoning damage.

## Statblock

```statblock
dice: false
name: Mouth of Grolantor
size: Huge
type: Giant
subtype: Hill Giant
alignment: Chaotic Evil
ac: 14
hp: 105
hit_dice: 10d12 + 40
speed: 50 ft.
stats: [21, 10, 18, 5, 7, 5]
skillsaves:
  - perception: +1
condition_immunities: Frightened
senses: passive Perception 11
languages: Giant
cr: 6
traits:
  - name: Mouth of Madness
    desc: >-
      Immune to confusion spells and similar magic. On its turn, the giant uses
      its movement to pursue the nearest creature or something it regards as food.
      Roll a d10 at the start of its turn to choose its attacks:
      1-3: three Fist attacks against one random target in reach; with no target,
      it gains advantage on attack rolls through the end of its next turn.
      4-5: one Fist attack against every creature in reach; with no other creature,
      it attacks itself once with its fist.
      6-7: one Bite against one random target in reach; with no other creature,
      it becomes stunned until its next turn starts.
      8-10: one Bite and two Fist attacks against one random target in reach;
      with no target, it gains advantage on attack rolls through the end of its next turn.
actions:
  - name: Bite
    desc: >-
      Melee weapon attack: +8 to hit, reach 5 ft., one creature.
      Hit: 15 (3d6 + 5) piercing damage, and the giant regains hit points
      equal to the damage it dealt with this attack.
  - name: Fist
    desc: >-
      Melee weapon attack: +8 to hit, reach 10 ft., one target.
      Hit: 18 (3d8 + 5) bludgeoning damage.
```

## Description

A mouth of Grolantor is a dangerously emaciated hill giant driven by a hunger it cannot control. Its relentless pursuit of anything edible makes it a threat to allies and enemies alike. The creature's speed, erratic attacks, and ability to recover health by biting make it unusually hard to contain once unleashed.

*Rules source: **Volo's Guide to Monsters** (2016), p. 149; later reprinted in **Mordenkainen Presents: Monsters of the Multiverse** (2022), p. 187. This is a concise, paraphrased 2014-era mechanical reference, not a transcription of the published rules. Consult the sourcebook for exact rules text. Campaign appearances belong in campaign session journals, not this shared Bestiary.*
