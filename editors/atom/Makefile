# $FreeBSD$

PORTNAME=	atom
DISTVERSIONPREFIX=	v
DISTVERSION=	1.42.0
CATEGORIES=	editors
MASTER_SITES=	https://atom.io/download/electron/v${ELECTRON_VER}/:electron_headers \
		https://nodejs.org/dist/v${APM_NODE_VER}/:node \
		https://github.com/tagattie/FreeBSD-Atom/releases/download/${DISTVERSIONPREFIX}${DISTVERSION}/:npm_cache
DISTFILES=	node-v${ELECTRON_VER}-headers${EXTRACT_SUFX}:electron_headers \
		node-v${APM_NODE_VER}${EXTRACT_SUFX}:node \
		atom-npm-cache-${DISTVERSION}${EXTRACT_SUFX}:npm_cache \
		atom-apm-cache-${DISTVERSION}${EXTRACT_SUFX}:npm_cache \
		jasmine-tagged-1.1.4.tar.gz:npm_cache
EXTRACT_ONLY=	${DISTNAME}${EXTRACT_SUFX} \
		node-v${APM_NODE_VER}${EXTRACT_SUFX} \
		atom-npm-cache-${DISTVERSION}${EXTRACT_SUFX} \
		atom-apm-cache-${DISTVERSION}${EXTRACT_SUFX} \
		jasmine-tagged-1.1.4.tar.gz

MAINTAINER=	maintainer@example.com
COMMENT=	Hackable text editor for the 21st century

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE.md

BUILD_DEPENDS=	${UNZIP_CMD}:archivers/unzip \
		zip:archivers/zip \
		electron:devel/electron4 \
		bash:shells/bash \
		rg:textproc/ripgrep \
		node:www/node10 \
		npm:www/npm-node10
LIB_DEPENDS=	libatk-bridge-2.0.so:accessibility/at-spi2-atk \
		libsnappy.so:archivers/snappy \
		libasound.so:audio/alsa-lib \
		libFLAC.so:audio/flac \
		libopus.so:audio/opus \
		libdbus-1.so:devel/dbus \
		libinotify.so:devel/libinotify \
		libnotify.so:devel/libnotify \
		libpci.so:devel/libpci \
		libnspr4.so:devel/nspr \
		libpcre2-8.so:devel/pcre2 \
		libdrm.so:graphics/libdrm \
		libwebp.so:graphics/webp \
		libavcodec.so:multimedia/ffmpeg \
		libopenh264.so:multimedia/openh264 \
		libcups.so:print/cups \
		libfreetype.so:print/freetype2 \
		libharfbuzz.so:print/harfbuzz \
		libsecret-1.so:security/libsecret \
		libnss3.so:security/nss \
		libexpat.so:textproc/expat2 \
		libfontconfig.so:x11-fonts/fontconfig
RUN_DEPENDS=	git:devel/git \
		xdg-open:devel/xdg-utils \
		bash:shells/bash
TEST_DEPENDS=	bash:shells/bash

USES=		desktop-file-utils gl gnome jpeg localbase:ldflags pkgconfig \
		python:2.7 shebangfix xorg

USE_GITHUB=	yes

APM_NODE_VER=	10.2.1
ELECTRON_VER=	4.2.12	# keep in sync with devel/electron4 port

BINARY_ALIAS=	python=${PYTHON_CMD}

USE_XORG=	x11 xcb xcomposite xcursor xdamage xext xfixes xi xkbfile \
		xrandr xrender xscrnsaver xtst
USE_GL=		gl glesv2
USE_GNOME=	atk cairo pango gtk30 libxml2 libxslt
INSTALLS_ICONS=	yes

USE_LDCONFIG=	${DATADIR}

SHEBANG_FILES=	atom.sh
SHEBANG_FILES_APM=	apm/node_modules/atom-package-manager/bin/apm \
		apm/node_modules/atom-package-manager/bin/npm \
		apm/node_modules/atom-package-manager/bin/python-interceptor.sh \
		apm/node_modules/atom-package-manager/script/postinstall.sh \
		apm/node_modules/atom-package-manager/node_modules/npm/configure \
		apm/node_modules/atom-package-manager/node_modules/npm/lib/utils/completion.sh \
		apm/node_modules/atom-package-manager/node_modules/npm/node_modules/node-gyp/gyp/gyp \
		apm/node_modules/atom-package-manager/node_modules/npm/node_modules/node-gyp/gyp/samples/samples \
		apm/node_modules/atom-package-manager/node_modules/npm/scripts/clean-old.sh \
		apm/node_modules/atom-package-manager/node_modules/npm/scripts/dep-update \
		apm/node_modules/atom-package-manager/node_modules/npm/scripts/dev-dep-update \
		apm/node_modules/atom-package-manager/node_modules/npm/scripts/relocate.sh \

