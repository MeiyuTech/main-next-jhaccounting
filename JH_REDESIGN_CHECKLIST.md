# Jiahua Website Redesign Implementation Checklist

Source: `佳华财务公司网站改版与全套文案策划方案 3 260806.md`

## P0 — Remove expired and non-core offerings

- [x] Remove the ERC application page and its image asset.
- [x] Remove ERC navigation, service-card, translation, and legacy-route references.
- [x] Remove the real-estate broker commission claim page, image, navigation, service-card, and translation references.
- [x] Redirect retired ERC and commission-claim URLs to the Government Funding page.
- [x] Confirm a repository-wide search finds no customer-facing ERC or commission-claim promotion.

## P0 — Government Funding flagship page

- [x] Add localized `/government-funding` pages for English and Chinese.
- [x] Add the approved hero headline, supporting copy, and primary/secondary CTAs.
- [x] Present Grants, Tax Credits & Incentives, and Low-/No-Interest Loans as the three core services.
- [x] Add the approved bilingual FAQ content.
- [x] Add localized metadata for search and social previews.

## P0 — 48-hour free eligibility assessment

- [x] Add all required lead fields: business name, contact, email, phone/WeChat, location, industry, W-2 employees, annual revenue, and primary need.
- [x] Reuse the existing contact-submission backend without requiring a database migration.
- [x] Place the assessment form on the home page and Government Funding page.
- [x] Add client-side required-field validation, submit feedback, and a reusable lead-message formatter.
- [x] Add automated tests for lead-message formatting.

## P1 — Five high-visibility contact and conversion entrances

- [x] Add a persistent top bar with phone, email, WeChat QR access, and language switching.
- [x] Add a highlighted “48-hour free assessment” CTA to desktop and mobile navigation.
- [x] Add a responsive floating toolbar for phone, WeChat, assessment, and back-to-top actions.
- [x] Add a conversion banner to every service and news article page.
- [x] Ensure the Contact page clearly shows the Florida headquarters, Irvine office, maps, WeChat QR code, and inquiry form.

## P1 — Responsive and accessibility checks

- [x] Verify all interactive controls have accessible labels and keyboard focus states.
- [x] Verify telephone, email, WeChat, assessment, language, and back-to-top interactions.
- [x] Verify desktop layout at 1440 px width.
- [x] Verify mobile layout at 390 px width with no horizontal overflow.

## Validation

- [x] Run formatting and TypeScript checks.
- [x] Run ESLint.
- [x] Run automated tests.
- [x] Verify English home and Government Funding pages in the browser.
- [x] Verify Chinese home and Government Funding pages in the browser.
- [x] Verify a service article and a news article include the conversion banner.
- [x] Verify retired URLs redirect to Government Funding.
