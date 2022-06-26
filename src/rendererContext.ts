import { Renderer } from './types/renderer';
import { Syntax } from './types/syntax';
import { SequenceRenderer } from './sequence/sequence.renderer';
import { sequenceRendererConfig } from './sequence/config/sequenceRenderer.config';
import { FlowchartRenderer } from './flowchart/flowchart.renderer';

export class RendererContext {
  private renderer: Renderer

  constructor(syntax, parsedMrd) {
    this.setRenderer(syntax, parsedMrd)
  }

  private setRenderer(syntax, parsedMrd) {

    switch (syntax) {
      case Syntax.SEQUENCE:
        this.renderer = new SequenceRenderer(parsedMrd, sequenceRendererConfig);
        break;
      case Syntax.FLOWCHART:
        this.renderer = new FlowchartRenderer(parsedMrd, "sdd");
        break;
      default:
        throw new Error('cant find renderer');
    }
  }

  render (): Buffer {
    return this.renderer.render()
  }
}