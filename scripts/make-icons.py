"""Generates the TMStock aperture mark: PNG app icons plus the SVG path data
used by components/Logo.tsx. Run: python3 scripts/make-icons.py"""
import json
import math
import os
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.join(os.path.dirname(__file__), "..", "apps", "web")
ESPRESSO = (27, 18, 12)
GOLD = (224, 168, 113)
CREAM = (246, 236, 224)
BLADES = [(185, 87, 43), (203, 116, 66), (224, 168, 113)]

N = 6
C = 32.0          # center of a 64-unit artboard
R_BLADE = 22.0    # outer radius of the blades
R_HEX = 8.6       # radius of the opening
TWIST = math.radians(14)


def hex_vertex(i):
    a = TWIST + i * 2 * math.pi / N
    return (C + R_HEX * math.cos(a), C + R_HEX * math.sin(a))


def ray_circle(p, q):
    """Point where the ray p->q leaves the blade circle."""
    dx, dy = q[0] - p[0], q[1] - p[1]
    fx, fy = p[0] - C, p[1] - C
    a = dx * dx + dy * dy
    b = 2 * (fx * dx + fy * dy)
    c = fx * fx + fy * fy - R_BLADE * R_BLADE
    t = (-b + math.sqrt(b * b - 4 * a * c)) / (2 * a)
    return (p[0] + t * dx, p[1] + t * dy)


V = [hex_vertex(i) for i in range(N)]
P = [ray_circle(V[i], V[(i + 1) % N]) for i in range(N)]


def blade_polygon(i, steps=24):
    start = math.atan2(P[i][1] - C, P[i][0] - C)
    end = math.atan2(P[i - 1][1] - C, P[i - 1][0] - C)
    while end > start:
        end -= 2 * math.pi
    arc = [
        (C + R_BLADE * math.cos(start + (end - start) * s / steps),
         C + R_BLADE * math.sin(start + (end - start) * s / steps))
        for s in range(steps + 1)
    ]
    return [V[i]] + arc


def blade_path(i):
    f = lambda p: f"{p[0]:.2f} {p[1]:.2f}"
    return f"M{f(V[i])} L{f(P[i])} A{R_BLADE:g} {R_BLADE:g} 0 0 0 {f(P[i - 1])} Z"


def render(size, pad, rounded):
    ss = 4
    px = size * ss
    img = Image.new("RGBA", (px, px), (0, 0, 0, 0))
    bg = Image.new("RGBA", (px, px), ESPRESSO + (255,))

    # warm glow behind the mark, like the hero
    glow = Image.new("RGBA", (px, px), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse(
        [px * 0.18, px * 0.1, px * 1.05, px * 0.95], fill=(185, 87, 43, 120)
    )
    bg = Image.alpha_composite(bg, glow.filter(ImageFilter.GaussianBlur(px * 0.16)))

    mask = Image.new("L", (px, px), 0)
    radius = px * 0.225 if rounded else 0
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, px - 1, px - 1], radius=radius, fill=255)
    img.paste(bg, (0, 0), mask)

    d = ImageDraw.Draw(img)
    scale = px * (1 - 2 * pad) / 64.0
    off = px * pad
    tx = lambda p: (off + p[0] * scale, off + p[1] * scale)

    ring_r, ring_w = 28.0, 2.6
    d.ellipse([tx((C - ring_r, C - ring_r)), tx((C + ring_r, C + ring_r))],
              outline=GOLD + (255,), width=max(1, round(ring_w * scale)))
    for i in range(N):
        d.polygon([tx(p) for p in blade_polygon(i)], fill=BLADES[i % 3] + (255,))
    for i in range(N):
        d.line([tx(V[i]), tx(P[i])], fill=ESPRESSO + (255,), width=max(1, round(1.1 * scale)))
    d.polygon([tx(v) for v in V], fill=CREAM + (255,))

    return img.resize((size, size), Image.LANCZOS)


render(192, 0.1, True).save(os.path.join(ROOT, "public", "icon-192.png"))
render(512, 0.1, True).save(os.path.join(ROOT, "public", "icon-512.png"))
render(512, 0.2, False).save(os.path.join(ROOT, "public", "icon-maskable-512.png"))
render(180, 0.12, False).convert("RGB").save(os.path.join(ROOT, "app", "apple-icon.png"))
render(64, 0.08, True).save(os.path.join(ROOT, "app", "icon.png"))

print(json.dumps({
    "blades": [blade_path(i) for i in range(N)],
    "hex": "M" + " L".join(f"{v[0]:.2f} {v[1]:.2f}" for v in V) + " Z",
}, indent=2))
