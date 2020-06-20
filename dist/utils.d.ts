import { Node, Editor } from "slate";
import { ReactEditor } from "slate-react";
export declare function serialize(value: Node[]): string;
export declare function deserialize(str: string): Node[];
export declare function escapeHTML(node: Node | Node[]): string;
export declare function file2Base64(file: File | Blob): Promise<string>;
export declare const withImages: (editor: Editor & ReactEditor) => Editor & ReactEditor;
export declare const createUploadFormData: (file: File, name?: string, data?: object) => Promise<FormData>;
