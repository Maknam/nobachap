import { expect, test } from "@playwright/test";
import {
  emptyEnquiry,
  submitEnquiry,
  validateEnquiry,
} from "../src/lib/enquiries";
import { getWhatsAppUrl } from "../src/lib/whatsapp";

test("page has complete content, loaded assets, valid anchors and no overflow", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page).toHaveTitle(/NOBACHAP/);
  for (const width of [320, 375, 580, 768, 950, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      )
      .toBe(true);
  }
  for (const id of [
    "home",
    "about",
    "products",
    "process",
    "tracking",
    "enquire",
  ]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  const anchors = await page
    .locator('a[href*="#"]')
    .evaluateAll((links) =>
      links.map((link) => (link as HTMLAnchorElement).hash.slice(1)),
    );
  for (const id of anchors)
    await expect(page.locator(`[id="${id}"]`)).toHaveCount(1);
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
  }
  await expect
    .poll(() =>
      page
        .locator("img")
        .evaluateAll((images) =>
          images.every(
            (image) =>
              image instanceof HTMLImageElement &&
              image.complete &&
              image.naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
  await expect(
    page.getByText("This is a preview of the planned tracking experience.", {
      exact: false,
    }),
  ).toBeVisible();
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.locator('#featured').screenshot({ path: 'test-results/products-desktop.png' });
  await page.locator('#tracking').screenshot({ path: 'test-results/tracking-desktop.png' });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: 'test-results/hero-desktop.png' });
  await page.screenshot({
    path: "test-results/home-desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 375, height: 812 });
  await page.screenshot({ path: 'test-results/hero-mobile.png' });
  await page.screenshot({
    path: "test-results/home-mobile.png",
    fullPage: true,
  });
  expect(errors).toEqual([]);
});

test("mobile navigation closes after selection and Escape returns focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const button = page.getByRole("button", { name: "Menu", exact: true });
  await button.click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Products" })
    .click();
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#products$/);
  await button.click();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Escape");
  await expect(button).toBeFocused();
  await expect(button).toHaveAttribute("aria-expanded", "false");
});

test("enquiry validates, shows pending state, and never claims storage", async ({
  page,
}) => {
  await page.goto("/#enquire");
  const form = page.getByRole("form", { name: "Appliance request" });
  const submit = form.getByRole("button", { name: /Prepare my request/ });
  await submit.click();
  await expect(form.getByLabel("Full name")).toBeFocused();
  await expect(form.getByRole("status")).toHaveText(
    "Please correct the highlighted fields.",
  );
  await form.getByLabel("Full name").fill("Ama Mensah");
  await form.getByLabel("Phone or WhatsApp number").fill("024 000 0000");
  await form.getByLabel("Product category").selectOption("entertainment");
  await form.getByLabel("Appliance needed").fill("55-inch smart TV");
  await form.getByLabel("Delivery town or region").fill("Kumasi");
  await form.getByLabel("I agree to be contacted").check();
  await submit.click();
  await expect(
    page.getByRole("button", { name: "Preparing request…" }),
  ).toBeDisabled();
  await expect(form.getByRole("status")).toContainText("not sent or saved");
  await expect(form.getByRole("status")).toContainText(
    "No order or waiting-list entry has been created",
  );
  await expect(form.getByLabel("Full name")).toHaveValue("Ama Mensah");
});

test("validation and WhatsApp utility enforce safe, honest handoff", async () => {
  expect(validateEnquiry(emptyEnquiry)).toHaveProperty("consent");
  await expect(submitEnquiry(emptyEnquiry)).rejects.toThrow();
  const request = {
    ...emptyEnquiry,
    name: "Ama & Kofi",
    phone: "0240000000",
    product: "TV & speakers",
    location: "Accra",
    category: "entertainment",
    consent: true,
  };
  expect(validateEnquiry(request)).toEqual({});
  expect(validateEnquiry({ ...request, email: "invalid" })).toHaveProperty(
    "email",
  );
  expect(getWhatsAppUrl(request, "")).toBeNull();
  expect(getWhatsAppUrl(request, "+233 123")).toBeNull();
  const url = new URL(getWhatsAppUrl(request, "233200000000")!);
  expect(url.origin).toBe("https://wa.me");
  expect(url.searchParams.get("text")).toContain("TV & speakers");
  expect(url.searchParams.get("text")).toContain("Accra");
  expect(await submitEnquiry(request)).toMatchObject({ mode: "demo" });
});
