#!/usr/bin/env bash

## gets current date in MM-DD-YYYY format ##
currDate=$(date +"%m-%d-%y")
 
## imports stage dataset into prod dataset ##
echo "Updating prod dataset with stage dataset"
sanity dataset import ./backups/us--stage--$currDate.tar.gz us--prod --replace
echo "Dataset update complete!"
echo "Dataset changes won't be live until the next Netlify deployment"