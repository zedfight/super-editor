import React from "react";
import { useSelected, useFocused, RenderElementProps, RenderLeafProps } from "slate-react";
import { css } from "emotion";

export const DefaultElement = (props: RenderElementProps) => <div {...props.attributes}>{props.children}</div>;

export const ImageElement = ({ attributes, children, element }: RenderElementProps) => {
    const selected = useSelected();
    const focused = useFocused();
    return (
        <div {...attributes}>
            <div contentEditable={false}>
                <img
                    src={element.url as string}
                    className={css`
                        box-shadow: ${selected && focused ? "0 0 0 2px #B4D5FF" : "none"};
                    `}
                />
            </div>
            {children}
        </div>
    );
};

export const TextAlignElement = (props: RenderElementProps) => (
    <div {...props.attributes} style={{ textAlign: props?.element?.type as "left" | "right" | "center" }}>
        {props.children}
    </div>
);

export const CodeElement = (props: RenderElementProps) => (
    <pre {...props.attributes}>
        <code>{props.children}</code>
    </pre>
);

export const LeafElement = (props: RenderLeafProps) => {
    return (
        <span
            {...props.attributes}
            style={{
                fontWeight: props.leaf.bold ? "bolder" : "normal",
                fontStyle: props.leaf.italic ? "italic" : "normal",
                textDecoration: props.leaf.lineThrough ? "line-through" : props.leaf.underline ? "underline" : "none",
            }}
        >
            {props.children}
        </span>
    );
};
