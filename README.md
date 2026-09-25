# Wa Methodist School for the Blind: Website

A modern, accessible, responsive website for **Wa Methodist School for the Blind** (also known as *Wa Methodist School for the Visually Impaired* / *Wa School for the Blind*) in Wa, Upper West Region, Ghana.

Tagline: **Brighter Futures Through Accessible Education.**
Values: **Learning · Inclusion · Independence · Confidence · Community**

---

## Tech & structure

Static, dependency-free site (HTML + CSS + vanilla JS). Fast-loading, SEO-friendly, no build step.

```
wa-methodist-website/
├── index.html          Home
├── about.html          About Us (story, mission/vision, timeline, leadership)
├── academics.html      Academics (basic school, rehabilitation, vocational, ICT)
├── admissions.html     Admissions (who we serve, steps, FAQ)
├── student-life.html   Student Life (independence skills, music, sports, tech)
├── news.html           News & Events
├── gallery.html        Gallery (accessible lightbox)
├── support.html        Support Our School (donation/pledge form)
├── contact.html        Contact Us (details + message form)
├── 404.html            Not found
├── css/styles.css      Brand stylesheet
├── js/main.js          Interactions (nav, reveal, accordion, lightbox, forms)
├── assets/logo.png     Official logo (from brand board)
├── assets/images/      Optimised authentic photographs
└── robots.txt, sitemap.xml
```

### Run locally
Any static server works, e.g.:
```
cd wa-methodist-website
python3 -m http.server 8080
```
Then open http://localhost:8080

---

## Brand identity (from the provided board)

| Token | Hex | Usage |
|---|---|---|
| Deep Plum | `#502D55` | Primary headings, dark sections, primary buttons |
| Muted Berry | `#935073` | Accents, links, secondary text, icons |
| Warm Peach | `#F6DBC0` | Highlights, eyebrow rules, CTA on dark |
| Soft Ivory | `#F8F4E9` | Page background |
| Headings | Montserrat Bold | h1–h4, eyebrows, buttons |
| Body | Source Sans 3 | Paragraphs, UI text |

All text/background colour pairs used meet **WCAG 2.2 AA** (most AAA). Berry-on-plum is intentionally avoided (fails contrast).

---

## Accessibility (WCAG 2.2 AA)

- Semantic HTML5 landmarks; logical heading order; skip-to-content link.
- Full keyboard operation; visible focus styles; ARIA on nav, accordion, lightbox, forms.
- Every image has meaningful `alt` (decorative images use `alt=""`).
- Colour contrast verified AA/AAA; never colour-alone to convey meaning.
- `prefers-reduced-motion` disables animations and scroll behaviour.
- Form fields have associated `<label>`s; status messages use `aria-live`.
- Lightbox is a modal dialog with Escape / arrow-key support and focus return.

---

## Research, verified facts

Compiled from public sources (see citations below). Facts are presented as reported; office-holders and contact details should be confirmed with the school.

- **Name:** Wa Methodist School for the Blind; also "Wa School for the Blind" / "Wa Methodist School for the Visually Impaired".
- **Location:** Masse Road, Wa, Upper West Region, Ghana.
- **Founded:** May 1958 by the Methodist Church, Ghana.
- **Founder & first headmaster:** Benjamin Kwaku Awumee (1958–1981).
- **Type:** Residential special school for blind / low-vision learners; for many years the only one serving the three northern regions.
- **Mission:** Prepare and equip children with special needs from kindergarten to post-JHS with the academic, socio-economic and moral training necessary for self-reliance.
- **Programmes:** Basic school (KG–JHS, Ghana Education Service syllabus, braille/large print); rehabilitation class (braille for those who lose sight later); vocational training (soap making, weaving camp beds & chairs, door mats, crafts); ICT/computer learning centre.
- **Enrolment / staff:** roughly 220–250+ learners; ~74 staff incl. ~36 teachers (2016 figures); Nubuke Foundation cites ~400.
- **Achievements:** historically 100% BECE pass rate; among the best in Wa Municipality; learners have won inter-school medals.
- **Leadership (recent reports):** Headmistress Rev. Grace Amoako; Upper West Methodist Education Unit oversight.
- **Partners:** Methodist Church Ghana, Ghana Education Service, Ghana Society for the Blind, UNESCO, Force Foundation (Netherlands), Nubuke Foundation (since 2011), Rotary clubs (Wa, Accra Ridge, Southport Links UK), UNICOF, National Youth Authority.
- **Challenges reported:** 2011 fire (boys' dormitory + assembly hall), campus erosion, need for braille materials and accessible facilities.

### Sources
- Nubuke Foundation, https://wa.nubukefoundation.com/Wa-Methodist-School-for-the-Blind
- Graphic Online, https://www.graphic.com.gh/news/education/challenges-hinder-performance-of-wa-methodist-school-for-the-blind.html
- GNA, https://gna.org.gh/2022/08/wa-school-for-the-blind-appeals-for-support/
- Modern Ghana, https://www.modernghana.com/news/865700/wa-school-for-the-blind-gets-support.html
- GhanaWeb (Computer Learning Centre), https://www.ghanaweb.com/GhanaHomePage/NewsArchive/Wa-Methodist-School-for-the-Blind-gets-Computer-Learning-Centre-172613
- Right to Sight & Health (founder), https://righttosightandhealth.org/blind-school-in-wa-blog-1/
- Kidney Health International, https://kidneyhealthinternational.org/wa-methodist-school-for-the-blind-holds-kidney-health-education/

---

## Image credits & copyright

All photographs are authentic to the school and used for illustration. They are credited to their sources below. If you are a rights holder with a concern, please contact the school so an image can be removed or replaced.

| File | Subject | Source |
|---|---|---|
| `school-gate.jpg` | School entrance & sign | Public post via yen.com.gh / TikTok @taf.wa |
| `student-singing.jpg` | Student performing | Public post via yen.com.gh / TikTok @taf.wa |
| `founder-statue.jpg` | Founder's statue | righttosightandhealth.org |
| `classroom-braille.jpg` | Braille/learning session | kidneyhealthinternational.org |
| `community-support.jpg` | Clean-up & donation | modernghana.com |
| `vocational-crafts.jpg` | Vocational crafts | wa.nubukefoundation.com |
| `learning-activity.jpg` | Guided learning | wa.nubukefoundation.com |
| `cultural-event.jpg` | Cultural exhibition | wa.nubukefoundation.com |
| `student-performance.jpg` | Student performance | public social media |

**Privacy note:** Images show identifiable learners. They are used with care to celebrate the students' talents; the school should obtain appropriate consent before publishing.

---

## Before going live

1. Connect the contact/support forms to the school's email or a form service (they are currently demos).
2. Confirm the phone number, office hours and any official email/address with the school.
3. Add verified payment/bank details (or a payment provider) for donations.
4. Replace the `og:image`/canonical host with the real domain.
5. Obtain consent/permissions for all published photographs.
