import {makeProject} from '@motion-canvas/core';

import commit_testing from './scenes/commit-testing?scene';
import terminal_testing from './scenes/terminal-testing?scene';
import commit_component_debugging from './scenes/commit-component-debugging?scene';
import reflog from './scenes/reflog?scene';

export default makeProject({
  scenes: [
      // commit_testing,
      // terminal_testing,
      // commit_component_debugging
      reflog
  ],
});
