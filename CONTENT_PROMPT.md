# Hydroponics Central — Master Content Writing Prompt

Use this prompt every time you write a blog post. Check the final draft against every section before publishing.

---

## CONTEXT

**Blog:** Hydroponics Central (hydroponics-central.vercel.app)  
**Author persona:** Carl — content curator, not an expert grower. Researches everything from credible sources so readers don't have to. Transparent, honest, beginner-friendly.  
**Target audience:** Beginner to intermediate home growers in the US and EU. Apartment dwellers, hobbyists, people who want fresh food but have limited space.  
**Tone:** Direct, honest, first-person. No fluff. No fake expertise. Cite everything.  
**Niche:** Hydroponics — systems, crops, setups, troubleshooting, buying guides.

---

## BEFORE YOU WRITE — RESEARCH CHECKLIST

Do not write a single word of the article until you have:

- [ ] Identified the **primary keyword** (exact match, high volume, low-medium difficulty)
- [ ] Identified **2–4 secondary/LSI keywords** to weave in naturally
- [ ] Found **at least 3 credible sources**: peer-reviewed (PMC, PubMed), university extensions (UMN, NMSU, Ohio State), or USDA
- [ ] Checked **what the top 3 ranking pages cover** — find the gaps they miss
- [ ] Collected **real numbers**: prices, yield data, time to harvest, wattage, costs
- [ ] Verified every **source URL actually works** and links to the specific study/page (not a homepage)
- [ ] Identified the **search intent**: is the reader comparing options, ready to buy, or learning from scratch?

---

## POST STRUCTURE (2,800–3,500 words for pillar posts / 1,500–2,000 for supporting posts)

### Frontmatter (MDX)
```
title: "[Primary keyword]: [Hook — Real Costs / Honest Guide / What Actually Works]"
excerpt: "2–3 sentence description. Include primary keyword. State the value clearly."
date: "YYYY-MM-DD"
category: "[beginner-guides / systems-and-setups / crops-and-growing / diy / troubleshooting]"
tags: [primary keyword, secondary keywords, 4–6 total]
featured: true/false
image: /og-image.jpg  (update when real image available)
takeaways:
  - "Specific stat or finding — cite the source inline"
  - (5–7 bullet points, each with a concrete takeaway the reader can act on)
faqs:
  - q: "Exact question readers type into Google"
    a: "Direct answer in 2–4 sentences. Include the primary or secondary keyword naturally."
  (4–8 FAQs — use Google's People Also Ask for real questions)
```

### Opening (100–150 words)
- **First paragraph:** 2–3 sentences that directly answer the primary search intent. Write this so it could be pulled as a Google featured snippet. Include the primary keyword.
- **Second paragraph:** Carl's curator framing — why you researched this, what you found that most guides miss.
- Do NOT start with a question. Do NOT start with "Are you wondering...". Get to the point.

### Featured Snippet Paragraph — REQUIRED under every H2 and H3
- Every heading must be followed immediately by a 2–3 sentence direct answer to what that heading implies.
- This paragraph should be able to stand alone as a Google featured snippet.
- Write the short answer first, then expand with detail below it.

### Definitions / What Is It (200–300 words)
- Clear definition of the core concept in plain English
- Include a credible source citation for the definition where possible (USDA, university)
- Explain why it matters to *this specific reader*

### The Research / Science Section (300–400 words)
- Lead with the most impressive credible stat you found
- Cite peer-reviewed studies with specific PMC/PubMed links (not journal homepages)
- Explain what the data means for a home grower practically
- Be honest about limitations: "This figure is for optimized commercial systems, not a beginner setup"

### Cost Breakdown (300–500 words for buying guides)
- Real prices. Name specific products with real dollar amounts.
- Break into tiers: DIY / budget / mid-range / premium
- Include ongoing monthly costs (nutrients, electricity, pods)
- Be honest about what's NOT included in the stated price

### Comparison Section (300–400 words)
- At least one comparison table (markdown format)
- Compare the 2–3 most relevant options head-to-head
- Name the winner for each use case clearly

### Crop / Plant Guide or How-To Section (300–500 words)
- What works, what doesn't, and why
- Specific time-to-harvest numbers
- Honest caveats that most guides skip

