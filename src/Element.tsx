import React from "react"
import { useSelected, useFocused } from "slate-react"
import { css } from 'emotion'

export const DefaultElement = props => <div {...props.attributes}>{props.children}</div>

export const ImageElement = ({ attributes, children, element }) => {
    const selected = useSelected()
    const focused = useFocused()
    return (
        <div {...attributes}>
            <div contentEditable={false}>
                <img src={element.url} className={css`box-shadow: ${selected && focused ? '0 0 0 2px #B4D5FF' : 'none'};`} />
            </div>
            {children}
        </div>
    )
}

export const TextAlignElement = props => <div {...props.attributes} style={{ textAlign: props?.element?.type }}>{props.children}</div>

export const CodeElement = props =>
    <pre {...props.attributes}>
        <code>{props.children}</code>
    </pre>

export const LeafElement = props => {
    return (
        <span
            {...props.attributes}
            style={{
                fontWeight: props.leaf.bold ? 'bolder' : 'normal',
                fontStyle: props.leaf.italic ? "italic" : "normal",
                textDecoration: props.leaf.lineThrough ? "line-through" : props.leaf.underline ? "underline" : "none",
            }}
        >
            {props.children}
        </span>
    )
}
