#!/bin/bash

MSG=${1:-"chore: update"}

git add .
git commit -m "$MSG"
git push origin main
