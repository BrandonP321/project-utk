import { SomeRequired, TypedOmit } from "@project-utk/shared/src/utils";

export type HTMLAnchorProps = SomeRequired<
  TypedOmit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className">,
  "href"
>;
