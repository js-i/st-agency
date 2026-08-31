import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="mt-10 font-display text-2xl font-semibold text-navy-950" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="mt-8 font-display text-xl font-semibold text-navy-950" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mt-4 text-base leading-relaxed text-slate" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="mt-4 space-y-2 pl-5" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="list-disc leading-relaxed text-slate marker:text-teal" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-navy-950" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a className="text-teal-dark underline underline-offset-2 hover:text-teal" {...props} />
  ),
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-none">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
