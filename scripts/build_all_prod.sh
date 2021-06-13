#!/usr/bin/env bash

ng build core --configuration production &&
# Copy Core output to be used in other projects
npm run copyDist &&
### AVATAR ###
ng build avatar --configuration production &&
### BADGE ###
ng build badge --configuration production &&
### LOADER ###
ng build loader --configuration production &&
npm run copyDist &&
### BUTTON ###
ng build button --configuration production &&
### FAQ ###
ng build faq --configuration production &&
### FORM ###
ng build form-field --configuration production &&
npm run copyDist &&
ng build input --configuration production &&
ng build select --configuration production &&
ng build checkbox --configuration production &&
ng build radio --configuration production &&
### NAVIGATION ###
ng build nav-toggle --configuration production &&
ng build stepper --configuration production &&
# Copy Toggle to be used in other projects
npm run copyDist &&
ng build switcher --configuration production &&
# Copy Switcher to be used in other projects
npm run copyDist &&
ng build tabs --configuration production &&
ng build local-nav --configuration production &&
ng build mega-menu --configuration production &&
ng build page-nav --configuration production &&
ng build list --configuration production &&
### SNACKBAR ###
ng build snackbar --configuration production &&
### SLIDE-OVER ###
ng build slide-over --configuration production &&
### SORT ###
ng build sort --configuration production &&
### TABLE ###
ng build table --configuration production &&
### PANEL ###
ng build panel --configuration production &&
### FEEDBACK ###
ng build banner --configuration production &&
ng build dialog --configuration production &&
ng build toast --configuration production &&
# Copy UI package.json file
cp projects/ui/package.json dist/ui
