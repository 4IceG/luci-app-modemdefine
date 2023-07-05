# luci-app-modemdefine
![GitHub release (latest by date)](https://img.shields.io/github/v/release/4IceG/luci-app-modemdefine?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/4IceG/luci-app-modemdefine?style=flat-square)
![GitHub forks](https://img.shields.io/github/forks/4IceG/luci-app-modemdefine?style=flat-square)
![GitHub All Releases](https://img.shields.io/github/downloads/4IceG/luci-app-modemdefine/total)

LuCI JS interface to define the available modems. The list of modems will make it easier for the user to switch between modems in my other LuCI applications.

``` bash
Supported packages:
 - luci-app-3ginfo-lite

```
### <img src="https://raw.githubusercontent.com/4IceG/Personal_data/master/dooffy_design_icons_EU_flags_United_Kingdom.png" height="24"> Installation / <img src="https://raw.githubusercontent.com/4IceG/Personal_data/master/dooffy_design_icons_EU_flags_Poland.png" height="24"> Instalacja

<details>
   <summary>Pokaż | Show me</summary>

#### Step 1b. Download and install manualy
[4IceG/luci-app-modemdefine/releases](https://github.com/4IceG/luci-app-modemdefine/releases)

#### Step 2. Add my repository (https://github.com/4IceG/Modem-extras) to the image and follow the commands.
``` bash
opkg update
opkg install luci-app-modemdefine
```
 
</details>

### <img src="https://raw.githubusercontent.com/4IceG/Personal_data/master/dooffy_design_icons_EU_flags_United_Kingdom.png" height="24"> User compilation / <img src="https://raw.githubusercontent.com/4IceG/Personal_data/master/dooffy_design_icons_EU_flags_Poland.png" height="24"> Kompilacja przez użytkownika

<details>
   <summary>Pokaż | Show me</summary>

``` bash
#The package can be added to Openwrt sources in two ways:

cd feeds/luci/applications/
git clone https://github.com/4IceG/luci-app-modemdefine.git
cd ../../..
./scripts feeds update -a; ./scripts/feeds install -a
make menuconfig

or e.g.

cd packages/
git clone https://github.com/4IceG/luci-app-modemdefine.git
git pull
make package/symlinks
make menuconfig

#You may need to correct the file paths and the number of folders to look like this:
feeds/luci/applications/luci-app-modemdefine/Makefile
or
packages/luci-app-modemdefine/Makefile

#Then you can compile the packages one by one, an example command:
make V=s -j1 feeds/luci/applications/luci-app-modemdefine/compile
```
</details>

### <img src="https://raw.githubusercontent.com/4IceG/Personal_data/master/dooffy_design_icons_EU_flags_United_Kingdom.png" height="24"> Preview / <img src="https://raw.githubusercontent.com/4IceG/Personal_data/master/dooffy_design_icons_EU_flags_Poland.png" height="24"> Podgląd

![](https://user-images.githubusercontent.com/59826889/249215981-f07d69a2-4e6a-44fe-b216-7ab6cc8f09f2.png)
