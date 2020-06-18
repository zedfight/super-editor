import { Node, Editor } from "slate";
import { ReactEditor } from "slate-react";

export function serialize(value: Node[]): string {
  return value.map((n) => Node.string(n)).join("\n");
}

export function deserialize(string: string): Node[] {
  return string.split("\n").map((line) => {
    return {
      children: [{ text: line }],
    };
  });
}

export function file2Base64(file: File | Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject());
  }).then(
    (value: string) => {
      return value;
    },
    () => {
      return "";
    }
  );
}

export const withImages = (editor: Editor & ReactEditor) => {
  const { isVoid } = editor;
  editor.isVoid = (element) =>
    element.type === "image" ? true : isVoid(element);
  return editor;
};

export const createUploadFormData = async (
  file: File,
  name: string = "file",
  data: object = {}
): Promise<FormData> => {
  const formData = new FormData();
  formData.append(name, file);
  Object.keys(data).forEach((_) => {
    if (_ !== name) {
      formData.append(_, data[_]);
    }
  });
  return formData;
};
