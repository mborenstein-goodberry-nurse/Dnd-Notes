---
type: Creature
subtype: Creature
statblock: inline
tags:
---

```statblock  
dice: false
image: The Lonely.jpg
name: The Lonely
size: Medium
type: Monstrosity
alignment: Lawful Evil
ac: 16
hp: 112
hit_dice: 15d8 + 45
speed: 30
stats: [16, 12, 17, 6, 11, 6]
damage_vulnerabilities: 
damage_resistances: Bludgeoning, Piercing, Slashing while in dim light or darkness 
senses: darkvision 60 ft., Passive Perception 10
languages: Common
cr: 9
traits:
  - name: "Psychic Leech."
    desc: "At the start of each of the Lonely's turns, each creature within 5 feet of it must succeed on a DC 15 Wisdom saving throw or take 10 (3d6) psychic damage."
  - name: "Thirives on Company."
    desc: "The Lonely has advantage on attack rolls while it is within 30 feet of at least two other creatures. It otherwise has disadvantage on attack rolls."
actions:
  - name: "Multiattack."
    desc: "The Lonely makes one harpoon arm attack and uses Sorrowful Embrace."
  - name: "Harpoon Arm."
    desc: "Melee Weapon Attack: +7 to hit, reach 60 ft., one target. Hit: 21 (4d8 + 3) piercing damage, and the target is grappled (escape DC 15) if it is a Large or smaller creature. The Lonely has two harpoon arms and can grapple up to two creatures at once."
  - name: "Sorrowful Embrace."
    desc: "Each creature grappled by the Lonely must make a DC 15 Wisdom saving throw. A creature takes 18 (4d8) psychic damage on a failed save, or half as much damage on a successful one. In either case, the Lonely pulls each creature grappled by it up to 30 feet straight toward it."
```
