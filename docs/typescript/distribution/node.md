# ITK-Wasm in a Node.js application

An `itk-convert` command line interface (CLI) example demonstrates how to use ITK-Wasm in a Node.js application. Find the full example in the `ITK-Wasm/examples/node-js` [directory of the GitHub repository](https://github.com/InsightSoftwareConsortium/ITK-Wasm/tree/main/examples/node-js).

This example assumes you are creating a [Node.js package](https://docs.npmjs.com/getting-started/what-is-npm). If you do not already have a `package.json` file, [create one](https://docs.npmjs.com/getting-started/using-a-package.json), first.

Add packages to your project's dependencies:

```sh
npm install --save itk-wasm @itk-wasm/image-io @itk-wasm/mesh-io
```

This adds `itk-wasm` and ITK-Wasm IO packages to the `dependencies` section of your *package.json* file:

```js
{
  "name": "itk-convert",
  "version": "3.0.0",
  "description": "Convert image or mesh files from one format to another.",
  "type": "module",
[...]
  "dependencies": {
    "@itk-wasm/image-io": "^1.6.0",
    "@itk-wasm/mesh-io": "^1.7.0",
    "commander": "^11.1.0",
    "itk-wasm": "^1.0.0-b.188"
  }
}
```

Next, call functions like [`readImageNode`](https://itk-wasm-image-io-docs-js.on.fleek.co/#/?id=readimagenode) or [`writeImageNode`](https://itk-wasm-image-io-docs-js.on.fleek.co/#/?id=writeimagenode).

For example,

```js
import { readImageNode, writeImageNode } from '@itk-wasm/image-io'
import { readMeshNode, writeMeshNode, extensionToMeshIo } from '@itk-wasm/mesh-io'
import { getFileExtension } from 'itk-wasm'

const extension = getFileExtension(inputFile).toLowerCase()
const isMesh = extensionToMeshIo.has(extension)

try {
  if (isMesh) {
    const mesh = await readMeshNode(inputFile)
    await writeMeshNode(mesh, outputFile)
  } else {
    const image = await readImageNode(inputFile)
    await writeImageNode(image, outputFile)
  }
} catch (error) {
  console.error('Error during conversion:\n')
  console.error(error)
}
```
