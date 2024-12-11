#!/usr/bin/env node

'use strict'

import boxen from "boxen";
import chalk from "chalk";
import inquirer from "inquirer";
import clear from "clear";
import open from "open";
import fs from 'fs';
import request from 'request';
import path from 'path';
import ora from 'ora';
import cliSpinners from 'cli-spinners';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
clear();

const prompt = inquirer.createPromptModule();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const styledDataFilename = 'personal-info.json';

try {
    const res = fs.readFileSync(
        path.resolve(__dirname, `../${styledDataFilename}`)
    );
    const infoData = JSON.parse(res);

    const {
        full_name,
        job_title,
        handle,
        github_link,
        x_link,
        linkedin_link,
        github_handle,
        twitter_handle,
        linkedin_handle,
        email,
        website_link,
        company_name
    } = infoData;

  

    const data = {
        name: chalk.bold.green(`                 ${full_name} `),
        handle: chalk.white(`@${handle}`),
        work: `${chalk.white(`${job_title}`)} ${chalk
            .hex("#0F3460")
            .bold(company_name)}`,
        twitter: chalk.gray(`${x_link}`) + chalk.cyan(`${twitter_handle}`),
        github: chalk.gray(`${github_link}`) + chalk.green(`${github_handle}`),
        linkedin: chalk.gray(`${linkedin_link}`) + chalk.blue(`${linkedin_handle}`),
        web: chalk.cyan(`${website_link}`),
        npx: chalk.red("npx") + " " + chalk.white(`${handle}`),
        separator: chalk.hex("#E94560")(":"),
        labelWork: chalk.white.bold("       Work"),
        labelTwitter: chalk.white.bold("    Twitter"),
        labelGitHub: chalk.white.bold("     GitHub"),
        labelLinkedIn: chalk.white.bold("   LinkedIn"),
        labelWeb: chalk.white.bold("        Web"),
        labelCard: chalk.white.bold("       Card")
    };

    const me = boxen(
        [
            `                  ${data.name}`,
            ``,
            `                   ${data.labelWork}${data.separator}  ${data.work}`,
            ``,
            `                   ${data.labelTwitter}${data.separator}  ${data.twitter}`,
            `                   ${data.labelGitHub}${data.separator}  ${data.github}`,
            `                   ${data.labelLinkedIn}${data.separator}  ${data.linkedin}`,
            `                   ${data.labelWeb}${data.separator}  ${data.web}`,
            ``,
            `                   ${data.labelCard}${data.separator}  ${data.npx}`,
            ``,
            `${chalk.italic(
                "I am currently looking for new opportunities, my inbox is always open. Whether you have a"
            )}`,
            `${chalk.italic(
                "        question or just want to say hi, I will try my best to get back to you!"
            )}`,
        ].join("\n"),
        {
            margin: 1,
            float: 'center',
            padding: 1,
            borderStyle: "single",
            borderColor: "green"
        }
    );

    console.log(me);
    const tip = [
        `Tip: Try ${chalk.cyanBright.bold(
            "cmd/ctrl + click"
        )} on the links above`,
        '',
    ].join("\n");
    console.log(tip);

    // prompt(questions).then(answer => answer.action());
} catch (err) {
    console.log(chalk.bgRed.bold(`Cannot read "${styledDataFilename}" file!`));
    console.log(chalk.italic(err.message));
}
