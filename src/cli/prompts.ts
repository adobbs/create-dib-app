import prompts from 'prompts';
import validateNpmPackageName from 'validate-npm-package-name';
import path from 'path';

export interface ProjectAnswers {
  projectName: string;
  projectPath: string;
}

/**
 * Validate project name
 */
function validateProjectName(name: string): string | true {
  if (!name) {
    return 'Project name is required';
  }

  const validation = validateNpmPackageName(name);
  if (!validation.validForNewPackages) {
    const errors = validation.errors || [];
    return errors[0] || 'Invalid project name';
  }

  return true;
}

/**
 * Prompt user for project configuration
 */
export async function promptForProjectInfo(
  initialName?: string
): Promise<ProjectAnswers | null> {
  const response = await prompts(
    [
      {
        type: initialName ? null : 'text',
        name: 'projectName',
        message: 'What is your project named?',
        initial: 'my-prototypes',
        validate: validateProjectName,
      },
    ],
    {
      onCancel: () => {
        console.log('\nCancelled');
        process.exit(0);
      },
    }
  );

  const projectName = initialName || response.projectName;

  if (!projectName) {
    return null;
  }

  const projectPath = path.resolve(process.cwd(), projectName);

  return {
    projectName,
    projectPath,
  };
}
