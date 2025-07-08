import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends:['next/core-web-vitals', 'next/typescript','prettier'],
    plugins:['prettier'],
    rules:{
      'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
      'jsx-quotes': ['error', 'prefer-single']
    }
  }),
   
];

export default eslintConfig;
