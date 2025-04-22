# ---------- Frontend Build ----------
FROM oven/bun:latest AS frontend

WORKDIR /build
COPY web/package.json web/bun.lockb ./web/
RUN cd web && bun install

COPY ./web ./web
COPY ./VERSION ./VERSION

WORKDIR /build/web
RUN DISABLE_ESLINT_PLUGIN='true' VITE_REACT_APP_VERSION=$(cat ../VERSION) bun run build

# ---------- Backend Build ----------
FROM golang:alpine AS backend

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux

WORKDIR /build

COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Copy built frontend into correct spot
COPY --from=frontend /build/web/dist ./web/dist

# Inject version string directly in build command
ARG VERSION
RUN go build -ldflags "-s -w -X 'one-api/common.Version=${VERSION}'" -o one-api

# ---------- Final Image ----------
FROM alpine

RUN apk update \
    && apk upgrade \
    && apk add --no-cache ca-certificates tzdata ffmpeg \
    && update-ca-certificates

WORKDIR /data

COPY --from=backend /build/one-api /one-api

EXPOSE 3000

ENTRYPOINT ["/one-api"]
