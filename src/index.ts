import * as path from 'path';
import * as fs from "fs";

import { mrdSyntaxParser } from './mrdSyntaxParser';
import { getSyntaxAndBody } from './getSyntaxAndBody';
import { RendererContext } from './rendererContext';


const mdrSourceContent = fs.readFileSync(path.join(__dirname, 'source.mrd'), 'utf-8');

const { syntax, body } = getSyntaxAndBody(mdrSourceContent);

const parsedMrd = mrdSyntaxParser(syntax, body);

const renderer = new RendererContext(syntax, parsedMrd);

renderer.render();
