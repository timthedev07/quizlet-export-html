import { DetailedHTMLProps, IframeHTMLAttributes, useRef } from "react";
import { createPortal } from "react-dom";

export const IFrame: React.FC<
  DetailedHTMLProps<IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>
> = ({ children, ...props }) => {
  const contentRef = useRef<HTMLIFrameElement>(null);
  const mountNode = contentRef.current?.contentWindow?.document?.body;

  return (
    <iframe {...props} ref={contentRef}>
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};
