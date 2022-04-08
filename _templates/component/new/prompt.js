/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const chalk = require('chalk');

module.exports = {
  prompt: ({ prompter, args }) => {
    return prompter
      .prompt([
        {
          type: 'select',
          name: 'component',
          message: 'Please select a component type',
          choices: ['atoms', 'molecules', 'organisms'],
        },
        {
          type: 'input',
          name: 'name',
          message: 'Please enter the component name',
          validate: input => {
            return input === '' ? 'Component name is required' : true;
          },
        },
        {
          type: 'confirm',
          name: 'confirm',
          message: 'Do you want to create a component?',
          initial: true,
        },
      ])
      .then(({ confirm, ...res }) => {
        if (!confirm) {
          console.log(chalk.keyword('orange')('Aborted component creation'));
          process.exit();
        }
        console.log(res);
        return res;
      });
  },
};
