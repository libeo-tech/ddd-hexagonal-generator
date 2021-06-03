# libeo-ddh-generator README

This is the README for your extension "libeo-ddh-generator". After writing up a brief description, we recommend including the following sections.

## Features

This Extension allow automatic generation of modules using [Domain Driven Development Hexagonal Architecture](https://github.com/Sairyss/domain-driven-hexagon) Or DDH for short

Available command are as follow : 

| Name               | Condition                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|--------------------|---------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Create DDH Folders | None                            | Creates the following:  <ul> <li> 🟢 module folder</li> <ul> <li> 🟢 core folder</li> <ul> <li> 🟢 application folder</li> <ul> <li> 🟢 commands folder</li><li> 🟢 queries folder</li><li> 🟢 application file</li> </ul> <li> 🟢 domain folder</li> </ul> <li> 🟢 infrastructure folder</li> <ul><li> 🟢 infrastructure file</li></ul> <li> 🟢 interface folder</li> <ul><li> 🟢 interface file</li></ul><li> 🟢 module file</li> </ul> </ul>                                                                                                                                                                 |
| Create DDH Command | Folder must be named "commands" | Creates the following:  <ul> <li>module folder</li> <ul> <li>core folder</li> <ul> <li>application folder</li> <ul> <li>commands folder</li> <ul> <li> 🟢 command folder</li> <ul><li> 🟢 command file</li><li> 🟢 command handler file</li><li> 🟢 port file</li></li></ul> </ul> <li>queries folder</li> <li>application file</li> </ul> <li>domain folder</li> </ul> <li>infrastructure folder</li> <ul><li>infrastructure file</li></ul> <li>interface folder</li> <ul><li>interface file</li></ul><li>module file</li> </ul> </ul>                                         |
| Create DDH Query   | Folder must be named "queries"  | Creates the following:  <ul> <li>module folder</li> <ul> <li>core folder</li> <ul> <li>application folder</li> <ul> <li>commands folder</li> <li>queries folder</li> <ul> <li> 🟢 query folder</li> <ul><li> 🟢 query file</li><li> 🟢 query handler file</li><li> 🟢 port file</li></li></ul> </ul> <li>application file</li> </ul> <li>domain folder</li> </ul> <li>infrastructure folder</li> <ul><li>infrastructure file</li></ul> <li>interface folder</li> <ul><li>interface file</li></ul><li>module file</li> </ul> </ul>                                               |
| Create DDH Entity  | Folder must be named "domain"   | <ul> <li>module folder</li> <ul> <li>core folder</li> <ul> <li>application folder</li> <ul> <li>commands folder</li> <li>queries folder</li> <li>application file</li> </ul> <li>domain folder</li> <ul> <li> 🟢 entity folder</li> <ul> 🟢 entity file</ul> </ul> </ul> <li>infrastructure folder</li> <ul><li>infrastructure file</li> <li> 🟢 infrastructure folder</li> <ul><li> 🟢 adapter file</li><li> 🟢 repository file</li></ul> </ul> <li>interface folder</li> <ul><li>interface file</li></ul><li>module file</li> </ul> </ul> |


To use the extension just right click on the source folder where you want to create your module/entity/query/command and select the command in the menu

The created files are not added to the parent files, please add them manually for now.
## Known Issues

Try to use the command/query/entity command in a well organized folder (Preferably one generated with the module command) or else it might create the files at the wrong place ! 
