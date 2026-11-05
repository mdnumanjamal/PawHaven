# PawHaven — Pet Adoption Website

## How to run
1. Extract this ZIP file.
2. Open the `PawHaven-Website` folder in Visual Studio Code.
3. Open `index.html` with Live Server (or double-click `index.html`).
4. Click **Meet the Pets** and choose **View profile** on any pet.

## Pet profile behavior
Each pet card opens the same `pet-details.html` page with a different URL value:
- `pet-details.html?pet=bruno`
- `pet-details.html?pet=luna`
- `pet-details.html?pet=coco`
- `pet-details.html?pet=rocky`
- `pet-details.html?pet=misty`
- `pet-details.html?pet=peanut`

The profile content is loaded from `script.js`. The adoption button also carries the selected pet into the adoption form.

## Files
- HTML files: website pages
- `style.css`: shared green/orange styling
- `script.js`: pet profiles, navigation highlight, search/filter and demo form messages

## Important
This is a front-end student project. Forms show demo messages but do not save applications, create accounts, send emails or authenticate users. A backend and database are needed for those features. Pet descriptions and care information are sample content; verify details with a real shelter before adoption.
