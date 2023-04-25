import { z } from "zod";
// memo: APIから得たデータはAny型なので、型チェック用のzodスキーマを定義

// バージョン情報
export const zVersion = z.string().regex(/^\d+\.\d+\.\d+$/);

export const zSettings = z.object({
  version: zVersion,
  faq: z.string(),
  tos: z.string(),
});

export type Settings = z.infer<typeof zSettings>;
