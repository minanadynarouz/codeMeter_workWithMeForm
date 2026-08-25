"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";
import {
  PRODUCT_TYPE_OPTIONS,
  BRAND_ASSETS_OPTIONS,
  YES_NO_OPTIONS,
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
} from "@/lib/submission-options";

type FieldName = keyof ContactFormValues;

function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-sm text-red-600">{message}</p>;
}

function TextInput({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder,
}: {
  label: string;
  name: FieldName;
  register: ReturnType<typeof useForm<ContactFormValues>>["register"];
  error?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-800">
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
      <ErrorText message={error} />
    </div>
  );
}

function RadioCardGroup({
  legend,
  name,
  options,
  value,
  onChange,
  error,
  columns = 2,
}: {
  legend: string;
  name: string;
  options: readonly { value: string; label: string }[];
  value: string | undefined;
  onChange: (value: string) => void;
  error?: string;
  columns?: 1 | 2 | 3;
}) {
  const gridCols =
    columns === 3 ? "sm:grid-cols-3" : columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-1";
  return (
    <fieldset>
      <legend className="block text-sm font-medium text-slate-800">{legend}</legend>
      <div className={`mt-1.5 grid grid-cols-1 gap-2 ${gridCols}`}>
        {options.map((opt) => {
          const checked = value === opt.value;
          return (
            <label
              key={opt.value}
              className={`cursor-pointer rounded-lg border px-3.5 py-2.5 text-sm shadow-sm transition ${
                checked
                  ? "border-indigo-500 bg-indigo-50 text-indigo-900 ring-1 ring-indigo-500"
                  : "border-slate-300 text-slate-700 hover:border-slate-400"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={checked}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              {opt.label}
            </label>
          );
        })}
      </div>
      <ErrorText message={error} />
    </fieldset>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      hasReference: "NO",
      hasDomain: "NO",
      wantsAdminPanel: "YES",
    },
  });

  const hasReference = watch("hasReference");
  const hasDomain = watch("hasDomain");

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <svg
            className="h-6 w-6 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-semibold text-emerald-900">
          Thanks — your request has been received!
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-emerald-800">
          CodeMeter has received your project request. Our team will review it and get back to
          you within 48 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-emerald-300 bg-white px-4 py-2 text-sm font-medium text-emerald-800 transition hover:bg-emerald-50"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextInput label="Full name" name="fullName" register={register} error={errors.fullName?.message} placeholder="Jane Doe" />
        <TextInput label="Company / brand name" name="companyName" register={register} error={errors.companyName?.message} placeholder="Acme Inc." />
        <TextInput label="Email address" name="email" type="email" register={register} error={errors.email?.message} placeholder="jane@acme.com" />
        <TextInput label="Phone number" name="phone" type="tel" register={register} error={errors.phone?.message} placeholder="+1 555 123 4567" />
      </div>

      <Controller
        control={control}
        name="productType"
        render={({ field }) => (
          <RadioCardGroup
            legend="What type of product would you like to build?"
            name="productType"
            options={PRODUCT_TYPE_OPTIONS}
            value={field.value}
            onChange={field.onChange}
            error={errors.productType?.message}
            columns={2}
          />
        )}
      />

      <div>
        <label htmlFor="companyDescription" className="block text-sm font-medium text-slate-800">
          What is your company type, and what does it do?
        </label>
        <textarea
          id="companyDescription"
          rows={4}
          placeholder="Tell us about your business and what it does..."
          {...register("companyDescription")}
          className="mt-1.5 block w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
        <ErrorText message={errors.companyDescription?.message} />
      </div>

      <Controller
        control={control}
        name="wantsAdminPanel"
        render={({ field }) => (
          <RadioCardGroup
            legend="Would you like an admin panel to manage your own content, or should CodeMeter manage it for you?"
            name="wantsAdminPanel"
            options={[
              { value: "YES", label: "Yes, I'd like an admin panel" },
              { value: "NO", label: "No, CodeMeter can manage content" },
            ]}
            value={field.value}
            onChange={field.onChange}
            error={errors.wantsAdminPanel?.message}
            columns={2}
          />
        )}
      />

      <Controller
        control={control}
        name="brandAssetsStatus"
        render={({ field }) => (
          <RadioCardGroup
            legend="Do you already have a logo, design system, and brand theme?"
            name="brandAssetsStatus"
            options={BRAND_ASSETS_OPTIONS}
            value={field.value}
            onChange={field.onChange}
            error={errors.brandAssetsStatus?.message}
            columns={1}
          />
        )}
      />

      <div className="space-y-3">
        <Controller
          control={control}
          name="hasReference"
          render={({ field }) => (
            <RadioCardGroup
              legend="Do you have a reference website or app you'd like us to take inspiration from?"
              name="hasReference"
              options={YES_NO_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={errors.hasReference?.message}
              columns={2}
            />
          )}
        />
        {hasReference === "YES" && (
          <TextInput
            label="Reference link"
            name="referenceLink"
            register={register}
            error={errors.referenceLink?.message}
            placeholder="https://example.com"
          />
        )}
        {hasReference === "NO" && (
          <p className="text-sm text-slate-500">No problem — we&apos;ll walk through style directions together on a call.</p>
        )}
      </div>

      <div className="space-y-3">
        <Controller
          control={control}
          name="hasDomain"
          render={({ field }) => (
            <RadioCardGroup
              legend="Do you already own a domain for this project?"
              name="hasDomain"
              options={YES_NO_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={errors.hasDomain?.message}
              columns={2}
            />
          )}
        />
        {hasDomain === "YES" && (
          <TextInput
            label="Domain name"
            name="domainName"
            register={register}
            error={errors.domainName?.message}
            placeholder="yourcompany.com"
          />
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="budgetRange" className="block text-sm font-medium text-slate-800">
            Estimated budget <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <select
            id="budgetRange"
            {...register("budgetRange")}
            defaultValue=""
            className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option value="">Select a range...</option>
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className="block text-sm font-medium text-slate-800">
            Desired timeline <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <select
            id="timeline"
            {...register("timeline")}
            defaultValue=""
            className="mt-1.5 block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option value="">Select a timeline...</option>
            {TIMELINE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {status === "error" && serverError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-full bg-indigo-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending your request..." : "Send project request"}
      </button>
    </form>
  );
}
