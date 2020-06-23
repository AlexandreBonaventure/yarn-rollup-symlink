const path = require('path');
const rollup = require('rollup');
const nodeResolve = require('@rollup/plugin-node-resolve');
const resolve = require('resolve');
const commonjs = require('@rollup/plugin-commonjs');


const ROOT = __dirname
const resolveFrom = (root, id) => resolve.sync(id, {
    basedir: root,
})
const resolveLinkedDep = (depId, workspaceName) => {
    const workspaceDirname = resolveFrom(ROOT, `${workspaceName}/package.json`)
    return resolveFrom(workspaceDirname, depId)
}
const deps = {
    'focus-trap': resolveLinkedDep('focus-trap', 'lib')
}
console.log(deps);

(async function () {
    try {
        const bundle = await rollup.rollup({
            // preserveSymlinks: true, // you have to enable that for yarn pnp to work
            input: deps,
            plugins: [
                nodeResolve.default({
                    rootDir: ROOT,
                }),
                commonjs(),
            ]
        });
        await bundle.write({
            dir: path.resolve(__dirname, 'dist'),
            format: 'esm',
        })
        
    } catch (e) {
        console.error(e)
    }
})();
