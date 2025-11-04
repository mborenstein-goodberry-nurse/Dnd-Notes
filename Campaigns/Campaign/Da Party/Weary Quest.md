---
type: Creatures
subtype: Player Character
date: 2025-09-25 09:51
Art: "![[ImagePlaceholder.jpg]]"
gamedate:
campaign:
summary:
status:
Level: 5
AC: 0
Prof: "2"
HP: 0
HitDice: d8
Speed: 30
STR: 10
DEX: 10
CON: 13
INT: 10
WIS: 7
CHA: 10
Race: RaceName
Alignment: NONE
Gender: GenderName
Age: "0"
Location: NONE
Class: ClassName
Subclass: SubClassName
AssociatedGroup: NONE
Likes: NONE
Dislikes: NONE
Pronouns: NONE
PersonalityTrait:
  - NONE
SocialTrait:
  - NONE
MentalTrait:
  - NONE
Proficiencies:
  - NONE
Resistances:
  - NONE
Languages:
  - Common
  - Infernal
  - Elven
DmgTkn: 0
TempHP: 0
Copper: 0
Silver: 0
Electrum: 12
Gold: 0
Platinum: 0
aliases:
tags:
---
# [[Player Template]]

## Appearance
Looks gay

## Sheet
>[!column | flex 2]
>> [!infobox]
>> # `=this.file.name`
>> `=this.art`
>> ###### Stats
>>  |
>> ---|---|
>> **Level** |`=this.level` |
>>  **Speed** |`=this.Speed` |
>> **Proficiency** | +`=this.Prof` |
>> **Initiative** | +`=((this.DEX - 10)/2)` |
>> **AC** | `=this.AC`
>> **HP** | `=this.HP - this.DmgTkn + this.TempHP` |
>> **Hit Dice** | `=this.Level + this.HitDice`  |
>> **Passive Perception** |
>>  
>> ###### Bio
>>   |
>> ---|---|
>> **Race** | `=this.race` |
>> **Sex** | `=this.gender` |
>> **Age** | `=this.age` |
>> **Sexuality** | `=this.sexuality` |
>> **Alignment** | `=this.alignment` |
>> ###### Info
>>   |
>> ---|---|
>> **Class(s)** | `=this.Class` |
>> **Sub-Class(s)** | `=this.Subclass`
>> **Group(s)** | `=this.AssociatedGroup` |
>> **Religion(s)** | `=this.AssociatedReligion` |
>> **Current Location** | `=this.Location` |
>>  ### Currency
| Copper         | Silver         | Gold         | Platinum         |
| -------------- | -------------- | ------------ | ---------------- |
| `=this.Copper` | `=this.Silver` | `=this.Gold` | `=this.Platinum` |
>
>> [!infobox] Death Saves
>> ### Death Saves
| Success | <input type="checkbox" unchecked>  | <input type="checkbox" unchecked> | <input type="checkbox" unchecked> | 
| ------- | --- | --------------------------------- | --------------------------------- |
>>
| Fails | <input type="checkbox" unchecked>  | <input type="checkbox" unchecked> | <input type="checkbox" unchecked> | 
| ------- | --- | --------------------------------- | --------------------------------- |
>>
>> ### Skills
| Skill | Score       | Mod                     | Prof                              | ST                                  |
| ----- | ----------- | ----------------------- | --------------------------------- | ----------------------------------- |
| <font color="#ff0000">**STR**</font>   | `=this.STR` | +`=((this.STR - 10)/2)`   | <input type="checkbox" unchecked> | +`=((this.STR - 10)/2)`               |
| <font color="#ffff00">**DEX**</font>   | `=this.DEX`  | +`=((this.DEX - 10)/2)`   | <input type="checkbox" unchecked> | +`=(this.DEX - 10)/2`               |
| <font color="#00b050">**CON**</font>   | `=this.CON` | +`=((this.CON - 10)/2)` | <input type="checkbox" unchecked>   | +`=((this.CON - 10)/2)` |
| <font color="#7030a0">**INT**</font>   | `=this.INT`          | +`=((this.INT - 10)/2)`   | <input type="checkbox" unchecked>   | +`=((this.INT - 10)/2)`   |
| <font color="#245bdb">**WIS**</font>   | `=this.WIS`          | +`=((this.WIS - 10)/2)`   | <input type="checkbox" unchecked> | +`=(this.WIS - 10)/2`               |
| <font color="#de7802">**CHA**</font>   | `=this.CHA`          | +`=((this.CHA - 10)/2)`   | <input type="checkbox" unchecked> | +`=(this.CHA - 10)/2`               |
>> ### Skill Checks
| Ability               |   Prof                            | Mod |
| --------------------- | --------------------------------- | --- |
| Acrobatics (DEX)      | <input type="checkbox" unchecked> | +`=floor((this.DEX - 10)/2)`   |
| Animal Handling (WIS) | <input type="checkbox" unchecked> | +`=floor((this.WIS - 10)/2)`  |
| Arcana (INT)          | <input type="checkbox" unchecked> | +`=floor((this.INT - 10)/2)`  |
| Athletics (STR)       | <input type="checkbox" unchecked> | +`=floor((this.STR - 10)/2)`   |
| Deception (CHA)       | <input type="checkbox" unchecked> | +`=floor((this.CHA - 10)/2)`  |
| History (INT)         | <input type="checkbox" unchecked> | +`=floor((this.INT - 10)/2)`  |
| Insight (WIS)         | <input type="checkbox" unchecked>   | +`=floor(((this.WIS - 10)/2))`  |
| Intimidation (CHA)    | <input type="checkbox" unchecked> | +`=floor((this.CHA - 10)/2)`  |
| Investigation (INT)   | <input type="checkbox" unchecked>   | +`=floor((this.INT - 10)/2)`  |
| Medicine (WIS)        | <input type="checkbox" unchecked> | +`=floor((this.WIS - 10)/2)`  |
| Nature (INT)          | <input type="checkbox" unchecked> | +`=floor((this.INT - 10)/2)`  |
| Perception (WIS)      | <input type="checkbox" unchecked>   | +`=floor((this.WIS - 10)/2)`  |
| Performance (CHA)     | <input type="checkbox" unchecked> | +`=floor((this.CHA - 10)/2)`  |
| Persuasion (CHA)      | <input type="checkbox" unchecked> | +`=floor((this.CHA - 10)/2)`  |
| Religion (INT)        | <input type="checkbox" unchecked> | +`=floor((this.INT - 10)/2)`  |
| Sleight of Hand (DEX) | <input type="checkbox" unchecked> | +`=floor((this.DEX - 10)/2)`   |
| Stealth (DEX)         | <input type="checkbox" unchecked> | +`=floor((this.DEX - 10)/2)`   |
| Survival (WIS)        | <input type="checkbox" unchecked> | +`=floor((this.WIS - 10)/2)`  |


## Features


## Relationships


## Locations


## History


## Additional Details
