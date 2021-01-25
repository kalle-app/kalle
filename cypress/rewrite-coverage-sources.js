#!/usr/bin/env node
const fs = require("fs")
const fastGlob = require("fast-glob")
const nodePath = require("path")

process.stdin.on("data", (buffer) => {
  const lines = buffer.toString("utf-8")

  const adapted = lines.replace(/^(SF:)(.*)$/gm, (_full, sf, path) => {
    path = path.replace(".blitz/caches/dev/", "")

    if (path.startsWith("app/_resolvers")) {
      path = path.replace("_resolvers/", "")
    } else if (path.includes("mutations") || path.includes("queries")) {
      path = "app/" + path.replace("pages/api/", "")
    }

    if (path.startsWith("pages/")) {
      const pathName = path.replace("pages/", "")
      const [file] = fastGlob.sync("**/" + pathName, { cwd: nodePath.join(__dirname, "../app") })
      path = "app/" + file
    }

    if (path.startsWith("api/")) {
      path = "app/" + path
    }

    return sf + path
  })

  process.stdout.write(adapted)
})
