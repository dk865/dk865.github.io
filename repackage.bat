@echo off
del Packages
python dpkg-scanpackages.py -o Packages debs
