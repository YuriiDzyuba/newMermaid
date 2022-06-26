import * as path from 'path';
import * as fs from "fs";

import { SequenceRenderer } from './sequence/sequence.renderer';
import { rendererConfig } from './sequence/config/renderer.config';
import { mrdSyntaxParser } from './mrdSyntaxParser';
import { getSyntaxAndBody } from './getSyntaxAndBody';
import { ParsedSequenceMrd } from './sequence/types/parsedSequenceMrd';


const mdrSourceContent = fs.readFileSync(path.join(__dirname, 'flowchartSource.mrd'), 'utf-8');

const { syntax, body } = getSyntaxAndBody(mdrSourceContent);

const parsedMrd = mrdSyntaxParser(syntax, body);

const render = new SequenceRenderer(parsedMrd as ParsedSequenceMrd, rendererConfig);
render.printDiagram();
