# STUDY GUIDE — Recipe Discovery App (SBA 416)

For learning: what words mean, why they're called that, and why we did each step.
(Tasks are in TODO.md. README/reflection material is in NOTES.md.)

---

## Glossary (and why things are called what they are)

| Word | Plain meaning | Why it's called that |
|---|---|---|
| **Repository (repo)** | A project folder that Git tracks the history of | "Repository" = a storage place. It stores every saved version. |
| **Clone** | Download a copy of a GitHub repo to your computer, already linked to GitHub | You make an identical twin of it. |
| **origin** | Git's nickname for "the GitHub copy" of your repo | It's where your local copy *originated* from. |
| **Commit** | A saved snapshot of your files, with a message | Like "committing" to a decision: this version is now on the record. |
| **Stage (`git add`)** | Pick which changes go into the next commit | Like staging items before a photo: you set them up first, then snap. |
| **Push** | Upload your commits to GitHub | You push changes *away* from your machine. (Pull = bring them in.) |
| **Upstream (`-u`)** | Tells Git which GitHub branch your local branch goes with | The remote copy is "up the stream" your code flows to. |
| **Branch** | A separate line of work so you can try things without breaking main | Like a tree branch growing off the trunk (`main`). |
| **Directory** | A folder | Older computer word: a *directory* lists files, like a phone directory. |
| **`cd` / `mkdir` / `rm`** | Change directory / make directory / remove (delete) | Short for exactly what they do. |
| **npm** | Node Package Manager: downloads code libraries other people wrote | It manages "packages" (bundles of code). |
| **package.json** | The project's ID card: name, scripts, list of libraries it needs | It describes the *package* (your project). |
| **node_modules** | The folder where npm puts downloaded libraries. Huge. Never commit it. | The modules Node uses. |
| **.gitignore** | A list of files/folders Git should pretend don't exist | Git *ignores* whatever's listed. |
| **Vite** | A tool that runs a dev server and builds your app | French for "fast" (pronounced "veet"). |
| **Scaffold** | Generate the starting files for a project | Like scaffolding on a building: the frame you build on. |
| **Dev server** | A tiny local website (`localhost:5173`) that reloads when you save | "localhost" = this computer. |
| **DevTools / Console** | Browser tools (F12). The Console shows errors in red. | Tools for developers; "console" comes from old computer control panels. |
| **TypeScript (TS)** | JavaScript plus labels describing what kind of data things are | It adds *types* to JavaScript. |
| **.tsx** | A TypeScript file that contains JSX (HTML-looking code in React) | TS + JSX = TSX. |
| **Component** | A reusable piece of UI, written as a function that returns JSX | It's a *component* part of the whole page, like a car part. |
| **SPA** | Single Page Application: one HTML page, React swaps the content | Browser never loads a whole new page. |
| **Route** | A URL path mapped to a page component | The *route* you travel to reach a page. |
| **Hook** | A React function starting with `use` that gives components extra powers (state, effects) | You "hook into" React's features. |
| **Custom hook** | Your own function starting with `use` that bundles hooks together for reuse | Same idea, written by you. |
| **Context** | A way to share data with any component without passing props through every level | It's the shared "context" all components live in. |
| **Prop drilling** | Passing data down through components that don't need it, just to reach one that does | Drilling down layer by layer. Context fixes it. |
| **localStorage** | Browser storage that survives refresh and closing the browser | It's *local* (on this computer) *storage*. |
| **API / endpoint** | A URL that returns data (JSON) instead of a web page | Endpoint = the end of the line where you request data. |
| **Top-down** | Build the big outer pieces first, then fill in the smaller ones | You start at the *top* of the component tree and work *down*. |

---

## WHY notes (by phase)

### Overall approach: Top-down, components first, routes last
- Build the component structure first: App at the top, then Navbar and pages, then the small pieces (cards, spinner) as placeholders.
- Then fill in pages one at a time with real data.
- Add routing LAST to connect the pages. (Instructor's guidance.)
- Make a component or hook **when a page needs it**, not ahead of time.
- When code repeats, pull it out into something reusable (e.g., `useFetch`).
- Why: you always have a working app, and you never build parts you don't use. (Instructor's recommendation.)

### Phase 0: Setup
- **Why clone instead of making a new folder?** Cloning sets up the link to GitHub (`origin`) automatically, so `git push` just works.
- **Why `npm create vite@latest .`?** The `.` means "right here," so Vite doesn't make a folder inside your repo folder.
- **Why Vite?** It's the standard modern way to start a React app. (Create React App is retired.)
- **Why TypeScript?** Our course uses it, and it catches mistakes (like typos in API field names) before you run the code. The SBA doesn't require it.
- **Why react-router-dom?** React by itself has no idea about URLs. This library maps URLs to components, which the SBA's five routes need.
- **Why `npm install` after scaffolding?** Vite only writes the files. `npm install` reads package.json and downloads what's listed into `node_modules`.
- **Why is `node_modules` in `.gitignore`?** It's huge and anyone can recreate it with `npm install`. Only your code goes on GitHub.
- **Why simple commit messages?** A commit message should say what you did in plain words so anyone (including future you) understands the history.

