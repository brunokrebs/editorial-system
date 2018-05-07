## The Editorial System Backend

The backend that supports [the frontend Editorial System application](../frontend/) is based on [RestFlex](https://github.com/Digituz/rest-flex). As such, to run it, you will need to have access to a MongoDB instance, then you have to run RestFlex from scratch, or use [this Docker image](https://hub.docker.com/r/digituz/rest-flex/).

Running it with Docker is as simple as:

```bash
# define domain to avoid too much typing
DOMAIN=editorial-system

# if you don't have a MongoDB instance
docker run --name $DOMAIN-db \
  -p 27017:27017 \
  --network digituz \
  -d mongo

# run RestFlex on Docker
docker run --name $DOMAIN-api \
  -e "DOMAIN=$DOMAIN" \
  -e "MONGODB_URL=$DOMAIN-db:27017/$DOMAIN" \
  -e "AUTH0_DOMAIN=digituz-corp.auth0.com" \
  -e "AUTH0_AUDIENCE=https://$DOMAIN.digituz.com.br" \
  --network digituz \
  -p 3001:80 \
  -d digituz/rest-flex
```
