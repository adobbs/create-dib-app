import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Get the path to the templates directory
 */
export function getTemplateDir(): string {
  // When running from dist/, templates are two levels up
  return path.join(__dirname, '../../templates/default');
}

/**
 * Copy template directory to target location
 */
export async function copyTemplate(targetDir: string): Promise<void> {
  const templateDir = getTemplateDir();

  if (!await fs.pathExists(templateDir)) {
    throw new Error(`Template directory not found at ${templateDir}`);
  }

  await fs.copy(templateDir, targetDir, {
    overwrite: false,
    errorOnExist: false,
  });
}

/**
 * Replace template variables in a file
 */
export async function replaceInFile(
  filePath: string,
  replacements: Record<string, string>
): Promise<void> {
  let content = await fs.readFile(filePath, 'utf-8');

  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    content = content.replace(regex, value);
  }

  await fs.writeFile(filePath, content, 'utf-8');
}

/**
 * Check if directory exists and is empty
 */
export async function isDirectoryEmpty(dirPath: string): Promise<boolean> {
  if (!await fs.pathExists(dirPath)) {
    return true;
  }

  const files = await fs.readdir(dirPath);
  return files.length === 0;
}

/**
 * Ensure directory exists
 */
export async function ensureDir(dirPath: string): Promise<void> {
  await fs.ensureDir(dirPath);
}
