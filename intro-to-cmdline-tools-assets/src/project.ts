import {makeProject} from '@motion-canvas/core';

import commit_testing from './scenes/commit-testing?scene';
import terminal_testing from './scenes/terminal-testing?scene';

export default makeProject({
  scenes: [
      // commit_testing,
      terminal_testing,
  ],
});
