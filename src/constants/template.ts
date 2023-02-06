export const TEMPLATE_TYPE = {
  PASS: "pass",
  FAIL: "fail",
} as const;
export type TEMPLATE_TYPE = keyof typeof TEMPLATE_TYPE;

export const TEMPLATE_TYPE_LABEL = {
  PASS: "합격",
  FAIL: "불합격",
} as const;
export type TEMPLATE_TYPE_LABEL = keyof typeof TEMPLATE_TYPE;
