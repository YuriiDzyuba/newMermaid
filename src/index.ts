import { Renderer } from './renderer';
import { mrdParser } from './mrdParser';
import { defaultRendererConfig } from './sequintence/DefaultRendererConfig';
import * as path from 'path';

const sourseText = path.join(__dirname, 'source.mrd');
const diagram = mrdParser(sourseText);

const render = new Renderer(diagram, defaultRendererConfig);
render.printDiagram();
