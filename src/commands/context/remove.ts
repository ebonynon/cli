import { flags } from '@oclif/command';
import Command from '../../base-command';
import config from '../../modules/config';

export default class RemoveContext extends Command {
  static description = 'Remove a context';

  static flags = {
    help: flags.help({ char: 'h' }),
  };

  static args = [
    {
      name: 'name',
      required: true,
      description: 'Context name to remove',
    },
  ];

  async run() {
    const {
      args: { name: context },
    } = this.parse(RemoveContext);

    const contexts = config.get('contexts');
    const contextExists = Object.keys(contexts).find(
      (name) => name.toLowerCase() === context.toLowerCase()
    );

    if (!contextExists) {
      return this.error(`Invalid context name "${context}"`, { exit: 1 });
    }

    config.set(`contexts.${context}`, undefined);
    this.log(`Context "${context} removed"`);

    // Replace default context if the removed context is set as default
    if (config.get('currentContext') === context) {
      const newDefaultContext = Object.keys(contexts)[0];
      config.set('currentContext', newDefaultContext);
      this.log(`Current context set to "${newDefaultContext}"`);
    }
  }
}
