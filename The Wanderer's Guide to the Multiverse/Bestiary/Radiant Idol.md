---
type: Creature
subtype: Creature
statblock: inline
aliases:
  - Radiant Idols
source: "Eberron: Rising from the Last War (2019), p. 308"
---
# Radiant Idol

**Large celestial, lawful evil — CR 11 (7,200 XP)**  
**Armor Class:** 18 (natural armor) · **Hit Points:** 142 (15d10 + 60) · **Speed:** 40 ft.

## Combat Reference

**Aura of False Divinity:** A creature beginning its turn within 30 ft. must save against DC 17 Wisdom or be charmed. It can retry at the end of its turns; a successful save provides 24-hour protection from that idol's aura.

**Spellcasting (Charisma; DC 17):** At will: [[Charm Person]], [[Cure Wounds]], [[Disguise Self]], [[Thaumaturgy]]. Once per day each: [[Commune]], [[Dominate Person]], [[Insect Plague]], [[Mass Suggestion]], [[Raise Dead]]. No material components are required.

**Notable offense:** Two flail attacks or a once-per-day area of radiant damage. The idol also has advantage on saving throws against magic.

## Statblock

```statblock
dice: false
name: Radiant Idol
size: Large
type: Celestial
alignment: Lawful Evil
ac: 18
hp: 142
hit_dice: 15d10 + 60
speed: 40 ft.
stats: [23, 18, 19, 17, 20, 21]
saves:
  - wisdom: +9
  - charisma: +9
skillsaves:
  - deception: +9
  - insight: +9
  - perception: +9
  - persuasion: +9
damage_resistances: Radiant; bludgeoning, piercing, and slashing from nonmagical attacks
condition_immunities: Charmed, Exhaustion, Frightened
senses: darkvision 120 ft., passive Perception 19
languages: All languages, telepathy 120 ft.
cr: 11
traits:
  - name: Aura of False Divinity
    desc: "When a creature starts its turn within 30 ft. while the idol is not incapacitated, it makes a DC 17 Wisdom save. Failure charms it. It repeats the save at each turn's end; success ends this charm and grants immunity to this particular idol's aura for 24 hours."
  - name: Innate Spellcasting
    desc: "Charisma spellcasting (save DC 17), no material components. At will: charm person, cure wounds, disguise self, thaumaturgy. Once each per day: commune, dominate person, insect plague, mass suggestion, raise dead."
  - name: Magic Resistance
    desc: "Advantage on saving throws against spells and other magical effects."
  - name: Immortal Nature
    desc: "Does not need to eat, drink, or sleep."
actions:
  - name: Multiattack
    desc: "Makes two melee attacks."
  - name: Flail
    desc: "Melee attack +10, reach 5 ft., one target; 10 (1d8 + 6) bludgeoning plus 18 (4d8) radiant damage."
  - name: Radiant Strike (1/Day)
    desc: "Chooses a visible ground point within 60 ft. A light-filled cylinder (30-ft. radius, 40-ft. height) lasts until the start of its next turn. Creatures inside when it appears, or ending a turn there, make a DC 17 Constitution save; failure deals 36 (8d8) radiant damage, success half."
```

*Rules source: Eberron: Rising from the Last War (2019), p. 308. Concise mechanical restatement, not an SRD creature. Consult the published source for exact rules wording. Campaign-specific appearances belong in campaign journals.*
