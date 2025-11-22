import { test, expect } from "@playwright/test"

const UI_URL = "http://localhost:5173/"

test("should show hotel lists", async ({ page }) => {
  await page.goto(UI_URL)

  await expect(page.getByText("Latest Destinations")).toBeVisible()
  await expect(page.getByText("Kathmandu Gateways").first()).toBeVisible()
})