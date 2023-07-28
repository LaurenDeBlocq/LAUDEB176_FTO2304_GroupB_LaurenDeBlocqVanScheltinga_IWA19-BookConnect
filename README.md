PD = Previous Developer

1. fixed importing and exporting. No files were being imported into scripts and data was not exporting.

2. Most of what PD did seems to have very incorrect notation surrounding query selectors. I'll debug that and
   then see what logic errors might be lurking

3. Created a short cut list of interactive objects (eg search button) that will be dealt with regularly for ease of use.

4. Created a "state" object to help keep track of what's being handled

5. No event handlers were made, therefore the page was not interactive. Handler's to deal with various overlays, buttons, and list items have been created. PD was attempting to create these using .click() or .submit() etc which don't exist.

6. There is already existing CSS to deal with the day vs night (ie dark mode). PD should have just applied the class instead of trying to make a new thing in JS.

7. Created the drop down list for Genres and Authors in the Search feature.

8. I made the choice to clear the form between searches as I think it makes more sense to be starting with a fresh form. This is an easily reversed decision.
