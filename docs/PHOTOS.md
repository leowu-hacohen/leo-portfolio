# Photo galleries

Every gallery lives at `leowuhacohen.com/photos/<slug>` and is listed on `/photos`.

## Add or update a gallery

1. Export the edits you want to send into one folder. Filenames set the order,
   so prefix them (`01_`, `02_`...) if you care about sequence.
2. Run:

   ```bash
   npm run photos -- --slug stevelacy --artist "Steve Lacy" --dir ~/Pictures/exports/stevelacy --venue "The Observatory" --city "Santa Ana, CA" --date 2026-11-20
   ```

   Optional flags: `--publication "KUCI 88.9 FM" --publication-url https://kuci.org`
   (credit reads "Shot by Leo Wu-Hacohen for KUCI 88.9 FM"), `--event "Tour name"`, `--cover 7` (which photo is the cover
   and the link-preview image), `--unlisted true` (hidden from /photos and
   search engines, still reachable by direct link).
3. Check `http://localhost:3000/photos/stevelacy`, then commit and push.

Rerunning replaces the whole set. Flags you leave out keep their last value.

## What teams get

- **Download all**: one zip of every original, named `LeoWuHacohen_SteveLacy.zip`.
- **Per photo download**: the original, named `LeoWuHacohen_SteveLacy_07.jpg`.
- **Standalone page**: no site nav, and nothing on leowuhacohen.com links to it. Share the URL directly.
- **Numbered photos** and deep links (`/photos/stevelacy#7`), so a manager can
  say "we want 7 and 12" without screenshots.
- **Copy photo credit** button.
- A link preview with the cover photo when the URL is pasted in iMessage,
  Slack, or email.

## Storage note

Originals and the zip are committed to the repo and served by Vercel. That is
fine for a handful of sets exported as high-quality JPEGs, but every set roughly
doubles in the repo (originals + zip). Once sets get large, move `full/` and the
zip to object storage (Vercel Blob or Cloudflare R2) and point the URLs in
`lib/photos.ts` at it; the gallery itself does not need to change.
