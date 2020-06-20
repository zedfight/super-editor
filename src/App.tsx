import React, { useState } from "react";
import ReactDOM from "react-dom";
import App, { serialize, deserialize, escapeHTML } from "../src/index";
// import Editor from "../dist/index";
// import "../dist/index.css";

const uploadConfig = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    // transformURL: (file, response) => response?.url
};

const Index = () => {
    const [value, setValue] = useState([{ type: "paragraph", children: [{ text: "" }] }]);
    const [title, setTitle] = useState<string | undefined>(undefined);

    console.info(serialize(value));
    console.info(deserialize(serialize(value)));
    console.info(escapeHTML(value));

    return <App
        value={value}
        onChange={setValue as any}
        placeholder="请输入内容"
        titlePlaceholder="请输入标题"
        title={title}
        onTitleChange={setTitle}
        uploadConfig={uploadConfig}
    />;
};

const rootElement: HTMLDivElement = document.createElement("div");
rootElement.id = "framework-app-root";
document.body.appendChild(rootElement);
ReactDOM.render(<Index />, rootElement);
