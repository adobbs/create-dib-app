#!/usr/bin/env node

import { Command } from 'commander';
import { createProject } from './cli/create.js';
import chalk from 'chalk';

const program = new Command();

program
  .name('create-dib-app')
  .description('CLI tool to scaffold opinionated prototype workspaces')
  .version('0.1.0')
  .argument('[project-name]', 'Name of the project')
  .action(async (projectName?: string) => {
    try {
      await createProject({ projectName });
    } catch (error) {
      console.error(chalk.red('\n❌ Error creating project:'));
      console.error(error);
      process.exit(1);
    }
  });

program.parse();
