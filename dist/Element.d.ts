/// <reference types="react" />
import { RenderElementProps, RenderLeafProps } from "slate-react";
export declare const DefaultElement: (props: RenderElementProps) => JSX.Element;
export declare const ImageElement: ({ attributes, children, element }: RenderElementProps) => JSX.Element;
export declare const TextAlignElement: (props: RenderElementProps) => JSX.Element;
export declare const CodeElement: (props: RenderElementProps) => JSX.Element;
export declare const LeafElement: (props: RenderLeafProps) => JSX.Element;
