#
# Copyright 2023 Rafał Wabik - IceG - From eko.one.pl forum
#
# Licensed to the GNU General Public License v3.0.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-modemdefine
LUCI_TITLE:=LuCI JS support for easy definition of modems
LUCI_DESCRIPTION:=LuCI JS interface to define the available modems. The list of modems will make it easier for the user to switch between modems in other LuCI applications.
MAINTAINER:=Rafał Wabik <4Rafal@gmail.com>
LUCI_DEPENDS:=
LUCI_PKGARCH:=all
PKG_VERSION:=1.0.5-20231008

define Package/luci-app-modemdefine/conffiles
/etc/config/modemdefine
/etc/modem/modemlist.json
endef

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
