# Boilerplate for Express - GraphqlQL server

## Architecture
- Express server
- GraphQL endpoint
- Postgresql integration
- Docker development environment
- Redis server for GraphQL subscriptions

## Setup
- install npm modules: yarn install
- copy .env-example and rename it to .env (change env variables if needed)

## Start up
- docker-compose up server

## Create first query
- open "http://localhost:8080/graphiql"
- insert and execute the following query

```
{
  posts {
    title
    votes
    author {
      firstName
      lastName
    }
  }
}

```

## Additional Pages
- **[Visualize GraphQL Schema](docs/schemaVisualization.md)**