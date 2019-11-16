# $FreeBSD$

PORTNAME=	atom
DISTVERSION=	1.39.0.g20190522
CATEGORIES=	editors
MASTER_SITES=	https://nodejs.org/dist/v${APM_NODE_VER}/:node
DISTFILES=	node-v${APM_NODE_VER}${EXTRACT_SUFX}:node

MAINTAINER=	maintainer@example.com
COMMENT=	Hackable text editor for the 21st century

LICENSE=	MIT
LICENSE_FILE=	${WRKSRC}/LICENSE.md

EXTRACT_DEPENDS=	zip:archivers/zip \
		git:devel/git \
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

# USE_GITHUB=	yes
GH_TAGNAME=	00362ccd0adbc211c38627f0055e3ff5001f5db9
WRKSRC=		${WRKDIR}/${PORTNAME}

APM_NODE_VER=	10.11.0
ELECTRON_CACHE_VER=	4.2.0	# version specified in ${WRKSRC}/package.json
ELECTRON_TARGET_VER=	4.2.12	# version of port "devel/electron4"

BINARY_ALIAS=	python=${PYTHON_CMD}

USE_GNOME=	atk pango gtk30 libxml2 libxslt
INSTALLS_ICONS=	yes

USE_LDCONFIG=	${DATADIR}

SHEBANG_FILES=	atom.sh

DATADIR=	${PREFIX}/share/atom-dev

post-extract:
	# clone atom repository & checkout electron-4 branch
	# (this is a temorary workaround since atom version with "-dev" \
	# suffix requires the source directory is a git repo to be built)
	cd ${WRKDIR} && git clone https://github.com/atom/atom.git
	cd ${WRKSRC} && git checkout ${GH_TAGNAME}
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

pre-build:
	cd ${WRKDIR}/node-v${APM_NODE_VER} && \
		${SETENV} ${CONFIGURE_ENV} CC=${CC} CXX=${CXX} ./configure && \
		${SETENV} ${MAKE_ENV} ${BSDMAKE} -j ${MAKE_JOBS_NUMBER}

do-build:
	### bootstrap - part 1
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ./script/bootstrap-part1
	${PATCH} -p0 -d ${WRKSRC} < ${FILESDIR}/post-bootstrap-part1.diff
	${MKDIR} ${WRKSRC}/script/node_modules/electron-chromedriver/bin
	${UNZIP_CMD} -qo ${WRKDIR}/.cache/electron/chromedriver-v${ELECTRON_CACHE_VER}-freebsd-x64.zip \
		-d ${WRKSRC}/script/node_modules/electron-chromedriver/bin
	### bootstrap - part 2
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ./script/bootstrap-part2 || ${TRUE}	# script fails at the 1st try
	${PATCH} -p0 -d ${WRKSRC} < ${FILESDIR}/post-bootstrap-part2.diff
	${CP} ${WRKDIR}/node-v${APM_NODE_VER}/out/Release/node \
		${WRKSRC}/apm/node_modules/atom-package-manager/bin
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ./script/bootstrap-part2	# should now succeed
	cd ${WRKSRC}/apm/node_modules/atom-package-manager && \
		${SETENV} ${MAKE_ENV} ./bin/npm rebuild && \
		${SETENV} ${MAKE_ENV} ./bin/npm dedupe
	### bootstrap - part 3
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ./script/bootstrap-part3 --ci || ${TRUE}	# script fails
	${PATCH} -p0 -d ${WRKSRC} < ${FILESDIR}/post-bootstrap-part3.diff
	${MKDIR} ${WRKSRC}/node_modules/vscode-ripgrep/bin
	${CP} ${LOCALBASE}/bin/rg ${WRKSRC}/node_modules/vscode-ripgrep/bin
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ./script/node_modules/.bin/electron-rebuild -v ${ELECTRON_TARGET_VER}
	### clean up backup files
	cd ${WRKSRC} && ${FIND} . \( -name '*.bak' -o -name '*.orig' -o -name '*~' \) -print -delete
	### build
	cd ${WRKSRC} && ${SETENV} ${MAKE_ENV} ./script/build --no-bootstrap

do-install:
	${MKDIR} ${STAGEDIR}${PREFIX}/share/icons/hicolor
	cd ${WRKSRC} && \
		${SETENV} ${MAKE_ENV} XDG_DATA_DIRS=${STAGEDIR}${PREFIX}/share \
		./script/build --no-bootstrap --existing-binaries --install=${STAGEDIR}${PREFIX}

do-test:
	# Note: Xvfb or something similar is necessary for headless testing
	# core main process tests
	cd ${WRKSRC} && ${SETENV} ${TEST_ENV} ./script/test
	# bundled package tests
	cd ${WRKSRC} && ${SETENV} ${TEST_ENV} ./script/test --package

.include <bsd.port.mk>
