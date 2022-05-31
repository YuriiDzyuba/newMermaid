import { Renderer } from './renderer';
import { mrdParser } from './mrdParser';
import { rendererConfig } from './rendererConfig';
import * as path from 'path';

const diagram = mrdParser(path.join(__dirname, 'source.mrd'));

const render = new Renderer(diagram, rendererConfig);
render.printDiagram();
