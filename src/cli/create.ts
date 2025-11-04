import chalk from 'chalk';
import ora from 'ora';
import path from 'path';
import { copyTemplate, isDirectoryEmpty, replaceInFile } from '../utils/files.js';
import { promptForProjectInfo } from './prompts.js';
import { execSync } from 'child_process';
import fs from 'fs-extra';

export interface CreateOptions {
  projectName?: string;
}

/**
 * Main function to create a new dib-app project
 */
export async function createProject(options: CreateOptions = {}): Promise<void> {
  console.log(chalk.bold.cyan('\n🎨 create-dib-app\n'));

  // Get project information
  const projectInfo = await promptForProjectInfo(options.projectName);

  if (!projectInfo) {
    console.log(chalk.red('Project creation cancelled'));
    process.exit(1);
  }

  const { projectName, projectPath } = projectInfo;

  // Check if directory already exists and is not empty
  const isEmpty = await isDirectoryEmpty(projectPath);
  if (!isEmpty) {
    console.log(
      chalk.red(
        `\nDirectory ${chalk.bold(projectName)} already exists and is not empty.`
      )
    );
    process.exit(1);
  }

  // Create project directory
  let spinner = ora('Creating project directory...').start();
  try {
    await fs.ensureDir(projectPath);
    spinner.succeed('Created project directory');
  } catch (error) {
    spinner.fail('Failed to create project directory');
    throw error;
  }

  // Copy template files
  spinner = ora('Copying template files...').start();
  try {
    await copyTemplate(projectPath);
    spinner.succeed('Copied template files');
  } catch (error) {
    spinner.fail('Failed to copy template files');
    throw error;
  }

  // Replace template variables
  spinner = ora('Configuring project...').start();
  try {
    const replacements = {
      PROJECT_NAME: projectName,
    };

    // Replace in package.json
    const packageJsonPath = path.join(projectPath, 'package.json');
    if (await fs.pathExists(packageJsonPath)) {
      await replaceInFile(packageJsonPath, replacements);
    }

    // Replace in README.md
    const readmePath = path.join(projectPath, 'README.md');
    if (await fs.pathExists(readmePath)) {
      await replaceInFile(readmePath, replacements);
    }

    // Replace in layout.tsx
    const layoutPath = path.join(projectPath, 'src/app/layout.tsx');
    if (await fs.pathExists(layoutPath)) {
      await replaceInFile(layoutPath, replacements);
    }

    spinner.succeed('Configured project');
  } catch (error) {
    spinner.fail('Failed to configure project');
    throw error;
  }

  // Install dependencies
  spinner = ora('Installing dependencies (this may take a minute)...').start();
  try {
    execSync('npm install', {
      cwd: projectPath,
      stdio: 'pipe',
    });
    spinner.succeed('Installed dependencies');
  } catch (error) {
    spinner.fail('Failed to install dependencies');
    console.log(chalk.yellow('\nYou can install dependencies manually by running:'));
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan('  npm install\n'));
  }

  // Initialize git
  spinner = ora('Initializing git repository...').start();
  try {
    execSync('git init', {
      cwd: projectPath,
      stdio: 'pipe',
    });
    execSync('git add -A', {
      cwd: projectPath,
      stdio: 'pipe',
    });
    execSync('git commit -m "Initial commit from create-dib-app"', {
      cwd: projectPath,
      stdio: 'pipe',
    });
    spinner.succeed('Initialized git repository');
  } catch (error) {
    spinner.warn('Could not initialize git repository');
  }

  // Success message
  console.log(chalk.green.bold('\n✅ Success!\n'));
  console.log(`Created ${chalk.cyan(projectName)} at ${chalk.dim(projectPath)}\n`);
  console.log('Next steps:\n');
  console.log(`  ${chalk.cyan('cd')} ${projectName}`);
  console.log(`  ${chalk.cyan('npm run dev')}\n`);
  console.log('Your prototype workspace will be available at:');
  console.log(chalk.blue('  http://localhost:3000\n'));
  console.log('Happy prototyping! 🎨\n');
}
