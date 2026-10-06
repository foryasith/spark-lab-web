# Spark Lab Product Catalog & Media Guide

This guide explains how Spark Lab staff and catalog managers can add, update, manage, and remove products on the official storefront **without editing source code, making Git commits, or redeploying the application**.

---

## Architecture Overview

Spark Lab decouples product data management from frontend code deployments:

```
[ Image Hosting / CDN ] (Cloudinary, Supabase Storage, etc.)
          ↓ Public HTTPS Image URLs
[ Google Sheets Catalog ] (Single Source of Truth)
          ↓ CSV / JSON API
[ Spark Lab Storefront ] (React Application)
```

- **Catalog Truth Source**: All product specifications, prices, stock levels, and media links are managed inside the official Spark Lab Google Sheet.
- **Image Files**: Product images are hosted on public HTTPS storage or CDN providers. Dynamic product images must **never** be checked into the source repository under `src/assets/products/`.
- **Static Assets**: Permanent brand elements (logos, icons, UI placeholders) remain in `src/assets/`.

---

## Workflow: Adding a New Product

Follow these steps to publish a new component or kit to the storefront:

1. **Upload Product Photos**
   - Upload high-resolution photos of the product to your designated image hosting/storage service (e.g., Cloudinary, Supabase Storage, S3).
   - Ensure image filenames are clear and optimized for web delivery.

2. **Copy Public HTTPS URLs**
   - Obtain the direct public HTTPS URL for each photo.
   - Example: `https://res.cloudinary.com/sparklab/image/upload/v12345/uno-r3.jpg`

3. **Open the Spark Lab Google Sheet**
   - Access the master product catalog spreadsheet.

4. **Add Product Record**
   - Fill in the required product metadata columns:
     - `product_id` (e.g., `SL-DB-004`)
     - `name` (e.g., `Arduino UNO R3 Board`)
     - `slug` (e.g., `arduino-uno-r3-board`)
     - `main_category` (e.g., `Development Boards`)
     - `subcategory` (e.g., `Arduino Boards`)
     - `price_lkr` (e.g., `2850`)
     - `stock_qty` (e.g., `15`)
     - `sku` (e.g., `SL-UNO-R3-004`)
     - `short_description` (Brief overview of the item)
     - `key_specs` (Pipe or newline-separated key specifications)

5. **Set Primary Image URL**
   - Paste the main product thumbnail URL into the `image_url` column.

6. **Add Optional Gallery Images**
   - Paste additional photo URLs into `image_url_2`, `image_url_3`, and `image_url_4` as needed.
   - Set an accessible image description in the `image_alt` column (optional, defaults to `${product.name} product image`).

7. **Set Stock Status**
   - Set `in_stock = TRUE` (or `FALSE` if pre-order / out of stock).

8. **Activate Product**
   - Set `active = TRUE` to publish the item live on the storefront.

9. **Verify Storefront**
   - Refresh the Spark Lab website to inspect the new product card, gallery images, and details page.

---

## Workflow: Updating Prices

To change a product price:
1. Open the Spark Lab Google Sheet.
2. Update the numeric value in the `price_lkr` column.
3. Save the sheet. The new price will be reflected immediately on the live website.
   - **No code change required.**

---

## Workflow: Managing Stock & Availability

To update inventory levels:
1. Update `stock_qty` with current physical inventory counts.
2. If stock reaches zero, set `in_stock = FALSE`.
3. Save the sheet.
   - **No code change required.**

---

## Workflow: Updating Product Images

To replace or update product photos:
1. Upload the new image file to your CDN/storage bucket.
2. Copy the public HTTPS URL.
3. Replace the URL in `image_url`, `image_url_2`, `image_url_3`, or `image_url_4` in Google Sheets.
4. Save the sheet.
   - **No Git commit or redeploy required.**

---

## Workflow: Removing / Deactivating Products

When a product is discontinued or temporarily unavailable:
- **Do NOT delete historical rows** from Google Sheets unnecessarily.
- Simply set **`active = FALSE`** in the sheet.
- The product will immediately be hidden from search, category browsing, and product listing pages while preserving historical records.

---

## Important Business & AI Integrity Rules

> [!IMPORTANT]
> - **Google Sheets is the catalog truth source.**
> - Image hosting services store binary image files.
> - **AI services and algorithms must NEVER generate or hallucinate product prices, stock counts, or inventory availability.**
> - All pricing and stock values presented to users must strictly originate from the live catalog dataset.
