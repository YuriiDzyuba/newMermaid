import { Syntax } from './types/syntax';
import { sequenceSyntaxParser } from './sequence/sequenceSyntax.parser';
import { flowchartSyntaxParser } from './flowchart/flowchartSyntaxParser';
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