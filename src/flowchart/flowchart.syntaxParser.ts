import { ParsedFlowchartMrd } from './types/parsedFlowchartMrd';
import { Node } from './types/node';

export function flowchartSyntaxParser(mdrBody: string[]): ParsedFlowchartMrd {
  const nodes = new Map<string, [Node]>();

  for (const row of mdrBody) {
    if (!row) continue

    let [sourceNode, edgeText, targetNode] = row.split('>>');

    const cleanNodeFrom = sourceNode.trim()
    const cleanTargetNode = targetNode.trim()
    let cleanEdgeText = ''

    edgeText
      ? cleanEdgeText = edgeText.trim()
      : cleanEdgeText = ''

    if (nodes.has(cleanNodeFrom)) {
      let data = nodes.get(cleanNodeFrom)
      data.push({ targetNode: cleanTargetNode, edgeText: cleanEdgeText })
      nodes.set(cleanNodeFrom, data)
    } else {
      nodes.set(cleanNodeFrom, [{ targetNode: cleanTargetNode, edgeText: cleanEdgeText }])
    }
  }

  return nodes
}