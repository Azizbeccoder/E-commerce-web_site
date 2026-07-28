# 100 commits - Azizbeccoder/E-commerce-web_site

One backlog item = one commit. Copy the message when you finish the task.


## Sprint 1

- [ ]   1. `git commit -m "fix(auth): return after 'User already exists' in createUser"`
- [ ]   2. `git commit -m "fix(auth): send 401 on failed login instead of hanging"`
- [ ]   3. `git commit -m "fix(security): remove console.log of email and plaintext password"`
- [ ]   4. `git commit -m "fix(auth): fix 'httyOnly' typo in logout cookie options"`
- [ ]   5. `git commit -m "fix(security): strip password hashes from GET /api/users response"`
- [ ]   6. `git commit -m "chore(api): add global errorHandler and notFound middleware"`
- [ ]   7. `git commit -m "fix(api): rewrite asyncHandler to forward errors instead of always 500"`
- [ ]   8. `git commit -m "fix(api): fix checkId to call next(error) for invalid ObjectId"`
- [ ]   9. `git commit -m "chore(api): validate required env vars at boot and fail fast"`
- [ ]  10. `git commit -m "fix(auth): fix cookie secure flag so local HTTP login works"`
- [ ]  11. `git commit -m "feat(security): rate limit login and registration endpoints"`
- [ ]  12. `git commit -m "feat(security): add helmet and a configured CORS allowlist"`
- [ ]  13. `git commit -m "feat(security): sanitize input against NoSQL injection"`
- [ ]  14. `git commit -m "feat(api): add schema validation for auth request bodies"`
- [ ]  15. `git commit -m "feat(auth): enforce password strength and normalize emails"`
- [ ]  16. `git commit -m "feat(auth): shorten JWT lifetime and add a refresh token flow"`
- [ ]  17. `git commit -m "docs(ci): add .env.example for backend and frontend"`

## Sprint 2

- [ ]  18. `git commit -m "fix(api): fix 'createAt' typo in fetchAllProducts sort"`
- [ ]  19. `git commit -m "feat(api): implement real pagination in fetchProducts"`
- [ ]  20. `git commit -m "feat(ui): wire product list UI to the new pagination API"`
- [ ]  21. `git commit -m "fix(api): attach the uploaded image path when creating a product"`
- [ ]  22. `git commit -m "fix(api): fix Windows backslashes in the upload response path"`
- [ ]  23. `git commit -m "fix(api): create the uploads directory at boot if missing"`
- [ ]  24. `git commit -m "feat(security): add a multer file-size limit and clear error"`
- [ ]  25. `git commit -m "fix(api): guard updateProductDetails against a missing product"`
- [ ]  26. `git commit -m "feat(api): delete the image file from disk when a product is removed"`
- [ ]  27. `git commit -m "fix(api): replace deprecated findByIdAndRemove in removeCategory"`
- [ ]  28. `git commit -m "feat(api): block deleting a category that still has products"`
- [ ]  29. `git commit -m "fix(api): validate the filterProducts request body"`
- [ ]  30. `git commit -m "chore(api): reconcile quantity vs countInStock on the product model"`
- [ ]  31. `git commit -m "fix(api): add GET /api/category root listing and fix route ordering"`
- [ ]  32. `git commit -m "feat(api): add a text index for product search"`
- [ ]  33. `git commit -m "feat(api): add server-side sorting options for the product list"`
- [ ]  34. `git commit -m "feat(feat): support multiple images per product"`
- [ ]  35. `git commit -m "feat(seo): add a unique slug field to products"`
- [ ]  36. `git commit -m "feat(api): compress uploads and generate thumbnails with sharp"`
- [ ]  37. `git commit -m "feat(ci): write a seed script for categories, products and an admin user"`

## Sprint 3

- [ ]  38. `git commit -m "fix(security): protect the sales analytics routes with admin auth"`
- [ ]  39. `git commit -m "fix(security): add an ownership check to findOrderById"`
- [ ]  40. `git commit -m "feat(payments): verify PayPal payments server-side before marking paid"`
- [ ]  41. `git commit -m "fix(security): restrict markOrderAsPaid to the order owner"`
- [ ]  42. `git commit -m "fix(api): guard req.body.payer access in markOrderAsPaid"`
- [ ]  43. `git commit -m "fix(api): fix createOrder crash when orderItems is missing"`
- [ ]  44. `git commit -m "feat(api): decrement stock atomically when an order is created"`
- [ ]  45. `git commit -m "feat(api): reject orders containing out-of-stock items"`
- [ ]  46. `git commit -m "chore(api): move tax rate, shipping fee and free-shipping threshold to config"`
- [ ]  47. `git commit -m "chore(api): store money as integer minor units instead of toFixed strings"`
- [ ]  48. `git commit -m "chore(api): rename the calcualteTotalSalesByDate typo"`
- [ ]  49. `git commit -m "feat(api): paginate and filter the admin order list"`
- [ ]  50. `git commit -m "feat(api): paginate the customer order history endpoint"`
- [ ]  51. `git commit -m "feat(feat): add an order status enum with valid transitions"`
- [ ]  52. `git commit -m "feat(feat): let customers cancel an unpaid order and restock it"`
- [ ]  53. `git commit -m "feat(feat): send an order confirmation email"`
- [ ]  54. `git commit -m "feat(feat): generate a downloadable PDF invoice for paid orders"`
- [ ]  55. `git commit -m "feat(payments): add a local payment provider (Payme/Click) for UZS"`

