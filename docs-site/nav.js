/*
 * The order the documentation reads in.
 *
 * It lives here rather than in the pages themselves on purpose. Front matter
 * would put a position field at the top of every file, and these files are
 * read on GitHub as often as they are read here, where that block is noise
 * and where the README already links them in this order. Anything not listed
 * follows, alphabetically, so adding a page cannot make it invisible.
 */
export const ORDER = ['drupal-setup', 'theming', 'troubleshooting']

/*
 * The landing page is the repository's README, staged as `index`. It is a page
 * of the site but not one of the documentation pages, so it is filtered out
 * here and given its own entry in the menu below.
 */
const isDoc = (document) => document.slug !== 'index'

/** The documentation pages, in reading order. */
export const ordered = (documents) =>
  documents.filter(isDoc).sort((a, b) => {
    const ai = ORDER.indexOf(a.slug)
    const bi = ORDER.indexOf(b.slug)
    if (ai !== -1 && bi !== -1) return ai - bi
    if (ai !== -1) return -1
    if (bi !== -1) return 1
    return a.slug.localeCompare(b.slug)
  })

/**
 * The sidebar's sections, as DuiSidebar takes them.
 *
 * The overview is first and on its own, because it is the README and reads as
 * the module's front page rather than as the first chapter.
 */
/**
 * Where the runnable copy of the example lives.
 *
 * StackBlitz and not a page of this site: the example can only run on a
 * cross-origin isolated page, which a site on GitHub Pages cannot be, so an
 * embed here would render a frame that never starts. The link works
 * everywhere instead.
 */
export const exampleUrl = (demo) =>
  demo
    ? `https://stackblitz.com/github/${demo.repo}/tree/${demo.gitRef}/${demo.dir}`
    : null

export const sections = (
  documents,
  { overview = 'Overview', demo = null } = {}
) => [
  {
    title: null,
    links: [
      { text: overview, to: '/' },
      ...(demo ? [{ text: 'Live example', href: exampleUrl(demo) }] : []),
    ],
  },
  {
    title: 'Documentation',
    links: ordered(documents).map((document) => ({
      text: document.title,
      to: `/${document.slug}`,
    })),
  },
]