post-extract:
	# setup electron headers for node-gyp
	${MKDIR} ${WRKDIR}/.cache/node-gyp/${ELECTRON_VER}
	${TAR} -xzf ${DISTDIR}/node-v${ELECTRON_VER}-headers${EXTRACT_SUFX} \
		--strip-components 1 -C ${WRKDIR}/.cache/node-gyp/${ELECTRON_VER}
	${ECHO} 9 > ${WRKDIR}/.cache/node-gyp/${ELECTRON_VER}/installVersion
	# setup electron headers for node-gyp (apm)
	${MKDIR} ${WRKDIR}/.atom/.node-gyp/.node-gyp/${ELECTRON_VER}
	${TAR} -xzf ${DISTDIR}/node-v${ELECTRON_VER}-headers${EXTRACT_SUFX} \
		--strip-components 1 -C ${WRKDIR}/.atom/.node-gyp/.node-gyp/${ELECTRON_VER}
	${ECHO} 9 > ${WRKDIR}/.atom/.node-gyp/.node-gyp/${ELECTRON_VER}/installVersion
	# copy linux keymaps and menus files
	cd ${WRKSRC}/keymaps && ${CP} linux.cson freebsd.cson
	cd ${WRKSRC}/menus && ${CP} linux.cson freebsd.cson

post-patch:
	${REINPLACE_CMD} -E 's|("electronVersion":.*").*(")|\1${ELECTRON_VER}\2|' \
		${WRKSRC}/package.json
	${REINPLACE_CMD} -e 's|/usr/share|${PREFIX}/share|g' \
		${WRKSRC}/script/lib/install-application.js
	${REINPLACE_CMD} -e 's|<%= installDir %>|${PREFIX}|' \
		${WRKSRC}/resources/linux/atom.desktop.in

pre-build: build-apm-node bootstrap-script bootstrap-apm bootstrap-atom clean-backup
build-apm-node:
	cd ${WRKDIR}/node-v${APM_NODE_VER} && \
		${SETENV} ${CONFIGURE_ENV} CC=${CC} CXX=${CXX} ./configure && \
		${SETENV} ${MAKE_ENV} ${BSDMAKE} -j ${MAKE_JOBS_NUMBER}
bootstrap-script:
	cd ${WRKSRC}/script && ${SETENV} ${MAKE_ENV} \
		npm install --ignore-scripts --offline --verbose --no-progress
	for p in ${PATCHDIR}/script/patch-*; do \
		${PATCH} -p0 -d ${WRKSRC} < $${p}; \
	done
	cd ${WRKSRC}/script && ${SETENV} ${MAKE_ENV} \
		npm_config_build_from_source=true \
		npm_config_offline=true \
		npm rebuild --nodedir=${LOCALBASE} --verbose --no-progress
bootstrap-apm:
	cd ${WRKSRC}/apm && ${SETENV} ${MAKE_ENV} \
		npm install --global-style --ignore-scripts --offline --verbose --no-progress
	for p in ${PATCHDIR}/apm/patch-*; do \
		${PATCH} -p0 -d ${WRKSRC} < $${p}; \
	done
	cd ${WRKSRC} && ${FIND} ${SHEBANG_FILES_APM} -type f \
		-exec ${SED} -i '' -e 's|#!/bin/bash|#!${LOCALBASE}/bin/bash|' \
				-e 's|#!/usr/bin/python|#!${LOCALBASE}/bin/python2.7|' \
				-e 's|exec python|exec python2.7|' {} ';'
	cd ${WRKSRC}/apm/node_modules/atom-package-manager/node_modules/npm/node_modules/node-gyp && \
		${FIND} . -type f -name '*.py' -exec ${SED} -i '' \
				-e 's|#!/usr/bin/env python|#!${LOCALBASE}/bin/python2.7|' {} ';'
	${CP} ${WRKDIR}/node-v${APM_NODE_VER}/out/Release/node \
		${WRKSRC}/apm/node_modules/atom-package-manager/bin && \
		${STRIP_CMD} ${WRKSRC}/apm/node_modules/atom-package-manager/bin/node
	cd ${WRKSRC}/apm/node_modules/atom-package-manager && \
		${SETENV} ${MAKE_ENV} \
		npm_config_build_from_source=true \
		npm_config_offline=true \
		npm_config_target=${APM_NODE_VER} \
		npm rebuild --nodedir=${WRKDIR}/node-v${APM_NODE_VER} --verbose --no-progress && \
		${SETENV} ${MAKE_ENV} \
		npm_config_build_from_source=true \
		npm_config_offline=true \
		npm_config_target=${APM_NODE_VER} \
		npm dedupe --nodedir=${WRKDIR}/node-v${APM_NODE_VER} --verbose --no-progress
