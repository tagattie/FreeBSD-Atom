# $FreeBSD$

PORTNAME=	atom
DISTVERSIONPREFIX=	v
DISTVERSION=	1.41.0
CATEGORIES=	editors
MASTER_SITES=	https://nodejs.org/dist/v${APM_NODE_VER}/:node \
		https://github.com/tagattie/FreeBSD-Atom/releases/download/${DISTVERSIONPREFIX}${DISTVERSION}/:npm_cache
DISTFILES=	node-v${APM_NODE_VER}${EXTRACT_SUFX}:node \
		atom-npm-cache-${DISTVERSION}${EXTRACT_SUFX}:npm_cache

MAINTAINER=	maintainer@example.com
COMMENT=	Hackable text editor for the 21st century

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE.md

EXTRACT_DEPENDS=	zip:archivers/zip \
		electron:devel/electron4
BUILD_DEPENDS=	${UNZIP_CMD}:archivers/unzip \
		rg:textproc/ripgrep \
		node:www/node10 \
		npm:www/npm-node10
LIB_DEPENDS=	libatk-bridge-2.0.so:accessibility/at-spi2-atk \
		libsnappy.so:archivers/snappy \
		libFLAC.so:audio/flac \
		libopus.so:audio/opus \
		libinotify.so:devel/libinotify \
		libnotify.so:devel/libnotify \
		libpci.so:devel/libpci \
		libdrm.so:graphics/libdrm \
		libwebp.so:graphics/webp \
		libavcodec.so:multimedia/ffmpeg \
		libopenh264.so:multimedia/openh264 \
		libfreetype.so:print/freetype2 \
		libharfbuzz.so:print/harfbuzz \
		libsecret-1.so:security/libsecret \
		libnss3.so:security/nss \
		libfontconfig.so:x11-fonts/fontconfig
RUN_DEPENDS=	xdg-open:devel/xdg-utils \
		bash:shells/bash
TEST_DEPENDS=	bash:shells/bash

USES=		desktop-file-utils gnome jpeg localbase:ldflags python:2.7 \
		shebangfix

USE_GITHUB=	yes

APM_NODE_VER=	10.2.1
ELECTRON_CACHE_VER=	4.2.7	# version specified in ${WRKSRC}/package.json
ELECTRON_TARGET_VER=	4.2.12	# version of port "devel/electron4"

BINARY_ALIAS=	python=${PYTHON_CMD}

USE_GNOME=	atk pango gtk30 libxml2 libxslt
INSTALLS_ICONS=	yes

USE_LDCONFIG=	${DATADIR}

SHEBANG_FILES=	atom.sh
SHEBANG_FILES_APM=	apm/node_modules/atom-package-manager/bin/apm \
			apm/node_modules/atom-package-manager/bin/npm \
			apm/node_modules/atom-package-manager/bin/python-interceptor.sh \
			apm/node_modules/atom-package-manager/script/postinstall.sh

post-extract:
	# create electron distribution zip archives
	${MKDIR} ${WRKDIR}/electron-dist
	cd ${LOCALBASE}/share/electron && \
		zip -q -r ${WRKDIR}/electron-dist/electron-v${ELECTRON_CACHE_VER}-freebsd-x64.zip .
	cd ${WRKDIR}/electron-dist && \
		${CP} electron-v${ELECTRON_CACHE_VER}-freebsd-x64.zip \
			chromedriver-v${ELECTRON_CACHE_VER}-freebsd-x64.zip && \
		${CP} electron-v${ELECTRON_CACHE_VER}-freebsd-x64.zip \
			mksnapshot-v${ELECTRON_CACHE_VER}-freebsd-x64.zip && \
		${SHA256} -r *-v${ELECTRON_CACHE_VER}-freebsd-*.zip | \
			${SED} -e 's/ / */' > SHASUMS256.txt
	# setup download cache for electron-download
	${MKDIR} ${WRKDIR}/.cache/electron
.for i in chromedriver electron mksnapshot
	${CP} ${WRKDIR}/electron-dist/${i}-v${ELECTRON_CACHE_VER}-freebsd-x64.zip \
		${WRKDIR}/.cache/electron
.endfor
	${CP} ${WRKDIR}/electron-dist/SHASUMS256.txt \
		${WRKDIR}/.cache/electron/SHASUMS256.txt-${ELECTRON_CACHE_VER}
	# setup download cache for electron-packager
	${MKDIR} ${WRKSRC}/electron
.for i in electron
	${CP} ${WRKDIR}/electron-dist/${i}-v${ELECTRON_CACHE_VER}-freebsd-x64.zip \
		${WRKSRC}/electron
