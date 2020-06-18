import React from "react";
import ReactDOM from "react-dom";
import App from "./index"

const uploadConfig = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    // transformURL: (file, response) => response?.url
}

const rootElement: HTMLDivElement = document.createElement("div");
rootElement.id = "framework-app-root";
document.body.appendChild(rootElement);
ReactDOM.render(<App uploadConfig={uploadConfig} />, rootElement);
