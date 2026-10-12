# Shalet Maria Sanju — Holy Baptism Invitation

A beautiful, premium, and fully responsive digital Holy Baptism invitation web application celebrating **Shalet Maria Sanju**, beloved daughter of **Sanju Saju** and **Angela Alappat**, built with **React 19**, **TypeScript**, **Tailwind CSS**, and **TanStack Start**.

## Features

- **Sacred Aesthetics**: Sleek modern design featuring ivory, warm cream, champagne gold, and royal sapphire navy tones, custom typography, animations, and botanical floral borders.
- **Audio Backdrop**: High-fidelity background music featuring *"Deiva Thirumagal - Life is Beautiful"* by G.V. Prakash Kumar with an interactive floating toggle button.
- **Floating Petals & Stars Animation**: Gentle falling white & gold flower blossoms and celestial starlight across the screen.
- **Live Countdown Timer**: Real-time interactive countdown to November 6, 2026 at 3:00 PM GST.
- **Dual Venue Cards & Navigation**: Direct Google Maps navigation buttons for St. Michael's Catholic Church and Asian Empire Venue (Sharjah).
- **Guest Convenience**: One-click "Add to Calendar" and native "Share Invitation" actions.
- **Vercel & Social Ready**: Optimized metadata for link sharing previews (WhatsApp / iMessage / Open Graph) with custom thumbnail previews.

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (Vite + React)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide Icons
- **Deployment**: Vercel (Preset configured in `vite.config.ts`)

---

## Local Development

### 1. Installation

Install project dependencies using your preferred package manager (npm, bun, yarn):

```bash
npm install
# or
bun install
```

### 2. Run Development Server

Start the local server with hot-reloading:

```bash
npm run dev
# or
bun run dev
```

The application will run locally at `http://localhost:3000`.

### 3. Build & Production

Generate a static/serverless build optimized for Vercel production:

```bash
npm run build
```

You can preview the built production app locally using:

```bash
npm run preview
```

---

## Configuration & Customization

### 1. How to Change Invitation Contents & Details

All the dynamic content (couple names, date, location, event time, and map links) is located in [`src/routes/index.tsx`](file:///d:/DOWNLOADS/nikahsf/src/routes/index.tsx).

- **Couple Names**: Update the text inside the `Cover` and `CardContent` components:
  - Cover Title: Modify the header text in the `Cover` function (around line 208).
  - Main Cards: Modify the `<h2>` tags under `{/* Couple */}` inside the `CardContent` function.
- **Date & Time Cards**: Locate the `{/* Date block */}` section (around line 290):
  - Left Card (Date): Update the text for Month, Day, Weekday, and Year.
  - Right Card (Time/Event): Update the time text (e.g. `11:30 AM`) and the subtitle text (e.g. `NIKAH CEREMONY`).
- **Countdown Target**: Inside the `CardContent` component, change the `<Countdown target="..." />` string property to your desired date and time in standard ISO format (e.g., `2026-08-29T11:30:00`).
- **Venue & Location Details**: Update the address text and Google Maps `href` link inside the venue block (around line 347).
- **Page Titles & Meta tags**: To change what is shown in the browser tab and search results, update the metadata arrays in both [`src/routes/index.tsx`](file:///d:/DOWNLOADS/nikahsf/src/routes/index.tsx) and [`src/routes/__root.tsx`](file:///d:/DOWNLOADS/nikahsf/src/routes/__root.tsx) (look for the `title` and `description` key-value pairs).

### 2. How to Add or Change Background Music

The invitation includes auto-playing ambient background music. To update the audio:

1. Prepare your new audio file in `.mp3` format.
2. Rename the file to `music1.mp3`.
3. Replace the existing file at [`public/music1.mp3`](file:///d:/DOWNLOADS/nikahsf/public/music1.mp3).
4. Run `npm run build` to package the updated assets for deployment.

### 3. How to Update Images

- **Background Wallpaper**: Replace the image located at [`src/assets/nikah-bg.jpg`](file:///d:/DOWNLOADS/nikahsf/src/assets/nikah-bg.jpg).
- **Link Sharing Preview Thumbnail**: Replace the file at [`public/thumbnail.jpg`](file:///d:/DOWNLOADS/nikahsf/public/thumbnail.jpg). This image is shown as the preview thumbnail when sending the website link over messaging apps like WhatsApp or iMessage.

### 4. How to Add Multiple Couples

If the event hosts multiple weddings/nikahs together, you can customize [`src/routes/index.tsx`](file:///d:/DOWNLOADS/nikahsf/src/routes/index.tsx) to list multiple couples:

#### A. Under the Cover Section:
Replace the single couple header with a list of couples separated by an ampersand:
```tsx
<div className="flex flex-col items-center animate-float-up delay-500 gap-1 sm:gap-2">
  <h1 className="text-maroon-deep" style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(2.4rem, 9vw, 4rem)", lineHeight: 1.1 }}>
    Couple One Names
  </h1>
  <p className="my-0.5 text-gold-dark" style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(1.5rem, 4.5vw, 2.2rem)", lineHeight: 1 }}>
    &amp;
  </p>
  <h1 className="text-maroon-deep" style={{ fontFamily: "'Great Vibes', cursive", fontSize: "clamp(2.4rem, 9vw, 4rem)", lineHeight: 1.1 }}>
    Couple Two Names
  </h1>
</div>
```

#### B. Under the Invitation Card (CardContent Section):
Modify the couple element inside the card to stack multiple couples:
```tsx
{/* Couple 1 */}
<div className="mt-4 flex flex-col items-center">
  <h2 className="..." style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.05rem, 4.5vw, 1.4rem)" }}>
    GROOM ONE NAME
  </h2>
  <p className="my-0.5 italic text-gold-dark font-display text-[13px]">&amp;</p>
  <h2 className="..." style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.05rem, 4.5vw, 1.4rem)" }}>
    BRIDE ONE NAME
  </h2>
</div>

<p className="my-2 italic text-gold-dark font-display text-[14px]">and</p>

{/* Couple 2 */}
<div className="flex flex-col items-center">
  <h2 className="..." style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.05rem, 4.5vw, 1.4rem)" }}>
    GROOM TWO NAME
  </h2>
  <p className="my-0.5 italic text-gold-dark font-display text-[13px]">&amp;</p>
  <h2 className="..." style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.05rem, 4.5vw, 1.4rem)" }}>
    BRIDE TWO NAME
  </h2>
</div>
```


