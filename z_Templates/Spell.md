### [[<%tp.file.title%>]]

<%*  
const clipboardContent = await tp.system.clipboard();  
tR += clipboardContent;  
%>

**Spell Lists.** <%*
let classes = tp.frontmatter["Class"];

// Ensure classes is always an array even if the frontmatter only has 1 value
if (!Array.isArray(classes)) {
    classes = [classes];
}

// Map each class to the desired link format
let links = classes.map(c => `[[${c} Spells|${c}]]`);

// Join them with comma + space
tR += links.join(", ");
%>