### Phase 1: Clean up + folders
- **Why delete the demo?** It's leftover sample code. Keeping it clutters the project and confuses graders.
- **Why `box-sizing: border-box`?** It makes an element's width include its padding and border, so layouts do what you expect. Almost every project starts with this.
- **Why these folders?**
  - `components/` = reusable building blocks (Navbar, RecipeCard, Spinner)
  - `pages/` = one component per route/URL (Home, Favorites...)
  - `hooks/` = custom hooks (useFetch, useLocalStorage)
  - `context/` = global shared state (FavoritesContext)
  - `types/` = TypeScript descriptions of the API data
  - Splitting by job makes things easy to find and is how real teams organize React apps.
- **Why don't empty folders show on GitHub?** Git tracks files, not folders. A folder appears once it has a file in it.
- **Why does `index.html` matter so much?** It's the one real page of the SPA. It has two key pieces:
  - `<div id="root"></div>`: an empty box. React draws your entire app inside it ("root" = where the component tree starts).
  - `<script type="module" src="/src/main.tsx">`: the line that loads React. Without it, none of your code runs.
  - Missing either one = blank page.
- **Debugging habit:** blank/black page = check the Console (F12) and the terminal for red errors first. Also check for unsaved files (white dot on the VS Code tab).


### Phase 2: Component structure
- **Why a branch?** `main` should always be working code. You build a feature on its own branch, and only merge it into `main` when it works. If you break something, `main` is safe. Real teams do this for every feature.
- **Why `feature/` in the branch name?** Just a label so you can tell what kind of work it is (`feature/`, `fix/`). The `/` is part of the name, not a folder.
- **What's a placeholder?** A component that just shows its own name for now. It proves the piece exists and is in the right spot before you spend time on what's inside.
- **Why build the structure first?** You see the whole "family tree" of the app working before any details. Then you fill in one branch of the tree at a time, and you always know where a new piece fits.
- **Component tree:** components live inside other components, like boxes in boxes:
  ```
  App
  ├── Navbar
  └── main
      ├── HomePage → CategoryCard (many)
      ├── CategoryPage → RecipeCard (many)
      ├── RecipeDetailPage
      ├── FavoritesPage → RecipeCard (many)
      ├── SearchPage → RecipeCard (many)
      └── NotFoundPage
  (Spinner and ErrorMessage get used inside pages while loading / on errors)
  ```
  - "Parent" = the outer component. "Child" = a component used inside it. HomePage is the parent of CategoryCard.
- **pages vs components folders:** a *page* is a whole screen (one per URL later). A *component* is a smaller reusable piece used on pages.
- **Why does RecipeCard get reused?** Category, Favorites, and Search all show lists of recipes. Write the card once, use it in three places. That's the point of components.
- **Why do files start with a capital letter (`HomePage.tsx`)?** React requires components to start with a capital letter. That's how it tells your components (`<HomePage />`) apart from normal HTML tags (`<div>`). Naming the file the same way keeps it consistent.
- **What's `export default`?** It makes the component available to other files. `import HomePage from './pages/HomePage'` grabs it.
- **What's `<main>`?** An HTML tag meaning "the main content of the page." It's like a `<div>` but tells screen readers and graders what it is (this is called *semantic* HTML: tags that describe their meaning).
- **Why stack all pages in App for now?** Temporary, just to see every page render. Routing (Phase 9) will replace this so only one page shows at a time.

### Phase 9: Routing (notes saved for later)
- **Why `BrowserRouter` goes in main.tsx?** It has to wrap the *whole* app so every component can use routing. main.tsx is the very top. "Browser" because it uses the browser's real address bar.
- **`Routes` and `Route`:** `Routes` looks at the current URL and picks the ONE `Route` that matches. Each `Route` says "this path → show this component."
- **What's `:categoryName`?** The colon means "this part of the URL is a variable." `/category/Seafood` and `/category/Dessert` both match `/category/:categoryName`. That's a **dynamic route**. `/favorites` is a **static route** (always the same). We read the variable with `useParams` ("params" = parameters, the variable pieces of the URL).
- **What's `path="*"`?** `*` means "anything." Listed last as a catch-all: if nothing else matches, show the 404 page. (404 = the web's code for "not found.")
- **Why does the Search route have no `?query` in its path?** The part after `?` is the **query string**. It isn't part of the path, so the route is just `/search`. We read `?query=...` with `useSearchParams`.
