import { Renderer } from './renderer';
import { MrdParser } from './mrdParser';
import { rendererConfig } from './rendererConfig';

const parser = new MrdParser('/home/iurii/projects/newMermaid/src/source.mrd');

const diagram = parser.createDiagramStructure();
const render = new Renderer(diagram, rendererConfig);
render.printDiagram();
