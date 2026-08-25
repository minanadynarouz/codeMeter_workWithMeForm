import { z } from "zod";

export const contactFormSchema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your full name."),
    email: z.string().trim().email("Please enter a valid email address."),
    phone: z.string().trim().min(6, "Please enter a valid phone number."),
    companyName: z.string().trim().min(1, "Please enter your company or brand name."),

    productType: z.enum([
      "WEBSITE",
      "SAAS_APPLICATION",
      "APPLICATION",
      "THREE_D_WEBSITE",
      "AUTOMATION",
      "AI_AGENT_APP",
    ]),

    companyDescription: z
      .string()
      .trim()
      .min(10, "Please tell us a bit more about your company (at least 10 characters)."),

    wantsAdminPanel: z.enum(["YES", "NO"]),

    brandAssetsStatus: z.enum(["HAVE_ALL", "PARTIAL", "NEED_ALL", "PENDING_FROM_OTHER_PARTY"]),

    hasReference: z.enum(["YES", "NO"]),
    referenceLink: z.string().trim().url("Please enter a valid URL.").optional().or(z.literal("")),

    hasDomain: z.enum(["YES", "NO"]),
    domainName: z.string().trim().optional().or(z.literal("")),

    budgetRange: z.string().trim().optional().or(z.literal("")),
    timeline: z.string().trim().optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.hasReference === "YES" && !data.referenceLink) {
      ctx.addIssue({
        code: "custom",
        path: ["referenceLink"],
        message: "Please share the reference link.",
      });
    }
    if (data.hasDomain === "YES" && !data.domainName) {
      ctx.addIssue({
        code: "custom",
        path: ["domainName"],
        message: "Please enter your domain name.",
      });
    }
  });

export type ContactFormValues = z.infer<typeof contactFormSchema>;
