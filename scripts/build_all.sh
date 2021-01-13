#!/usr/bin/env bash

ng build core &&
# Copy Core output to be used in other projects
npm run copyDist &&
### AVATAR ###
ng build avatar &&
### BADGE ###
ng build badge &&
### LOADER ###
ng build loader &&
npm run copyDist &&
### BUTTON ###
ng build button &&
### FAQ ###
ng build faq &&
### FORM ###
ng build form-field &&
npm run copyDist &&
ng build input &&
ng build select &&
ng build checkbox &&
ng build radio &&
### NAVIGATION ###
ng build nav-toggle &&
# Copy Toggle to be used in other projects
npm run copyDist &&
ng build switcher &&
# Copy Switcher to be used in other projects
npm run copyDist &&
ng build tabs &&
ng build local-nav &&
ng build mega-menu &&
ng build page-nav &&
ng build list &&
### SNACKBAR ###
ng build snackbar &&
### SLIDE-OVER ###
ng build slide-over &&
### TABLE ###
ng build table &&
### PANEL ###
ng build panel &&
### DIALOG ###
ng build dialog &&
# Copy UI package.json file
cp projects/ui/package.json dist/ui
