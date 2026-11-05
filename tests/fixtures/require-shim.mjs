// Preload shim: the shipped dist/index.js is an ncc bundle loaded as an ES
// module (dist/package.json has "type": "module"), but it still evaluates
// eval("require")(...) for some modules, which crashes with
// "require is not defined in ES module scope". Provide a global CommonJS
// require resolved relative to the action entrypoint so the bundle can load.
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const entry = process.argv[1] ? path.resolve(process.argv[1]) : path.join(process.cwd(), 'index.js');
if (typeof globalThis.require === 'undefined') {
  globalThis.require = createRequire(pathToFileURL(entry).href);
}
