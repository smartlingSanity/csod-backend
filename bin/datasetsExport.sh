#!/usr/bin/env bash

## gets current date in MM-DD-YYYY format ##
currDate=$(date +"%m-%d-%y")
 
## export both datasets ##
echo "Exporting stage and prod datasets"
sanity dataset export us--stage ./backups/us--stage--$currDate.tar.gz &
sanity dataset export us--prod ./backups/us--prod--$currDate.tar.gz 
 
## open up OneDrive ##
echo "Upload us--prod--$currDate.tar.gz export to OneDrive"
open https://csod365-my.sharepoint.com/personal/ejohnson_csod_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fejohnson%5Fcsod%5Fcom%2FDocuments%2FProject%20Jam%20Dataset%20Backups
open ./backups