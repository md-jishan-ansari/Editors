import { CopyButton } from "./CopyButton";

export const Pre = ({ children, raw, ...props }) => {
  const lang = props["data-language"] || "shell";
  return (
    <pre {...props} className={"p-0"}>
      <div className={"code-header"}>
        {lang}
        <CopyButton text={raw} />
      </div>
      {children}
    </pre>
  );
};
