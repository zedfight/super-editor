import escapeHtml from "escape-html";
import {Node, Editor, Element, Text} from "slate";
import {ReactEditor} from "slate-react";

export function serialize(value: Node[]): string {
    return value.map((n: Node) => Node.string(n)).join("\n");
}

export function deserialize(str: string): Node[] {
    return str.split("\n").map((line: string) => {
        return {
            children: [{text: line}],
        };
    });
}

export function escapeHTML(node: Node | Node[]): string {
    const children = "test";
    if (node instanceof Array) {
        return node.map((_: Node) => escapeHTML(_)).join("");
    } else {
        switch (node.type) {
            case "paragraph":
                return `<p>${(node.children as Node[]).map((_: Node) => `<span>${_.text}</span>`).join("")}</p>`;
            case "quote":
                return `<blockquote><p>${(node.children as Node[]).map((_: Node) => _.text)}</p></blockquote>`;
            case "image":
                return `<img href="${node.url as string}"/>`;
            case "link":
                return `<a href="${escapeHtml(node.url as string)}">${children}</a>`;
            default:
                return children;
        }
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
