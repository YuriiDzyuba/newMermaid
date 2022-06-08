import * as path from 'path';
import * as fs from "fs";

import { Renderer } from './renderer';
import { mrdParser } from './mrdParser';
import { defaultRendererConfig } from './sequintence/DefaultRendererConfig';


const mdrSourceContent = fs.readFileSync(path.join(__dirname, 'source.mrd'), 'utf-8');

const diagram = mrdParser(mdrSourceContent);

const render = new Renderer(diagram, defaultRendererConfig);
render.printDiagram();
