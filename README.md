AC-Crime-Visualization
======================

A d3.js crime &amp; sentence length by race/ethnicity visualization. This was written for the Austin Cut article "Scraping the Courts."

This code is messy, and I found that little things, like including word-wrapped subtitles and descriptions were a major pain in the ass, code-wise. I've also noticed that this code doesn't work as smoothly in d3.v3, possibly due to some hacks that I used to make the transitions work smoothly in v2.

## Alternative Datasets

To use these alternative datasets, just edit `crime.html` and point to the JS dataset you want to visualize. They are:

- `alternative datasets\dataset_satx_2006_2011.js` I did a dataset based on the Bexar County (San Antonio) Misdemeanor records which are available on the Bexar County Clerk's website in a lomg series of annoying XLS-spreadsheets. I collected the data, calculated the sentence lengths, divided it by ethnicity and prepared it to work with the d3 visualization code.

- `alternative datasets\JUDGES\*.js` In addition to the overall Travis County crime statistics, I also did sub-sets of cases judged by a particular misdemeanor court judge. As you can see, the particular judge makes little difference on the overall case outcomes.