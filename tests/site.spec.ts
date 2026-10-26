import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'
import index from '../src/data/index.json' with { type: 'json' }

const watch = (page: Page) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
  return errors
}

// Sonda / : prerender edilmiş dizin HTML'i istenir (GitHub Pages da böyle yönlendirir).
for (const path of ['/', '/components/', '/credits/', '/about/']) {
  test(`${path} renders and passes axe`, async ({ page }) => {
    const errors = watch(page)
    await page.goto(path)
    await expect(page.locator('h1')).toBeVisible()
    // Giriş animasyonları bitsin; ara karelerdeki soluk metin kontrast ihlali sayılmasın.
    await page.waitForTimeout(2500)
    const { violations } = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('[data-demo-root], [aria-hidden="true"]')
      .analyze()
    expect(violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([])
    expect(errors).toEqual([])
  })
}

for (const { name, title } of index) {
  test(`/components/${name}`, async ({ page }) => {
    const errors = watch(page)
    await page.goto(`/components/${name}/`)
    await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible()
    await page.waitForTimeout(500)
    await page.getByRole('switch', { name: 'Reduced motion' }).check({ force: true })
    await expect(page.getByRole('switch', { name: 'Reduced motion' })).toBeChecked()
    await page.waitForTimeout(300)
    expect(errors).toEqual([])
  })
}

test('unknown route shows 404', async ({ page }) => {
  await page.goto('/nope')
  await expect(page.getByRole('heading', { name: 'This tile is missing.' })).toBeVisible()
})
