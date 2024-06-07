@echo off
del Packages
del Packages.iphoneos-arm
del iphoneos-arm64 -o Packages.iphoneos-arm6
python dpkg-scanpackages.py -a iphoneos-arm -o Packages.iphoneos-arm debs
python dpkg-scanpackages.py -a iphoneos-arm64 -o Packages.iphoneos-arm64 debs