bootstrap-atom:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		ATOM_RESOURCE_PATH=${WRKSRC} \
		npm_config_target=${ELECTRON_VER} \
		npm_config_ignore_scripts=true \
		npm_config_offline=true \
		./apm/node_modules/atom-package-manager/bin/apm install
	# cd ${WRKSRC} && ${FIND} . -name '*.orig' -print -delete
	for p in ${PATCHDIR}/atom/patch-*; do \
		${PATCH} -p0 -d ${WRKSRC} < $${p}; \
	done
	${MKDIR} ${WRKSRC}/node_modules/vscode-ripgrep/bin
	${CP} ${LOCALBASE}/bin/rg ${WRKSRC}/node_modules/vscode-ripgrep/bin
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		ATOM_RESOURCE_PATH=${WRKSRC} \
		npm_config_target=${ELECTRON_VER} \
		npm_config_offline=true \
		./apm/node_modules/atom-package-manager/bin/apm rebuild
clean-backup:
	cd ${WRKSRC} && ${FIND} . \( -name '*.bak' -o -name '*.orig' -o -name '*~' \) -print -delete

do-build:
	# setup download cache for electron-packager
	${MKDIR} ${WRKSRC}/electron
	cd ${LOCALBASE}/share/electron && \
		zip -q -r ${WRKSRC}/electron/electron-v${ELECTRON_VER}-freebsd-x64.zip .
	cd ${WRKSRC}/electron && \
		${SHA256} -r *-v${ELECTRON_VER}-freebsd-*.zip | \
		${SED} -e 's/ / */' > SHASUMS256.txt-${ELECTRON_VER}
	# build atom
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		npm_config_build_from_source=true \
		npm_config_offline=true \
		./script/build --no-bootstrap

do-install:
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} XDG_DATA_DIRS=${STAGEDIR}${PREFIX}/share \
		npm_config_build_from_source=true \
		npm_config_offline=true \
		./script/build --no-bootstrap --existing-binaries --install=${STAGEDIR}${PREFIX}
.for f in chromedriver mksnapshot v8_context_snapshot_generator
	${RM} ${STAGEDIR}${DATADIR}/${f}
.endfor
	cd ${STAGEDIR}${DATADIR}/resources/app/apm && \
		${FIND} . -type f -name '*.node' -exec ${STRIP_CMD} {} ';'
	cd ${STAGEDIR}${DATADIR}/resources/app.asar.unpacked && \
		${FIND} . -type f -name '*.node' -exec ${STRIP_CMD} {} ';'

do-test:
	# Note: Xvfb or something similar is necessary for headless testing
	# core main process tests
	cd ${WRKSRC} && ${SETENV} ${TEST_ENV} ./script/test
	# bundled package tests
	cd ${WRKSRC} && ${SETENV} ${TEST_ENV} ./script/test --package

# Helper targets for port maintainers
make-npm-cache:
	cd ${WRKDIR} && ${RM} -r .npm
	cd ${WRKSRC}/script && \
		${SETENV} HOME=${WRKDIR} npm install --ignore-scripts
	cd ${WRKSRC}/apm && \
		${SETENV} HOME=${WRKDIR} npm install --ignore-scripts
	cd ${WRKDIR}/.npm && \
		${RM} -r _locks anonymous-cli-metrics.json
	cd ${WRKDIR} && \
		${TAR} -czf atom-npm-cache-${DISTVERSION}${EXTRACT_SUFX} .npm

make-apm-cache:
	cd ${WRKDIR} && ${RM} -r .atom
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		ATOM_RESOURCE_PATH=${WRKSRC} \
		npm_config_target=${ELECTON_VER} \
		npm_config_ignore_scripts=true \
		${WRKSRC}/apm/node_modules/atom-package-manager/bin/apm install
	cd ${WRKSRC}/node_modules && \
		for p in `${AWK} '/packageDependencies.*{/,/}/' ${WRKSRC}/package.json | \
			${SED} -e '1d; $$d' | ${AWK} -F ': ' '{print $$1}' | ${SED} -e 's/"//g'`; do \
			echo "Installing modules for $${p}"; \
			cd ${WRKSRC}/node_modules/$${p} && ${SETENV} ${MAKE_ENV} \
				ATOM_RESOURCE_PATH=${WRKSRC} \
				npm_config_target=${ELECTON_VER} \
				npm_config_ignore_scripts=true \
				${WRKSRC}/apm/node_modules/atom-package-manager/bin/apm install; \
		done
	cd ${WRKDIR}/.atom && \
		${RM} -r .node-gyp packages
	cd ${WRKDIR}/.atom/.apm && \
		${RM} -r .apmrc _locks anonymous-cli-metrics.json index-v5
	cd ${WRKDIR} && \
		${TAR} -czf atom-apm-cache-${DISTVERSION}${EXTRACT_SUFX} .atom

.include <bsd.port.mk>
