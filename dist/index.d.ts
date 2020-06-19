/// <reference types="react" />
import { Node } from "slate";
import { Method } from "axios";
import "./index.less";
interface Props<T> {
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
interface UploadConfig<T = any> {
    name?: string;
    accept?: string;
    action: string;
    method?: Method;
    beforeUpload?: (file: File) => boolean | Promise<boolean>;
    transformURL?: (file: File, uploadResponse: T) => string | Promise<string>;
    withCredentials?: boolean;
    headers?: object;
    data?: object;
}
declare function Index<T>(props: Props<T>): JSX.Element;
declare namespace Index {
    var serialize: typeof import("./utils").serialize;
    var deserialize: typeof import("./utils").deserialize;
}
export default Index;
