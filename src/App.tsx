import React, {useState} from "react";
import ReactDOM from "react-dom";
import App from "./index";

const uploadConfig = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    // transformURL: (file, response) => response?.url
};

const Index = () => {
    const [value, setValue] = useState([{type: "paragraph", children: [{text: "1234213"}]}]);
    return <App value={value} onChange={setValue as any} uploadConfig={uploadConfig} />;
};

const rootElement: HTMLDivElement = document.createElement("div");
rootElement.id = "framework-app-root";
document.body.appendChild(rootElement);
ReactDOM.render(<Index />, rootElement);
