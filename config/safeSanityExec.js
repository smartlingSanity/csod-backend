/**
 * Below script created to protect developers from
 * making breaking changes to production datasets via localization.
 * Sanity, at the time of this script creation, doesn't
 * have an access key system available to protect access
 * to sensitive or live datasets. Below is a stop-gap
 * until a better system is in place.
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const execa = require('execa');
const readline = require('readline');

const { log } = console;

const sanityJson = path.join(__dirname, '../', 'sanity.json');
const [userDatasetSpec, userProdSpec] = process.argv.slice(2);
const rl = readline.createInterface(process.stdin, process.stdout);

const forgotDatasetSpec = '********* Sanity Dataset Spec required *********\nex: "npm run localize your-dataset-here"';
const forgotProdSpec = "Looks like you're trying to make changes to production, supply 'prod' as second argument after dataset\nex: 'npm run localize prod-dataset-here prod'";
const warning1 = 'You have supplied the "prod" localize argument, if localizing a production dataset \n***** YOU ARE ABOUT TO Make CHANGES THAT WILL EFFECT **LIVE** PRODUCTION DATA *****\nIs this the desired outcome? y/n: ';
const warning2 = '100% sure? You could break things if making large changes y/n: ';

module.exports = function sanitySafeExec(command) {
  function updateSanityJson() {
    fs.readFile(sanityJson, { encoding: 'utf-8' }, async (err, data) => {
      if (err) {
        log(chalk.red(err));
      } else {
        const parsedSanityJson = JSON.parse(data);
        log(chalk.green('Parsed sanity.json'));
        const updatedDatasetSpec = { ...parsedSanityJson.api, ...{ dataset: userDatasetSpec } };
        const fileToWrite = { ...parsedSanityJson, api: updatedDatasetSpec };
        const outputFile = path.join(__dirname, '..', 'sanity.json');
        const output = JSON.stringify(fileToWrite, null, 2);
        fs.writeFileSync(outputFile, output);
        log(chalk.green('Updated sanity.json with provided dataset'));
        try {
          log(chalk.green('localizing: ', userDatasetSpec));
          await execa.command(command, { stdio: 'inherit' });
          process.exit();
        } catch (error) {
          log(chalk.red(error));
          process.exit();
        }
      }
    });
  }

  if (!userDatasetSpec) {
    log(chalk.yellow(forgotDatasetSpec));
    process.exit();
  } else if (userDatasetSpec.includes('prod') && !userProdSpec) {
    log(chalk.yellow(forgotProdSpec));
    process.exit();
  } else if (userDatasetSpec.includes('prod') && userProdSpec) {
    rl.question(chalk.red(warning1), (answer1) => {
      if (answer1 !== 'y') process.exit();
      rl.question(chalk.bold(warning2), (answer2) => {
        if (answer2 === 'y') {
          updateSanityJson();
          rl.close();
        } else process.exit();
      });
    });
  } else {
    updateSanityJson();
  }
};
