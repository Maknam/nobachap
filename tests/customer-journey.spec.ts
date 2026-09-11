import { test, expect } from "@playwright/test";
import { emptyEnquiry, validateEnquiry } from "../src/lib/enquiries";
import {
  emptyWaitingList,
  validateWaitingList,
  submitWaitingList,
} from "../src/lib/waiting-list";
import { getWhatsAppUrl } from "../src/lib/whatsapp";

test("category and featured-product links carry selections into the request form", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("link", {
      name: "Request a Product: Refrigerators & freezers",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(/\/pre-order\?category=refrigeration/);
  await expect(page.getByLabel("Product category")).toHaveValue(
    "refrigeration",
  );
  await expect(page.getByLabel("Appliance needed")).toHaveValue("");
  await page.goto("/");
  await page
    .getByRole("link", { name: "Pre-order Living-room smart TV", exact: true })
    .click();
  await expect(page).toHaveURL(/\/pre-order\?category=entertainment/);
  await expect(page.getByLabel("Product category")).toHaveValue("entertainment");
  await expect(page.getByLabel("Appliance needed")).toHaveValue(
    "Living-room smart TV",
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Start your appliance request",
  );
  await page.setViewportSize({ width: 320, height: 812 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.goto("/pre-order?category=invalid&product=%3Cscript%3E");
  await expect(page.getByLabel("Product category")).toHaveValue("");
  await expect(page.getByLabel("Appliance needed")).toHaveValue("<script>");
});

test("waiting list validates independently and reports honest completion", async ({
  page,
}) => {
  await page.goto("/#waiting-list");
  const form = page.getByRole("form", {
    name: "Pre-order waiting list",
    exact: true,
  });
  await form.getByRole("button").click();
  await expect(form.getByLabel("Full name")).toBeFocused();
  await form.getByLabel("Full name").fill("Kwame Test");
  await form.getByLabel("Phone or WhatsApp number").fill("0200000000");
  await form.getByLabel("Product category").selectOption("laundry");
  await form.getByLabel("Product needed").fill("Front-load washer");
  await form.getByRole("button").click();
  await expect(form.getByLabel("Preferred contact method")).toBeFocused();
  await form.getByLabel("Preferred contact method").selectOption("WhatsApp");
  await form.getByRole("button").click();
  await expect(
    form.getByRole("button", { name: "Preparing interest…" }),
  ).toBeDisabled();
  await expect(form.getByRole("status")).toContainText(
    "you have not joined a waiting list",
  );
  await expect(form.getByLabel("Product needed")).toHaveValue(
    "Front-load washer",
  );
  await expect(
    page.getByRole("form", { name: "Appliance request" }).getByRole("status"),
  ).toBeEmpty();
});

test("tracking, FAQs and social links make their state clear", async ({
  page,
}) => {
  await page.goto("/");
  const tracking = page.locator("#tracking");
  await expect(
    tracking.getByText("Order tracking platform coming soon"),
  ).toBeVisible();
  await expect(tracking.getByLabel("Enter your order number")).toBeDisabled();
  await expect(
    tracking.getByRole("button", { name: "Track", exact: true }),
  ).toBeDisabled();
  await expect(tracking.locator("ol > li")).toHaveCount(9);
  const summary = page
    .locator("summary")
    .filter({ hasText: "Can I cancel or change a pre-order?" });
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(summary.locator("..")).toHaveAttribute("open", "");
  await expect(summary.locator("..")).toContainText(
    "terms must be confirmed before payment",
  );
  const social = page.getByRole("navigation", {
    name: "Social media",
    exact: true,
  });
  await expect(social.getByRole("link", { name: /Instagram/ })).toHaveAttribute(
    "href",
    "https://www.instagram.com/nobachapenterprise/",
  );
  await expect(social.getByRole("link", { name: /TikTok/ })).toHaveAttribute(
    "href",
    "https://www.tiktok.com/@nobachapenterprise",
  );
  await expect(social.locator("svg")).toHaveCount(3);
  await expect(
    page.getByRole("heading", { name: "In our customers’ words." }),
  ).toHaveCount(0);
});

test("validators reject invalid URLs, categories and contacts; request formatting preserves details", async () => {
  const request = {
    ...emptyEnquiry,
    name: "Ama & Kofi",
    phone: "0240000000",
    category: "kitchen",
    product: "Cooker",
    location: "Accra",
    consent: true,
    model: "60 cm",
    productUrl: "https://example.com/product?a=1&b=2",
  };
  expect(validateEnquiry(request)).toEqual({});
  expect(validateEnquiry({ ...request, category: "fake" })).toHaveProperty(
    "category",
  );
  expect(
    validateEnquiry({ ...request, productUrl: "javascript:alert(1)" }),
  ).toHaveProperty("productUrl");
  expect(validateEnquiry({ ...request, consent: false })).toHaveProperty(
    "consent",
  );
  const url = new URL(getWhatsAppUrl(request, "233200000000")!);
  expect(url.searchParams.get("text")).toContain(
    "Model / specification: 60 cm",
  );
  expect(url.searchParams.get("text")).toContain(
    "https://example.com/product?a=1&b=2",
  );
  expect(getWhatsAppUrl(request, "")).toBeNull();
  expect(validateWaitingList(emptyWaitingList)).toHaveProperty("contactMethod");
  await expect(submitWaitingList(emptyWaitingList)).rejects.toThrow();
});
