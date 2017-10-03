# winnipeg

> fast, modern, simple url shortener

## getting started

```
npm install
```

## development

```
npm run dev
```

## production

```
npm run build && npm start
```

### environment variables

***`WINNIPEG_BASE_URL`***

Base URL from which shorts are generated, usually the same as the hosting domain.

### deployment

While not bound to any particular provider, [winnipeg](https://nipeg.win/)'s reference implementation runs on [now](https://github.com/zeit/now-cli) with the following configuration:

```json
{
  "name": "winnipeg",
  "alias": "nipeg.win",
  "env": {
    "WINNIPEG_BASE_URL": "https://nipeg.win"
  }
}
```

## license

MIT © [Pier-Luc Gendreau](https://github.com/Zertz)
