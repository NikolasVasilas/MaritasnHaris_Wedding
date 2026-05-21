# Χάρης & Μαρίτα — Wedding Invitation Website

You can find the webpage here: https://nikolasvasilas.github.io/MaritasnHaris_Wedding/

Warning: The development of this website relied heavily on AI tools. Please use it at your own discretion and responsibility.


A single-page wedding invitation website with a flippable card, couple photo + story, interactive map with directions, and contact section. White & gold theme.

---

## Files in this folder

```
wedding-site/
├── index.html              ← the page
├── styles.css              ← all styling
├── script.js               ← interactions (flip, map, reveals)
├── images/
│   ├── invitation-front.png  ← smoothed front of invitation
│   ├── invitation-back.png   ← smoothed back of invitation
│   └── couple.jpg            ← (you need to add this — see below)
└── README.md               ← this file
```

---

## Before going live — quick edits

### 1. Add the couple photo
Put a photo of you both into the `images/` folder and name it **`couple.jpg`**.
Recommended size: portrait orientation (e.g. 1200×1600 px). If you skip this, a placeholder graphic will show in its place.

### 2. Update the emails
Open `index.html`, search for `xaris@example.com` and `marita@example.com`, and replace them with the real ones. If you don't want to show emails at all, delete the two `<a class="contact-link" href="mailto:...">…</a>` blocks.

### 3. Customize the story text (optional)
In `index.html`, find the section marked `<!-- SECTION 2 · THE COUPLE -->`. The paragraphs starting with "Οι δρόμοι μας συναντήθηκαν…" are placeholder copy — replace with whatever you want guests to read.

### 4. Map location
The map is already pointing to **Κτήμα Ιππικού Ομίλου Ηρακλείου** (the venue from your invitation). Clicking the map or the "Οδηγίες στο Google Maps" button opens Google Maps directions from the visitor's current location to the venue.

If you want a different exact pin, edit two places in `index.html`:
- The `<iframe>` `src` (change the `q=lat,lng` numbers)
- The `<a id="mapCta">` `href` (change the destination)

---

## How to put it online

You have several free/cheap options. Pick **one**:

### Option A — Netlify Drop (easiest, 1 minute, no signup needed)
1. Go to <https://app.netlify.com/drop>
2. Drag the entire `wedding-site` folder onto the page.
3. Netlify gives you a live URL like `https://random-name-12345.netlify.app`. Done.
4. (Optional) Make a free account to keep it permanent and rename the URL to something like `xaris-marita.netlify.app`.

### Option B — GitHub Pages (free, permanent)
1. Make a free account at <https://github.com>.
2. Create a new **public** repository called `wedding` (or anything).
3. Upload all the files in this folder (drag & drop into the GitHub web interface works).
4. Go to **Settings → Pages**, set Source to "Deploy from branch", branch `main`, folder `/ (root)`, Save.
5. After ~1 minute your site is live at `https://YOUR-USERNAME.github.io/wedding/`.

### Option C — Vercel (free, fast)
1. Account at <https://vercel.com>.
2. Click "Add New → Project", import or upload the folder.
3. Click Deploy. Live in seconds at `your-project.vercel.app`.

### Option D — Your own domain (e.g. xarisandmarita.gr)
1. Buy the domain from a Greek registrar like **Papaki** (~€10/yr for .gr) or **GoDaddy / Namecheap** for `.com`.
2. Deploy with Netlify/Vercel/GitHub Pages first (above).
3. In your hosting provider's dashboard, go to "Domains" and add your custom domain. They'll show you DNS records to copy into your registrar's panel.
4. Wait 10 min – a few hours for DNS to propagate.

---

## Sharing the link with guests

Once live, you have a URL. Just share it:
- WhatsApp / Viber broadcast
- QR code on physical save-the-date cards (generate at <https://qr-code-generator.com>)
- Instagram bio / story
- Email signature

---

## Tweaks you might want later

- **Background music** — drop an `<audio>` tag with a soft piano track in `index.html`. Tell me if you want this added.
- **RSVP form** — a simple form that emails responses to you. Possible via Netlify Forms (free) or Google Forms embed.
- **Countdown timer** — counts down to 12 September.
- **Photo gallery** — a small lightbox gallery of your favorite photos together.

Just let me know which (if any) and I'll add them.

---

## A note on the design

- **Theme**: warm ivory background with gold leaf accents to match the embossed lettering on the invitation.
- **Fonts**: Cormorant Garamond (the elegant serif, similar to the invitation's typeface), Cormorant SC for small-caps labels, Pinyon Script for the romantic "&" and signature, Lato for body text.
- **Touches**: subtle paper grain texture, soft golden glow blobs in the background, decorative ornaments between sections, gold corner brackets framing the photo, animated dropcap on the story, and a hover effect on the CTA button that fills with gold.

Enjoy! 💛
