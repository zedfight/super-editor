import React, { AllHTMLAttributes } from "react";
import "./icon.css";

export enum IconClass {
    UNDO = "super-editor-undo",
    REDO = "super-editor-redo",
    LINK = "super-editor-link",
    EXPRESSION = "super-editor-expression",
    UNDERLINE = "super-editor-underline",
    ITALIC = "super-editor-italic",
    BACKGROUND_COLOR = "super-editor-background-color",
    FONT_COLOR = "super-editor-font-color",
    IMAGE = "super-editor-image",
    FORMAT = "super-editor-format",
    DELETE_LINE = "super-editor-delete-line",
    TEXT_CENTER = "super-editor-text-center",
    TEXT_RIGHT = "super-editor-text-right",
    BOLD = "super-editor-bold",
    TEXT_LEFT = "super-editor-text-left",
    TEXT = "super-editor-text",
    DELETE = "super-editor-delete",
}

interface Props extends AllHTMLAttributes<HTMLElement> {
    type: IconClass;
    symbol: boolean;
}

export default class Component extends React.PureComponent<Props> {
    static defaultProps = {
        symbol: false,
    };

    render() {
        const { type, symbol, className = "", ...restProps } = this.props;
        return symbol ? (
            <svg
                className={`super-editor ${className}`}
                style={{
                    width: "1em",
                    height: "1em",
                    verticalAlign: "-0.15em",
                    fill: "currentColor",
                    overflow: "hidden",
                }}
                aria-hidden="true"
            >
                <use xlinkHref={`#${type}`} />
            </svg>
        ) : (
                <i className={`super-editor ${type} ${className}`} {...restProps} />
            );
    }
}
