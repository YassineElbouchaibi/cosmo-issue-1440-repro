# Steps to repro https://github.com/wundergraph/cosmo/issues/1440

## Broken (Composed in specific order #1)

1. `npm i`
1. `npm run dev:subgraphs`
1. `npx wgc router compose -i cosmo-compose-broken.yaml -o cosmo-router.json`
1. `docker run -it --rm --volume ./cosmo-router.json:/router.json --volume ./cosmo-config.yaml:/config.yaml --network host -e LISTEN_ADDR=0.0.0.0:3003 ghcr.io/wundergraph/cosmo/router:0.151.1`

## Works (Composed in specific order #2)

1. `npm i`
1. `npm run dev:subgraphs`
1. `npx wgc router compose -i cosmo-compose-works.yaml -o cosmo-router.json`
1. `docker run -it --rm --volume ./cosmo-router.json:/router.json --volume ./cosmo-config.yaml:/config.yaml --network host -e LISTEN_ADDR=0.0.0.0:3003 ghcr.io/wundergraph/cosmo/router:0.151.1`