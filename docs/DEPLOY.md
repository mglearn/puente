# Deployment

Language Bridge follows the mglearn convention: **its own repo, served as a
GitHub Pages project page.**

- Repo: `github.com/mglearn/puente`
- Live URL: `https://mglearn.github.io/puente/`
- Source of truth: the repo **root** is the site (static, no build step).
- Auth: this folder auto-uses the `mglearn` GitHub account for both commit
  identity and push (see [`../README-git-accounts.md`](../../README-git-accounts.md)).

## One-time setup

```bash
# from puente/ (git is already initialized here)
gh repo create mglearn/puente --public --source=. --remote=origin --push
# then enable Pages: Settings → Pages → Deploy from a branch → main / (root)
# or via CLI:
gh api -X POST repos/mglearn/puente/pages -f 'source[branch]=main' -f 'source[path]=/' 2>/dev/null || true
```

Because the site is served from `…/puente/`, **all internal links are relative**
(`../../assets/…`, `window.LB_BASE`) — verified, no leading-slash absolute paths.
That keeps it working under the subpath.

## Every deploy after that

```bash
npm run check            # must pass first (validators + tests)
./scripts/deploy.sh "Message describing the change"
```

The script gates on `npm run check`, commits, and pushes to `main`. Pages
rebuilds in ~1 minute.

## Pre-launch checklist (before making it public / announcing)

- [ ] `npm run check` green
- [ ] Standards: cross-check the revised Ch. 120 ELPS against TEA's `ch120b.pdf`
      (currently confirmed against a single authoritative reproduction)
- [ ] Spanish review pass complete (remaining `reviewed` keys → `published`)
- [ ] Accessibility + print QA (see [`QA_CHECKLIST.md`](QA_CHECKLIST.md))
