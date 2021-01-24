FROM node:14 AS build

ADD . /src

WORKDIR /src
RUN npm install
RUN npm run build

WORKDIR /src/web
RUN npm install
RUN npm run build

# Now copy it into our base image.
FROM gcr.io/distroless/nodejs:14

WORKDIR /app
COPY --from=build /src/build /app
COPY --from=build /src/node_modules /app/node_modules
COPY --from=build /src/elements.yaml /app/elements.yaml
COPY --from=build /src/web/build /web/build

CMD ["index.js"]
