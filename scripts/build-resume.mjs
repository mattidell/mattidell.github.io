import fs from 'node:fs';
import path from 'node:path';
import nunjucks from 'nunjucks';

const rootDir = process.cwd();
const templateDir = path.join(rootDir, 'templates');
const templateFile = 'index.njk';
const dataFile = path.join(rootDir, 'resume.json');
const outputFile = path.join(rootDir, 'index.html');

const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));

const env = nunjucks.configure(templateDir, {
  autoescape: true,
  trimBlocks: true,
  lstripBlocks: true
});

const html = env.render(templateFile, data);
fs.writeFileSync(outputFile, html, 'utf8');

console.log(`Generated ${path.relative(rootDir, outputFile)} from ${path.relative(rootDir, dataFile)} + ${path.join('templates', templateFile)}`);
