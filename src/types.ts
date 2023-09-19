import { z } from "zod";

export const DEFAULT_ICON = "default";

const IconType = z
  .union([
    z.literal("vote"),
    z.literal("vote-2"),
    z.literal("stake"),
    z.literal("stake-2"),
    z.literal("view"),
    z.literal("chat"),
    z.literal("tip"),
    z.literal("mint"),
    z.literal("mint-2"),

    z.literal("discord"),
    z.literal("twitter"),
    z.literal("twitter-2"),
    z.literal("x"),
    z.literal("instagram"),
    z.literal("telegram"),

    z.literal("leaderboard"),
    z.literal("gaming"),
    z.literal("gaming-2"),

    z.literal("generic-link"),
    z.literal("generic-add"),

    z.literal(DEFAULT_ICON),
  ])
  .optional()
  .default(DEFAULT_ICON)
  .catch(DEFAULT_ICON);

// Shortcut

export const ShortcutType = z
  .object({
    label: z.string(),
    uri: z
      .string()
      .url()
      .refine(
        (val) => val.startsWith("https://") || val.startsWith("solana:"),
        (val) => ({ message: `${val} is not a valid protocol` })
      ),
    prefersExternalTarget: z.boolean().optional().default(false),
    preferredPresentation: z
      .union([z.literal("default"), z.literal("immerse")])
      .optional()
      .default("immerse"),
    caip19: z
      .string()
      .array()
      .optional()
      .default([])
      .refine(
        (val) => {
          if (val.length === 0) return true;
          return val.every((item) => item.length);
        },
        (val) => ({ message: `${val} is not a valid array of collection ids` })
      ),
    platform: z
      .union([z.literal("mobile"), z.literal("desktop"), z.literal("all")])
      .optional()
      .default("all"),
    icon: IconType,
  })
  .strict(); // No extra fields that are not supported

export type IconType = z.infer<typeof IconType>;

/**
 * A shortcut is a link to a dapp that can be displayed in the wallet.
 *
 * @property label - The label to display for the shortcut.
 * @property uri - The URI to open when the shortcut is clicked.
 * @property prefersExternalTarget - Whether the shortcut should be opened in an external browser.
 * @property preferredPresentation - The preferred presentation for the shortcut. Choose between the default presentation or request an immersive one.
 * @property caip19 - The CAIP-19 address of the chain the shortcut is for. Use this to filter shortcuts by specific address.
 * @property platform - The platform the shortcut is for. Use this to filter by "mobile", "desktop", or "all".
 */
export type Shortcut = z.infer<typeof ShortcutType>;

export const SchemaType = z
  .object({
    version: z.number(),
    shortcuts: z.array(ShortcutType).optional().default([]),
  })
  .strict(); // No extra fields that are not supported

/**
 * A schema is a collection of shortcuts.
 *
 * @property version - The version of the schema.
 * @property shortcuts - The shortcuts in the schema.
 */
export type Schema = z.infer<typeof SchemaType>;
