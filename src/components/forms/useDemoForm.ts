"use client";
import { useRef, useState, type FormEvent } from "react";
import type { DemoResult } from "@/lib/enquiries";
export function useDemoForm<T extends object>(
  initial: T,
  validate: (values: T) => Partial<Record<keyof T, string>>,
  submit: (values: T) => Promise<DemoResult>,
  prefix: string,
) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const pending = useRef(false);
  function update<K extends keyof T>(field: K, value: T[K]) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => ({ ...previous, [field]: undefined }));
    setState("idle");
    setMessage("");
  }
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setState("error");
      setMessage("Please correct the highlighted fields.");
      document.getElementById(`${prefix}-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    pending.current = true;
    setState("loading");
    setMessage("Preparing your request…");
    try {
      const result = await submit(values);
      setState("success");
      setMessage(result.message);
    } catch {
      setState("error");
      setMessage(
        "We could not prepare your request. Nothing has been sent or saved. Please try again.",
      );
    } finally {
      pending.current = false;
    }
  }
  return { values, errors, state, message, update, onSubmit };
}
