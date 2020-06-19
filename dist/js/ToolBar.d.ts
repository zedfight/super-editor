import { Editor, Node } from "slate";
import { ReactEditor } from "slate-react";
export default class ToolBar {
    private editor;
    constructor(editor: Editor & ReactEditor);
    isBold(): boolean;
    isItalic(): boolean;
    isCodeBlock(): boolean;
    isUnderLine(): boolean;
    hasLineThrough(): boolean;
    isImageElement(value: Node): boolean;
    toggleBold(): void;
    toggleItalic(): void;
    toggleCodeBlock(): void;
    toggleUnderLine(): void;
    toggleLineThrough(): void;
    format(): void;
    changeTextLeft(): void;
    changeTextCenter(): void;
    changeTextRight(): void;
    delete(): void;
    insertImage(url: string): void;
    lineBreak(): void;
}