## Sprint 4

- [ ]  56. `git commit -m "fix(ui): fix the RTK Query tag mismatch ('Products' vs 'Product')"`
- [ ]  57. `git commit -m "fix(ui): change deleteProduct from providesTags to invalidatesTags"`
- [ ]  58. `git commit -m "fix(ui): add invalidatesTags to updateProduct and createReview"`
- [ ]  59. `git commit -m "chore(ui): move localStorage writes out of cart reducers"`
- [ ]  60. `git commit -m "fix(ui): fix the no-op resetCart reducer"`
- [ ]  61. `git commit -m "feat(ui): handle 401 responses globally by logging out"`
- [ ]  62. `git commit -m "chore(ci): drive the API base URL from an env variable"`
- [ ]  63. `git commit -m "fix(payments): pass the PayPal clientId into PayPalScriptProvider"`
- [ ]  64. `git commit -m "feat(ui): add an ErrorBoundary and a 404 route"`
- [ ]  65. `git commit -m "chore(chore): delete src_backup_before_redesign and the .bak files"`
- [ ]  66. `git commit -m "feat(ui): add inline validation to Login and Register"`
- [ ]  67. `git commit -m "feat(ui): debounce the header search and cancel stale requests"`
- [ ]  68. `git commit -m "feat(feat): persist favorites per user account instead of shared localStorage"`
- [ ]  69. `git commit -m "feat(ui): add a quantity stepper capped at available stock"`
- [ ]  70. `git commit -m "fix(ui): guard the checkout route against an empty cart"`
- [ ]  71. `git commit -m "chore(ui): make the price breakdown consistent across cart, checkout and order"`
- [ ]  72. `git commit -m "chore(chore): replace moment with dayjs"`

## Sprint 5

- [ ]  73. `git commit -m "perf(perf): add route-level code splitting"`
- [ ]  74. `git commit -m "perf(perf): lazy-load apexcharts on the admin dashboard only"`
- [ ]  75. `git commit -m "perf(perf): lazy-load product images with explicit dimensions"`
- [ ]  76. `git commit -m "feat(ui): add skeleton loaders to Home, Shop and ProductDetails"`
- [ ]  77. `git commit -m "feat(ui): make the admin tables usable on mobile"`
- [ ]  78. `git commit -m "feat(a11y): add visible keyboard focus states throughout"`
- [ ]  79. `git commit -m "feat(a11y): add alt text and aria-labels for icon-only controls"`
- [ ]  80. `git commit -m "chore(a11y): fix colour-contrast failures found by Lighthouse"`
- [ ]  81. `git commit -m "feat(seo): add per-route meta titles and descriptions"`
- [ ]  82. `git commit -m "feat(seo): generate sitemap.xml and robots.txt"`
- [ ]  83. `git commit -m "feat(feat): add multi-language support (uz / ru / en)"`
- [ ]  84. `git commit -m "feat(feat): add UZS currency support and locale-aware formatting"`
- [ ]  85. `git commit -m "feat(feat): show related products on the detail page"`
- [ ]  86. `git commit -m "feat(feat): add a recently viewed products strip"`
- [ ]  87. `git commit -m "feat(feat): add a low-stock alert widget to the admin dashboard"`
- [ ]  88. `git commit -m "feat(feat): build a review moderation queue for admins"`

## Sprint 6

- [ ]  89. `git commit -m "test(test): set up Jest and Supertest with an in-memory MongoDB"`
- [ ]  90. `git commit -m "test(test): unit test calcPrices, cartUtils and the auth middleware"`
- [ ]  91. `git commit -m "test(test): integration test the full auth flow"`
- [ ]  92. `git commit -m "test(test): integration test the order lifecycle"`
- [ ]  93. `git commit -m "test(test): set up Vitest and React Testing Library"`
- [ ]  94. `git commit -m "test(test): add a Playwright end-to-end checkout test"`
- [ ]  95. `git commit -m "feat(ci): add a GitHub Actions CI pipeline"`
- [ ]  96. `git commit -m "feat(ci): add Prettier, lint-staged and a pre-commit hook"`
- [ ]  97. `git commit -m "feat(ci): add Dockerfile and docker-compose for the whole stack"`
- [ ]  98. `git commit -m "feat(ci): serve the frontend build from Express in production"`
- [ ]  99. `git commit -m "docs(docs): write the root README"`
- [ ] 100. `git commit -m "feat(ci): add structured logging and a health check endpoint"`
