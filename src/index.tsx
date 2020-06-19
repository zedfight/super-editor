import React, { useMemo, useState, useCallback, useRef } from "react";
import { createEditor, Node } from "slate";
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from "slate-react";
import { CodeElement, ImageElement, DefaultElement, TextAlignElement, LeafElement } from "./Element";
import { withHistory } from "slate-history";
import ToolBar from "./ToolBar";
import Icon, { IconClass } from "./Icon";
import { serialize, file2Base64, withImages, createUploadFormData } from "./utils";
import axios, { Method, AxiosResponse } from "axios";
import "./index.less";

interface Props {
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    title?: string;
    titlePlaceholder?: string;
    toolbar?: any;
    uploadConfig: UploadConfig;
}

interface UploadConfig {
    name?: string;
    accept?: string;
    action: string;
    method?: Method;
    beforeUpload?: (file: File) => boolean | Promise<boolean>;
    transformURL?: (file: File, uploadResponse: any) => string | Promise<string>;
    withCredentials?: boolean;
    headers?: object;
    data?: object;
}

export default (props: Props) => {
    const { placeholder, titlePlaceholder, uploadConfig } = props;
    const [value, setValue] = useState<Node[]>([
        {
            type: "paragraph",
            children: [{ text: "A line of text in a paragraph." }, { text: "A line of text in a paragraph2." }, { text: "A line of text in a paragraph3." }, { text: "A line of text in a paragraph4." }, { text: "A line of text in a paragraph5." }],
        },
    ]);

    const [title, setTitle] = useState("");
    const uploadRef = useRef<HTMLInputElement>(null);
    const editor = useMemo(() => withHistory(withImages(withReact(createEditor()))), []);
    const toolbar = useMemo(() => new ToolBar(editor), []);

    const handleChange = (newValue: Node[]) => setValue(newValue);

    const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);

    const uploadChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        if (uploadConfig) {
            let canUpload = true;
            if (uploadConfig.beforeUpload) {
                canUpload = await uploadConfig.beforeUpload(file);
            }
            if (canUpload) {
                const formData = await createUploadFormData(file, uploadConfig.name, uploadConfig.data);
                const result = await axios({
                    method: uploadConfig.method || "post",
                    url: uploadConfig.action,
                    data: formData,
                    headers: uploadConfig.headers,
                }).then((_: AxiosResponse) => _.data);

                if (uploadConfig.transformURL) {
                    const url = await uploadConfig.transformURL(file, result);
                    toolbar.insertImage(url);
                } else {
                    await insertBase64Image(file);
                }
            }
        } else {
            await insertBase64Image(file);
        }
    };

    const insertBase64Image = async (file: File) => {
        const base64Data = await file2Base64(file);
        toolbar.insertImage(base64Data);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            toolbar.lineBreak();
        }
        if (event.ctrlKey) {
            switch (event.key) {
                case "`":
                    clickCodeBlock(event);
                    break;
                case "b":
                    clickBold(event);
                    break;
                case "i":
                    clickItalic(event);
                    break;
                case "f":
                    clickFormat(event);
            }
            return;
        }
    };

    const clickFormat = (event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        toolbar.format();
    };

    const clickDelete = (event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        toolbar.delete();
    };

    const clickBold = (event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        toolbar.toggleBold();
    };

    const clickItalic = (event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        toolbar.toggleItalic();
    };

    const clickCodeBlock = (event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        toolbar.toggleCodeBlock();
    };

    const clickLineThrough = (event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        toolbar.toggleLineThrough();
    };

    const clickUnderLine = (event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        toolbar.toggleUnderLine();
    };

    const clickTextLeft = (event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        toolbar.changeTextLeft();
    };

    const clickTextCenter = (event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        toolbar.changeTextCenter();
    };

    const clickTextRight = (event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        toolbar.changeTextRight();
    };

    const clickImage = (event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        uploadRef.current!.value = "";
        uploadRef.current!.click();
    };

    const clickUndo = (event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        editor.undo();
    };

    const clickRedo = (event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        editor.redo();
    };

    const renderLeaf = useCallback((props: RenderLeafProps) => <LeafElement {...props} />, []);

    const renderElement = useCallback((props: RenderElementProps) => {
        switch (props.element.type) {
            case "code":
                return <CodeElement {...props} />;
            case "image":
                return <ImageElement {...props} />;
            case "left":
            case "center":
            case "right":
                return <TextAlignElement {...props} />;
            default:
                return <DefaultElement {...props} />;
        }
    }, []);

    return (
        <div className={`super-editor-container`}>
            <Slate editor={editor} value={value} onChange={handleChange}>
                <div className={`super-editor-toolbar`}>
                    <Icon onMouseDown={clickFormat} type={IconClass.FORMAT} />
                    <Icon onMouseDown={clickDelete} type={IconClass.DELETE} />
                    <em />
                    <Icon onMouseDown={clickUndo} type={IconClass.UNDO} />
                    <Icon onMouseDown={clickRedo} type={IconClass.REDO} />
                    <em />
                    <Icon onMouseDown={clickBold} type={IconClass.BOLD} />
                    <Icon onMouseDown={clickItalic} type={IconClass.ITALIC} />
                    <Icon onMouseDown={clickLineThrough} type={IconClass.DELETE_LINE} />
                    <Icon onMouseDown={clickUnderLine} type={IconClass.UNDERLINE} />
                    <em />
                    <Icon onMouseDown={clickTextLeft} type={IconClass.TEXT_LEFT} />
                    <Icon onMouseDown={clickTextCenter} type={IconClass.TEXT_CENTER} />
                    <Icon onMouseDown={clickTextRight} type={IconClass.TEXT_RIGHT} />
                    <em />
                    <Icon type={IconClass.IMAGE} onMouseDown={clickImage}>
                        <input ref={uploadRef} type="file" className="super-editor-upload" onChange={uploadChange} />
                    </Icon>
                </div>
                <div className={`super-editor-title`}>
                    <input value={title} placeholder={titlePlaceholder} onChange={changeTitle} />
                </div>
                <div className={`super-editor-body`}>
                    <Editable className={`super-editor-table`} onKeyDown={handleKeyDown} renderLeaf={renderLeaf} renderElement={renderElement} />
                    <span className={`super-editor-placeholder ${!serialize(value) ? "visible" : ""}`}>{placeholder}</span>
                </div>
            </Slate>
        </div>
    );
};