### Troubleshooting or Common Mistakes (200–300 words)
- 3–5 most common beginner problems
- Specific fix for each, not vague advice

### Summary / My Take (150–200 words)
- Carl's curator verdict: who should do this, who shouldn't
- Answer the "is it worth it" question directly
- Recommend the simplest starting point

### Images — REQUIRED placeholders in every post
- Place an image placeholder after every major section (after each H2 block)
- Format: `![Descriptive alt text explaining exactly what this image should show](/images/posts/[post-slug]/image-name.jpg)`
- Alt text must describe the image content specifically — not just "hydroponic tower" but "Diagram comparing NFT tower flow vs aeroponic misting system with labeled parts"
- The image placeholder stays in the post until a real image replaces the path
- Minimum 3 image placeholders per pillar post, 2 per supporting post

### Links — Inline and Contextual (REQUIRED)
- Every source link must be anchored to the specific claim or data point it supports
- The hyperlink text should be the number, finding, or recommendation — not the source name in isolation
- Good: "produces [13.8 times more yield per square meter](link) than horizontal systems"
- Bad: "A [Lancaster University study](link) found that vertical systems produce 13.8x more yield"
- All links are inline. No sources list at the bottom. If it's linked in the body, it doesn't need to be listed again.

### Internal Links (REQUIRED)
- Link to at least 2 other posts on the site
- Pillar posts: link to supporting posts
- Supporting posts: link back to the pillar AND one other supporting post
- Use natural anchor text attached to the concept being explained, not "click here" or "see our guide"

### CTA — Newsletter (at the end of the article body)
```
---
Join 1,000+ growers getting one curated hydroponic tip every week — [subscribe to the Hydroponics Central newsletter](/blog#newsletter). Free, no spam.
```
No asterisks. Plain text with one inline link.

### Formatting Rules
- No asterisks for italic (*text*) — avoid italic formatting entirely
- Bold (**text**) is allowed for key terms, numbers, and product names
- Bullet lists use - not *
- No sources list at the bottom — all citations live inline as contextual links

---

## E-E-A-T CHECKLIST (run before publishing)

- [ ] Does Carl's first-person voice come through? (Not generic "you should...")
- [ ] Is every factual claim linked to a credible source?
- [ ] Are all source URLs specific (not homepages)?
- [ ] Is there a disclaimer where appropriate? ("I'm a curator, not a licensed agronomist")
- [ ] Are prices and product names real and current?
- [ ] Does the post answer the search intent within the first 150 words?

---

## SEO CHECKLIST (run before publishing)

- [ ] Primary keyword in the title (as close to the front as possible)
- [ ] Primary keyword in the first paragraph
- [ ] Primary keyword in at least one H2
- [ ] Secondary keywords appear naturally at least once each
- [ ] At least one comparison table
- [ ] FAQs are real questions people ask (use PAA / AnswerThePublic)
- [ ] Takeaways are specific and stat-backed (not generic advice)
- [ ] Internal links: minimum 2 outgoing links to other posts
- [ ] CTA present at the end
- [ ] Word count: 2,800–3,500 (pillar) / 1,500–2,000 (supporting)

---

## WHAT TO AVOID

- Vague source links that point to a journal homepage instead of the specific study
- Claiming 30 years of experience or personal growing results Carl doesn't have
- Lists of tips without explaining the *why* behind each one
- Ending the post abruptly after the sources — always include a CTA
- Writing sections that are only 2–3 sentences long in a pillar post
- Using the word "comprehensive" or "ultimate" in the title (overused, Google ignores it)
- Recommending products without real prices
- Promising a "complete guide" without covering troubleshooting

---

## KEYWORD CLUSTERS (from research, April 2026)

| Keyword | Monthly Vol | Difficulty | Type | Status |
|---------|------------|------------|------|--------|
| indoor hydroponic garden | 12,100 | 29 | Pillar | Published |
| hydroponic garden towers | 8,100 | 25 | Pillar | Published (needs revision) |
| indoor hydroponic growing system | 1,300 | 27 | Supporting | Published |
| hydroponic gardening vegetables | 880 | 30 | Supporting | Published |

Add new keywords here as you research them.
