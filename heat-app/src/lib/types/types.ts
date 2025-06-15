export type Filter = "high" | "medium" | "low" | "all";

export type UXTexting = {
  headings: { poverty: Filter; temperature: Filter; title: string }[];
};
