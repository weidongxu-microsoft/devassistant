# Dev Assistant

## Prerequisite

- Node.JS
- VS Code
- "Teams Toolkit" extension in VS Code

![image](https://github.com/user-attachments/assets/019d0ff8-a11e-451f-859e-c849cab3e6fb)

## Customization

In [`declarativeAgent.json`](appPackage/declarativeAgent.json), configure your interested channels, and your knowledge base, in "capabilities" part.

Channel URL:
- [SDK release support](https://teams.microsoft.com/l/channel/19%3A084875bb626242ed95f3ac8dddfaa12a%40thread.skype/SDK%20release%20support?groupId=3e17dcb0-4257-4a30-b843-77f47f1d4121&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47)
- [TypeSpec Discussion](https://teams.microsoft.com/l/channel/19%3A906c1efbbec54dc8949ac736633e6bdf%40thread.skype/TypeSpec%20Discussion?groupId=3e17dcb0-4257-4a30-b843-77f47f1d4121&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47)
- [Language - Java](https://teams.microsoft.com/l/channel/19%3A5e673e41085f4a7eaaf20823b85b2b53%40thread.skype/Language%20-%20Java?groupId=3e17dcb0-4257-4a30-b843-77f47f1d4121&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47)
- [Code Generation - .NET](https://teams.microsoft.com/l/channel/19%3Aacbd512e57bd475198ea6bf4564599e3%40thread.skype/Code%20Generation%20-%20.NET?groupId=3e17dcb0-4257-4a30-b843-77f47f1d4121&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47)

SharePoint URL:
- [Java SDK](https://microsoft.sharepoint.com/sites/b04971eb-82a0-451f-9302-85757ec4a221)

## Install

In "Teams Toolkit" extension:

Check "ACCOUNTS" that both "Custom App Update Enabled" and "Copilot Access Enabled" is green. (there is a "refresh" button on the right)

![image](https://github.com/user-attachments/assets/b6956f86-69de-4429-8f54-0f53c5a53676)

Click "LIFECYCLE" > "Provision" to install the agent to your Teams.

![image](https://github.com/user-attachments/assets/dbae47af-f88b-4f5c-a92f-f61fedb27085)


## Usage

After install, you will see a "Dev Assistant" agent, in the right side of Copilot in Teams.

![image](https://github.com/user-attachments/assets/1a6fe7ba-3434-4642-8cfb-ef880406fedf)


You can check and get update on the channels you monitor.

If you provided SharePoint for knowledge at customization, you can also ask question. E.g. find a link, find some guide.

Advanced usage include provide API to let it handle some task, e.g. check status of GitHub PR.
