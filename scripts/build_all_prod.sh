#!/usr/bin/env bash

ng build core --prod &&
# Copy Core output to be used in other projects
npm run copyDist &&
### AVATAR ###
ng build avatar --prod &&
### BADGE ###
ng build badge --prod &&
### LOADER ###
ng build loader --prod &&
npm run copyDist &&
### BUTTON ###
ng build button --prod &&
### FAQ ###
ng build faq --prod &&
### FORM ###
ng build form-field --prod &&
npm run copyDist &&
ng build input --prod &&
ng build select --prod &&
ng build checkbox --prod &&
ng build radio --prod &&
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
### SLIDE-OVER ###
ng build slide-over --prod &&
### TABLE ###
ng build table --prod &&
### PANEL ###
ng build panel --prod &&
### DIALOG ###
ng build dialog --prod &&
# Copy UI package.json file
cp projects/ui/package.json dist/ui
