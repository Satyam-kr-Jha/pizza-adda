# 🍕 PizzaAdda

> Build your perfect pizza, track your delivery live.

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Leaflet](https://img.shields.io/badge/React%20Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)

---

## ✨ Pages

### `/` — Landing Page
A smooth, scroll-based animated intro that sets the mood. Built to make you hungry. 🔥

### `/pizza` — Pizza Builder
Customize every layer of your pizza:
- 🫓 **Base** — Classic Hand Tossed, Thin Crust, Cheese Burst, Whole Wheat
- 🍅 **Sauce** — Classic Tomato, Spicy Desi, Peri Peri, Creamy Garlic
- 🧀 **Cheese** — Mozzarella, Extra Cheese, Cheddar Mix, Paneer Cheese
- 🧅 **Toppings** — Onion, Capsicum, Tomato, Paneers, Sweet Corn, Olives

Live price updates as you build. Hit the button to go to cart when you're ready.

### `/cart` — Your Order
Review your pizza, adjust quantity, add oregano & chilli flakes, and see the full price breakdown with delivery and platform charges. Pick your delivery location on a **live interactive map** — click anywhere to update your address automatically.

### `/success` — Order Placed 🎉
A satisfying confirmation screen after checkout.

---

## 🛠 Tech Stack

| Tech | Usage |
|------|-------|
| [Next.js]| App Router, SSR |
| [Tailwind CSS]| Styling |
| [React Leaflet]| Interactive map |
| [OpenStreetMap]| Map tiles |
| [Nominatim]| Reverse geocoding |
| localStorage | Cart state persistence |

---

## 📁 Project Structure
```
/app
  /page.jsx          → Landing page
  /pizza/page.jsx    → Pizza builder
  /cart/page.jsx     → Cart & map
  /success/page.jsx  → Order success
/components
  /Options.jsx       → Pizza selector UI
  /LiveMap.jsx       → Leaflet map component
```

---

## 📸 Preview

---

## 📄 License

MIT © [Satyam Jha](https://github.com/Satyam-kr-jha)