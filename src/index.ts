import { Renderer } from './renderer';
import { mrdParser } from './mrdParser';
import { defaultRendererConfig } from './sequintence/DefaultRendererConfig';
import * as path from 'path';

const diagram = mrdParser(path.join(__dirname, 'source.mrd'));

const render = new Renderer(diagram, defaultRendererConfig);
render.printDiagram();
