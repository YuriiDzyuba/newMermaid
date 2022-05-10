import { Renderer } from './src/renderer'
import { MrdParser } from "./src/mrdParser";

const parser = new MrdParser('sdsd')

const render = new Renderer(parser.createDiagramStructure())
render.printDiagram()