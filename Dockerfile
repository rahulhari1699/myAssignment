 
## Stage 1 (production base)
# This gets our prod dependencies installed and out of the way

FROM ubuntu:20.04 as base

EXPOSE 5007
RUN apt update
RUN apt install curl -y
RUN curl --silent --location https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes build-essential

WORKDIR /opt

COPY package.json package-lock*.json ./

RUN npm config list \ && npm ci \ && npm cache clean --force


    

## Stage 2 (development)
# we don't COPY in this stage because for dev you'll bind-mount anyway
# this saves time when building locally for dev via docker-compose
FROM base as dev

ENV NODE_ENV=development

ENV PATH=/opt/node_modules/.bin:$PATH

WORKDIR /opt

RUN npm install --only=development

WORKDIR /opt/app

CMD ["nodemon", "server.js", "--inspect=0.0.0.0:9229"]



## Stage 3 (copy in source)
# This gets our source code into builder for use in next two stages
# It gets its own stage so we don't have to copy twice
# this stage starts from the first one and skips the last two
FROM base as source

WORKDIR /opt/app

COPY . .



## Stage 4 (testing)
# use this in automated CI
# it has prod and dev npm dependencies
# In 18.09 or older builder, this will always run
# In BuildKit, this will be skipped by default 

FROM source as test

ENV NODE_ENV=development
ENV PATH=/opt/node_modules/.bin:$PATH

# this copies all dependencies (prod+dev)
COPY --from=dev /opt/node_modules /opt/node_modules




## Stage 5 (security scanning and audit)
FROM test as audit

# RUN npm audit fix

# RUN npm audit



FROM source as prod

CMD ["node","server.js"]







