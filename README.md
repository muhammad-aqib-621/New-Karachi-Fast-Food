# New Karachi Fast Food

A responsive restaurant storefront for browsing the menu, customizing items, building a cart, and preparing an order message for the selected branch on WhatsApp.

## Requirements

- Node.js compatible with the installed Vite version
- npm

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (by default, `http://localhost:3000`).

## Checks and production build

```sh
npm run lint
npm run build
npm run preview
```

`npm run lint` runs the TypeScript check. `npm run build` creates the static production site in `dist/`; deploy that directory to a static web host configured to serve `index.html` for the site root.

## Customer order flow

1. Browse menu categories or search, then add items and customizations to the cart.
2. Choose delivery or pickup. For delivery, select an estimated distance band:
   - Up to 3 km: free
   - Over 3 km through 5 km: Rs. 50
   - Over 5 km through 8 km: Rs. 100
   - Over 8 km: Rs. 150
3. Enter contact details and prepare the order message.
4. Send the prefilled message to the selected branch in WhatsApp. The customer must send the message, and the branch must confirm availability, coverage, final delivery fee, and payment.

Distance is selected by the customer and is not calculated from a map pin or address. The storefront does not send orders to a kitchen, store order records, or process payments.

## Restaurant content

- Menu, prices, branch contact details, hours, and delivery-distance fees are in `src/data/menuData.ts`.
- Cart, discount, delivery, and total calculations are in `src/store/useCartStore.ts`.
- Food photos are imported from `src/assets/images/` and included in the production build.

## Before launch

- Verify every branch name, address, phone number, WhatsApp number, opening time, and delivery policy with the restaurant.
- Confirm menu item names, descriptions, prices, portions, dietary/allergen statements, promotions, and payment preferences.
- Replace or approve all ratings, review counts, testimonials, and other marketing claims; confirm permission to use customer names and comments.
- Test each branch’s WhatsApp contact and the complete order message on desktop and mobile.
- Configure the production domain and HTTPS on the selected hosting provider.

Online card/wallet processing, live order status, inventory management, and a restaurant admin dashboard are not part of this frontend. Those require a backend and the owner’s chosen payment/order integrations.
