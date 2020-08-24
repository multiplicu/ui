#!/usr/bin/env bash

ng build core &&
# Copy Core output to be used in other projects
npm run copyDist &&
### AVATAR ###
ng build avatar &&
### BADGE ###
ng build badge &&
### BUTTON ###
ng build button &&
### FAQ ###
ng build faq &&
### FORM ###
ng build form-field &&
ng build input &&
ng build checkbox &&
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
# Copy UI package.json file
cp projects/ui/package.json dist/ui
