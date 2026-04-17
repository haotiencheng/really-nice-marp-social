#!/usr/bin/env swift
//
// Generate the shipped `default` theme backgrounds (cream + faint grid, no watermark).
// Usage:
//   swift scripts/gen-default-bg.swift               # regen all 5
//   swift scripts/gen-default-bg.swift bg-cover.png  # regen one
//
// Writes PNGs to themes/default/backgrounds/.

import CoreGraphics
import Foundation
import ImageIO
import UniformTypeIdentifiers

let fm = FileManager.default
let repoRoot = URL(fileURLWithPath: fm.currentDirectoryPath)
let outDir = repoRoot.appendingPathComponent("themes/default/backgrounds")
try? fm.createDirectory(at: outDir, withIntermediateDirectories: true)

struct Tint { let r: CGFloat; let g: CGFloat; let b: CGFloat; let a: CGFloat }
struct BgSpec { let name: String; let tint: Tint? }

let specs: [BgSpec] = [
  BgSpec(name: "bg-cover.png", tint: nil),
  BgSpec(name: "bg-body.png", tint: nil),
  BgSpec(name: "bg-quote.png", tint: Tint(r: 0.107, g: 0.314, b: 0.408, a: 0.05)),
  BgSpec(name: "bg-stat.png", tint: nil),
  BgSpec(name: "bg-closing.png", tint: nil),
]

let targets: [BgSpec]
if CommandLine.arguments.count > 1 {
  let filter = Set(CommandLine.arguments.dropFirst())
  targets = specs.filter { filter.contains($0.name) }
} else {
  targets = specs
}

let width = 1080
let height = 1350
let spacing: CGFloat = 108

func render(_ spec: BgSpec) {
  let cs = CGColorSpaceCreateDeviceRGB()
  guard let ctx = CGContext(
    data: nil,
    width: width,
    height: height,
    bitsPerComponent: 8,
    bytesPerRow: 0,
    space: cs,
    bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue,
  ) else {
    FileHandle.standardError.write("failed ctx \(spec.name)\n".data(using: .utf8)!)
    exit(1)
  }

  // Cream base
  ctx.setFillColor(red: 0.949, green: 0.930, blue: 0.887, alpha: 1.0)
  ctx.fill(CGRect(x: 0, y: 0, width: width, height: height))

  if let t = spec.tint {
    ctx.setFillColor(red: t.r, green: t.g, blue: t.b, alpha: t.a)
    ctx.fill(CGRect(x: 0, y: 0, width: width, height: height))
  }

  // Grid lines
  ctx.setStrokeColor(red: 0.883, green: 0.864, blue: 0.820, alpha: 1.0)
  ctx.setLineWidth(1.5)
  var x: CGFloat = 0
  while x <= CGFloat(width) {
    ctx.move(to: CGPoint(x: x, y: 0))
    ctx.addLine(to: CGPoint(x: x, y: CGFloat(height)))
    x += spacing
  }
  var y: CGFloat = 0
  while y <= CGFloat(height) {
    ctx.move(to: CGPoint(x: 0, y: y))
    ctx.addLine(to: CGPoint(x: CGFloat(width), y: y))
    y += spacing
  }
  ctx.strokePath()

  guard let cgImage = ctx.makeImage() else {
    FileHandle.standardError.write("failed image \(spec.name)\n".data(using: .utf8)!)
    exit(1)
  }

  let outPath = outDir.appendingPathComponent(spec.name)
  guard let dest = CGImageDestinationCreateWithURL(
    outPath as CFURL,
    UTType.png.identifier as CFString,
    1,
    nil,
  ) else {
    FileHandle.standardError.write("failed dest \(spec.name)\n".data(using: .utf8)!)
    exit(1)
  }
  CGImageDestinationAddImage(dest, cgImage, nil)
  if !CGImageDestinationFinalize(dest) {
    FileHandle.standardError.write("failed finalize \(spec.name)\n".data(using: .utf8)!)
    exit(1)
  }
  print("✅ \(spec.name)")
}

for spec in targets { render(spec) }
