import {Node, Editor, Element} from "slate";
import {ReactEditor} from "slate-react";

export function serialize(value: Node[]): string {
    return value.map((n: Node) => Node.string(n)).join("\n");
}

export function deserialize(str?: string): Node[] {
    if (str) {
        str.split("\n").map((line: string) => {
            return {
                children: [{text: line}],
            };
        });
    } else {
        return [{type: "paragraph", children: [{text: ""}]}];
    }
}

export function file2Base64(file: File | Blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", () => resolve(reader.result));
        reader.addEventListener("error", () => reject());
    }).then(
        (value: any) => {
            return value as string;
        },
        () => {
            return "";
        }
    );
}

export const withImages = (editor: Editor & ReactEditor) => {
    const {isVoid} = editor;
    editor.isVoid = (element: Element) => (element.type === "image" ? true : isVoid(element));
    return editor;
};

export const createUploadFormData = async (file: File, name: string = "file", data: object = {}): Promise<FormData> => {
    const formData = new FormData();
    formData.append(name, file);
    Object.keys(data).forEach((_: string) => {
        if (_ !== name) {
            formData.append(_, data[_]);
        }
    });
    return formData;
};
