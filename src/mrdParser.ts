import * as fs from 'fs';
import * as path from 'path'
import { Participant } from "./sequintence/participant";
import { Relation } from "./sequintence/relation";

export class MrdParser {
    path: string
    private participants: Participant[]
    private relations: Relation[]

    constructor(path: string) {
        this.path = path
        this.parseMrd(this.path)
    }

    checkPath(path) {
        if (true) {
            this.path = path
        }
    }

    private getSourceAndTargetNamesAndIndexes (string) {
        let relationDirection = string.substring(
            string.indexOf(`(`) + 1,
            string.lastIndexOf(`)`)
        );

        const splittedDirection = relationDirection.split('>>')

        const sourceName = splittedDirection[0].trim()
        const targetName = splittedDirection.pop().trim()

        const sourceIndex = this.participants.find(e => e.name === sourceName)
        const targetIndex = this.participants.find(e => e.name === targetName)

        console.log(this.participants)
        console.log(sourceName)
        console.log(targetName)

        // @ts-ignore
        return { sourceName, targetName, sourceIndex: sourceIndex.order, targetIndex: targetIndex.order }
    }

    private getRelationName (string) {
        return string.substring(
            string.indexOf(`"`) + 1,
            string.lastIndexOf(`"`)
        );
    }

    parseMrd(pathToFile) {
        const fileContent = fs.readFileSync(path.join(__dirname, './source.mrd'), 'utf-8')
        const splitted = fileContent.split(`\n`)
        const [ diagramType, ...diagramBody ] = splitted.map((e)=>e.trim())

        if (diagramType!='sequenceDiagram'){
          throw new Error('unimplemented diagram format')
        }

        diagramBody.forEach((e,i)=>{
            let splittedString = e.split(':')

            switch (splittedString[0].trim()) {
                case 'part':
                    this.participants
                        ? this.participants.push(new Participant(splittedString[1].trim(), i))
                        : this.participants = [new Participant(splittedString[1].trim(), i)]
                    break;
                case 'rel':
                    const { sourceName, targetName, sourceIndex, targetIndex } = this.getSourceAndTargetNamesAndIndexes(splittedString[1])
                    const relationName = this.getRelationName(splittedString[1])

                    this.relations
                        ? this.relations.push(new Relation(sourceName, targetName, sourceIndex, targetIndex, relationName))
                        : this.relations = [new Relation(sourceName, targetName, sourceIndex, targetIndex, relationName)]
                    break;
            }
        })
    }

    createDiagramStructure () {
        return {
            participants: this.participants,
            relations: this.relations
        }
    }
}