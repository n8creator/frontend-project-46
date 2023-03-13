#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two config files and shows difference')
  .version('0.1.1', '-V, --version', 'output the version number');

program.parse();
