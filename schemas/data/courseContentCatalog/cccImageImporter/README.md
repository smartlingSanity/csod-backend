## Overview
Once per quarter, the courses in the CCC will be updated
First the courses will be updated via a process described in the wiki. Then the images will need to be
updated using the steps below.

## Instructions
Download CCC courses image file from OneDrive:
https://csod365-my.sharepoint.com/:u:/g/personal/ejohnson_csod_com/ES4XUkunSBROp4Z8yeqR8mEBdvgBcFM8dOB3csllbBRVTA?e=qhLv8z

You may need to check with Stanley Lam to get an updated zip file.

The zip file should have around 30,000 images in it.

## Token
Get a new Sanity write token from https://manage.sanity.io 

Look under Settings > API

Put it in `sanityWriteToken.json`

## Update the dataset
To avoid accidentally updating production or stage, I manually specified the 
dataset in each of the script files. You'll need to update it there.

## Check to matching images
If you want you can run the `cccImageMatchReport` to check
to see how many courses have matching image file names in the directory 
you unzipped the above zip file to.

`node cccImageMatchReport.js [path-to-unzipped-images]`

## Upload the images 

`node cccImageImporter.js [path-to-unzipped-images]`