.endfor
	${CP} ${WRKDIR}/electron-dist/SHASUMS256.txt \
		${WRKSRC}/electron/SHASUMS256.txt-${ELECTRON_CACHE_VER}
	# copy divided bootstrap scripts
	${CP} ${FILESDIR}/bootstrap-part? ${WRKSRC}/script
	${CHMOD} ${BINMODE} ${WRKSRC}/script/bootstrap-part?
	# copy linux keymaps and menus files
	cd ${WRKSRC}/keymaps && ${CP} linux.cson freebsd.cson
	cd ${WRKSRC}/menus && ${CP} linux.cson freebsd.cson

post-patch:
	${REINPLACE_CMD} -e 's|/usr/share|${PREFIX}/share|g' \
		${WRKSRC}/script/lib/install-application.js

do-build: build-apm-node bootstrap-script bootstrap-apm bootstrap-atom \
		clean-backup build-atom

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
		npm rebuild --verbose --no-progress
bootstrap-apm:
	cd ${WRKSRC}/apm && ${SETENV} ${MAKE_ENV} \
		npm install --global-style --ignore-scripts --offline --verbose --no-progress
	cd ${WRKSRC} && ${FIND} ${SHEBANG_FILES_APM} -type f \
		-exec ${SED} -i '' -e 's|#!/bin/bash|#!${LOCALBASE}/bin/bash|' \
				-e 's|exec python|exec python2.7|' {} ';'
	${CP} ${WRKDIR}/node-v${APM_NODE_VER}/out/Release/node \
		${WRKSRC}/apm/node_modules/atom-package-manager/bin && \
		${STRIP_CMD} ${WRKSRC}/apm/node_modules/atom-package-manager/bin/node
	cd ${WRKSRC}/apm/node_modules/atom-package-manager && \
		${SETENV} ${MAKE_ENV} \
		npm_config_build_from_source=true \
		npm_config_offline=true \
		npm_config_target=${APM_NODE_VER} \
		npm rebuild --verbose --no-progress && \
		${SETENV} ${MAKE_ENV} \
		npm_config_build_from_source=true \
		npm_config_offline=true \
		npm_config_target=${APM_NODE_VER} \
		npm dedupe --verbose --no-progress
bootstrap-atom:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		npm install --ignore-scripts --offline --verbose --no-progress
	# cd ${WRKSRC} && ${FIND} . -name '*.orig' -print -delete
	for p in ${PATCHDIR}/atom/patch-*; do \
		${PATCH} -p0 -d ${WRKSRC} < $${p}; \
	done
	${MKDIR} ${WRKSRC}/node_modules/vscode-ripgrep/bin
	${CP} ${LOCALBASE}/bin/rg ${WRKSRC}/node_modules/vscode-ripgrep/bin
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} \
		npm_config_build_from_source=true \
		npm_config_offline=true \
		npm_config_disturl=https://electronjs.org/headers \
		npm_config_runtime=electron \
		npm_config_target=${ELECTRON_TARGET_VER} \
		npm rebuild --verbose --no-progress
clean-backup:
	cd ${WRKSRC} && ${FIND} . \( -name '*.bak' -o -name '*.orig' -o -name '*~' \) -print -delete
build-atom:
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ./script/build --no-bootstrap

do-install:
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor
	cd ${WRKSRC} && \
		${SETENV} ${MAKE_ENV} XDG_DATA_DIRS=${STAGEDIR}${PREFIX}/share \
		./script/build --no-bootstrap --existing-binaries --install=${STAGEDIR}${PREFIX}
.for f in chromedriver mksnapshot v8_context_snapshot_generator
	${RM} ${STAGEDIR}${DATADIR}/${f}
.endfor

do-test:
	# Note: Xvfb or something similar is necessary for headless testing
	# core main process tests
	cd ${WRKSRC} && ${SETENV} ${TEST_ENV} ./script/test
	# bundled package tests
	cd ${WRKSRC} && ${SETENV} ${TEST_ENV} ./script/test --package

# Helper targets for port maintainers
make-npm-cache:
	cd ${WRKSRC}/script && \
		${SETENV} HOME=${WRKDIR} npm install --ignore-scripts
	cd ${WRKSRC}/apm && \
		${SETENV} HOME=${WRKDIR} npm install --ignore-scripts
	cd ${WRKSRC} && \
		${SETENV} HOME=${WRKDIR} npm install --ignore-scripts
	cd ${WRKDIR} && \
		${TAR} -czf atom-npm-cache-${DISTVERSION}${EXTRACT_SUFX} .npm

.include <bsd.port.mk>
