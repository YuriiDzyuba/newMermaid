import { Syntax } from './types/syntax';
import { sequenceSyntaxParser } from './sequence/sequence.syntaxParser';
import { flowchartSyntaxParser } from './flowchart/flowchart.syntaxParser';
import { ParsedMrd } from './types/parsedMrd';

export const mrdSyntaxParser = (syntax, body): ParsedMrd => {

  switch (syntax) {
    case Syntax.SEQUENCE:
      return sequenceSyntaxParser(body);
    case Syntax.FLOWCHART:
      return flowchartSyntaxParser(body);
    default:
      throw new Error('unimplemented diagram syntax');
  }
}