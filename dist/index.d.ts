/// <reference types="react" />
import { Node } from "slate";
import { serialize, deserialize, file2Base64, escapeHTML, createUploadFormData } from "./utils";
import { Method } from "axios";
import "./index.less";
export interface Props<T> {
    defaultValue?: string;
    value?: Node[];
    onChange?: (value: Node[]) => void;
    placeholder?: string;
    title?: string;
    onTitleChange?: (value: string) => void;
    titlePlaceholder?: string;
    toolbar?: string[];
    uploadConfig?: UploadConfig<T>;
}
export interface UploadConfig<T = any> {
    name?: string;
    action: string;
    method?: Method;
    beforeUpload?: (file: File) => boolean | Promise<boolean>;
    transformURL?: (file: File, uploadResponse: T) => string | Promise<string>;
    withCredentials?: boolean;
    headers?: object;
    data?: object;
}
declare function Index<T>(props: Props<T>): JSX.Element;
export { escapeHTML, deserialize, serialize, createUploadFormData, file2Base64 };
export default Index;
