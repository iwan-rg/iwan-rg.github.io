#!/usr/bin/env python3
"""
Fetch publications for the iWAN Research Group from OpenAlex and write
data/publications.json. Run nightly by the GitHub Action, or locally:

    python scripts/fetch_publications.py

Reads author OpenAlex IDs from data/authors.json. No API key required.
"""
import json
import os
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AUTHORS_FILE = os.path.join(ROOT, "data", "authors.json")
OUT_FILE = os.path.join(ROOT, "data", "publications.json")

MAILTO = "hend.alkhalifa@gmail.com"  # OpenAlex polite pool
SELECT = ",".join([
    "id", "title", "display_name", "publication_year", "publication_date",
    "type", "type_crossref", "cited_by_count", "doi", "primary_location",
    "open_access", "authorships",
])


def classify(type_, crossref, source_type):
    """OpenAlex has a new `type` vocab plus legacy `type_crossref`; the latter
    distinguishes journal vs conference, so prefer it."""
    tc = crossref or ""
    if tc == "journal-article":
        return "journal"
    if tc == "proceedings-article":
        return "conference"
    if tc == "posted-content":
        return "preprint"
    if tc == "book-chapter" or tc.startswith("book") or tc in ("monograph", "reference-entry"):
        return "book"
    t = type_ or ""
    if t == "preprint":
        return "preprint"
    if t in ("book", "book-chapter"):
        return "book"
    if t in ("article", "review", "letter"):
        return "conference" if source_type == "conference" else "journal"
    return "other"


def get_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": f"iwan-rg-site (mailto:{MAILTO})"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode("utf-8"))


def fetch_author(author_id):
    works, cursor, pages = [], "*", 0
    while cursor and pages < 6:
        params = urllib.parse.urlencode({
            "filter": f"author.id:{author_id}",
            "per_page": 200,
            "cursor": cursor,
            "select": SELECT,
            "mailto": MAILTO,
        })
        data = get_json(f"https://api.openalex.org/works?{params}")
        works.extend(data.get("results", []))
        cursor = data.get("meta", {}).get("next_cursor")
        pages += 1
        if len(data.get("results", [])) < 200:
            break
        time.sleep(0.3)
    return works


def normalize(w):
    loc = w.get("primary_location") or {}
    src = loc.get("source") or {}
    venue = src.get("display_name") or ""
    doi = (w.get("doi") or "").replace("https://doi.org/", "")
    if doi:
        url = "https://doi.org/" + doi
    else:
        url = loc.get("landing_page_url") or w.get("id")
    oa = w.get("open_access") or {}
    authors = [a.get("author", {}).get("display_name") for a in w.get("authorships", [])]
    authors = [a for a in authors if a]
    title = w.get("display_name") or w.get("title") or "Untitled"
    key = ("doi:" + doi.lower()) if doi else ("t:" + " ".join(title.lower().split()))
    return {
        "key": key,
        "title": title,
        "year": w.get("publication_year") or 0,
        "date": w.get("publication_date") or "",
        "venue": venue,
        "type": classify(w.get("type"), w.get("type_crossref"), src.get("type")),
        "cites": w.get("cited_by_count") or 0,
        "doi": doi,
        "url": url,
        "oa": bool(oa.get("is_oa")),
        "oa_url": oa.get("oa_url"),
        "authors": authors,
    }


def main():
    with open(AUTHORS_FILE, encoding="utf-8") as f:
        cfg = json.load(f)
    author_ids = [a["id"] for a in cfg.get("openalex_authors", [])]
    if not author_ids:
        print("No authors configured.", file=sys.stderr)
        sys.exit(1)

    raw = []
    for aid in author_ids:
        print(f"Fetching {aid} …")
        try:
            raw.extend(fetch_author(aid))
        except Exception as e:  # noqa: BLE001
            print(f"  ! failed for {aid}: {e}", file=sys.stderr)

    # dedupe by key, keep the record with the most citations
    by_key = {}
    for w in raw:
        n = normalize(w)
        ex = by_key.get(n["key"])
        if ex is None or n["cites"] > ex["cites"]:
            by_key[n["key"]] = n

    pubs = sorted(by_key.values(), key=lambda p: (-p["year"], -p["cites"], p["title"]))

    out = {
        "updated": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "count": len(pubs),
        "source": "OpenAlex",
        "highlight_author": cfg.get("highlight_author", "Al-Khalifa"),
        "publications": pubs,
    }
    with open(OUT_FILE, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print(f"Wrote {len(pubs)} publications to {OUT_FILE}")


if __name__ == "__main__":
    main()
