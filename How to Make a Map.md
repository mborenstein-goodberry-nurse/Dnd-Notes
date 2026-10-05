1. Press your hotkey to insert a template (Alt+T).
2. Type `map` and select `Insert Map (Simplified Template)`
3. Copy the name of your map into the **image** field per the example.
4. Change the **id** of the id. Pick something unique. Maps that share the same ID will share pins also!
5. External to Obsidian, check the properties of the map file to determine its pixel size.
6. Enter the map **height** and **width** in pixels into the calculator.
7. Copy the same details into the **bounds** section of the leaflet template.
8. Now copy the **lat** and **long** from the calculator into the **lat** and **long** sections of the leaflet template.
9. Play with the **height** and **width** now. This determines the size of the Leaflet object when displayed in the note.
10. You map should now be usable but you will want to tweak the zoom settings.
11. I usually get the map into the zoom I'm happiest with and set that to the **defaultZoom**.
12. Adjust the **minZoom** and **maxZoom** based on your personal preference.
13. You can hover your mouse over the little target icon to see the current zoom level which is useful for filling these in.
14. This is as far as you need to go if you don't need to measure within the map.
15. To enable measurement you need to open the map in some software that has a measurement tool. I use Gimp for this which is free.
16. You need to measure the scale of the map to determine how many pixels exist within the units of the scale.
17. In this example, I measure the pixels from 0-25 which is 268 pixels. I enter that in the calculator.
18. Then I update the how many unit in scale to match the scale of the map. So there are 25 units.
19. ![[Map Scale How To.png|442x220]]
20. The **scale** is now calculated and I copy the result into the leaflet template.
21. Example: scale: 0.09328358208955223
22. You can now: Alt + Click to set a measurement point and then measure. You can press Alt + Click again to see a additional measurement point.