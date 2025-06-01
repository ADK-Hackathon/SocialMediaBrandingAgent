# Make sure you are at the frontend directory

```bash
$ cd frontent
```

# Install the dependencies
```bash
$ npm install
```

# Start the dev server
```bash
$ npx vite
```

# Docker Build

```bash
docker build -t frontend-app:latest .
```

# Docker Run

```bash
$ docker run -d -p 8080:8080 frontend-app:latest
```