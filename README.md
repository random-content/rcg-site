# rcg-site

The Random Content Generator website, built with Angular and Firebase. Check it out at https://rcg.dev

## Front end

The client side of the site is an Angular SPA. It's got some interesting stuff like a loading handoff after the app bootstraps, but for the most part it's a simple implementation of an Angular client.

## Back end

Page content, user data, and (eventually) blog posts are hosted on an external WordPress server and accessed through the WordPress REST API. Repository info is pulled from the GitHub API. Between the client and the APIs sits a Firebase function. It's responsible for massaging response data from the APIs into leaner formats for the client. It also leverages Google's CDN to provide caching and improve load times.

## Running Locally

You should be able to run it locally by installing dependencies for both the app and the functions, then running the `serve` script:
```
npm install
npm --prefix functions install
npm run serve
```

It might not work, though! I haven't tested a fresh repository.

## To-dos

- [ ] Build the blog section
- [ ] Implement lazy loading of pages
- [ ] Incorporate Angular Universal for SSR & SEO
- [ ] Implement contact form submission
