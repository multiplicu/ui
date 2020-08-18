#!/usr/bin/env bash

ng build core --prod &&
# Copy Core output to be used in other projects
npm run copyDist &&
### AVATAR ###
ng build avatar --prod &&
### BADGE ###
ng build badge --prod &&
### BUTTON ###
ng build button --prod &&
### FAQ ###
ng build faq --prod &&
### FORM ###
ng build form-field --prod &&
ng build input --prod &&
ng build checkbox --prod &&
### NAVIGATION ###
ng build nav-toggle --prod &&
# Copy Toggle to be used in other projects
npm run copyDist &&
ng build switcher --prod &&
# Copy Switcher to be used in other projects
npm run copyDist &&
ng build tabs --prod &&
ng build local-nav --prod &&
ng build mega-menu --prod &&
ng build page-nav --prod &&
ng build list --prod &&
### SNACKBAR ###
ng build snackbar --prod &&
# Copy UI package.json file
cp projects/ui/package.json dist/ui
