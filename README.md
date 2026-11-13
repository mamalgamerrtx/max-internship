# NFT Marketplace

An NFT marketplace built with React for my internship. The starter template was static, and I made each section load live data from an API, with skeleton loading states, carousels and countdown timers.

**Live site:** https://mamalgamerrtx.github.io/max-internship/

## Features

- **Hot Collections:** a carousel of collections, with a skeleton carousel while loading.
- **New Items:** a carousel of new NFTs with a live countdown for items that have an expiry date.
- **Top Sellers:** a list of the 12 top sellers, each linking to their author page.
- **Explore:** a grid of NFTs with a sort filter (price low to high, price high to low, most liked) and a "Load more" button that shows 4 more items at a time.
- **Item Details:** a page for each NFT, showing its owner, creator, price, likes and views.
- **Author:** a profile page for each author, with their NFT collection, a copy button for their wallet address and a follow button.
- **Skeleton loading:** every section shows placeholder shapes that match its layout while the data loads.

## Built with

- React 17 and Create React App
- React Router v6
- Axios and the Fetch API
- React Owl Carousel (with jQuery 3)
- Bootstrap
- gh-pages for deployment

## Routes

| Path | Page |
| --- | --- |
| `/` | Home: Hot Collections, New Items, Top Sellers |
| `/explore` | Explore with filter and Load more |
| `/item-details/:nftId` | Item Details |
| `/author/:authorId` | Author profile |

The app uses `HashRouter`, so on the live site the URLs look like `/#/author/73855012`. This lets every page work on GitHub Pages, including after a refresh.

## API

All data comes from `https://us-central1-nft-cloud-functions.cloudfunctions.net/`:

| Endpoint | Used for |
| --- | --- |
| `hotCollections` | Hot Collections |
| `newItems` | New Items |
| `topSellers` | Top Sellers |
| `explore` and `explore?filter=<filter>` | Explore |
| `itemDetails?nftId=<id>` | Item Details |
| `authors?author=<id>` | Author |

## Getting started

```bash
git clone https://github.com/mamalgamerrtx/max-internship.git
cd max-internship
npm install
npm start
```

Then open http://localhost:3000.

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Runs the app in development mode |
| `npm run build` | Builds the app for production into `build/` |
| `npm run deploy` | Builds the app and publishes it to the `gh-pages` branch |
| `npm test` | Runs the tests |

## Project structure

```
src/
├── components/
│   ├── author/      AuthorItems
│   ├── explore/     ExploreItems, HeaderExplore
│   ├── home/        HotCollections, NewItems, TopSellers, Landing, ...
│   └── UI/          Skeleton, Countdown
├── pages/           Home, Explore, ItemDetails, Author
├── jquery-setup.js  Makes jQuery available to Owl Carousel
└── App.jsx          Routes
```

## Branches

Each feature was built on its own branch, with its own pull request for review, and then merged into `main`:
`hotcollections`, `newitems`, `itemdetails`, `topsellers`, `explore` and `author`.
