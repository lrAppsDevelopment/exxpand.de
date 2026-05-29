from PIL import Image
import os
import re

BASE = os.path.join(os.path.dirname(__file__), '..', 'public', 'logos')


def process_db():
    path = os.path.join(BASE, 'deutsche_bahn.png')
    img = Image.open(path).convert('RGBA')
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if lum > 200:
                px[x, y] = (0, 0, 0, 0)
            elif lum > 40:
                px[x, y] = (255, 255, 255, 255)
            else:
                px[x, y] = (0, 0, 0, 0)
    bbox = img.getbbox()
    if bbox:
        pad = 4
        img = img.crop((
            max(0, bbox[0] - pad), max(0, bbox[1] - pad),
            min(w, bbox[2] + pad), min(h, bbox[3] + pad),
        ))
    img.save(path, optimize=True)
    print('deutsche_bahn', img.size)


def process_nzz():
    path = os.path.join(BASE, 'neue_zeitung.png')
    img = Image.open(path).convert('RGBA')
    px = img.load()
    for y in range(img.height):
        for x in range(img.width):
            r, g, b, a = px[x, y]
            if a < 8:
                continue
            boost = 35
            px[x, y] = (
                min(255, r + boost),
                min(255, g + boost),
                min(255, b + boost),
                a,
            )
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    img.save(path, optimize=True)
    print('neue_zeitung', img.size)


def process_o2():
    """Blue O2 on checkerboard/white matte → white on transparent."""
    path = os.path.join(BASE, 'o2.png')
    img = Image.open(path).convert('RGBA')
    px = img.load()
    w, h = img.size

    def is_background(r, g, b):
        sat = max(r, g, b) - min(r, g, b)
        lum = 0.299 * r + 0.587 * g + 0.114 * b
        if lum >= 210 and sat <= 30:
            return True
        if r >= 218 and g >= 218 and b >= 218 and sat <= 20:
            return True
        return False

    def is_logo_blue(r, g, b):
        return b > r + 8 and b > g + 5 and b >= 35

    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if is_background(r, g, b):
                px[x, y] = (0, 0, 0, 0)
                continue
            if is_logo_blue(r, g, b):
                strength = min(255, int((b / 110.0) * 255))
                strength = max(strength, int(255 - (r + g) / 2))
                strength = min(255, max(64, strength))
                px[x, y] = (255, 255, 255, strength)
                continue
            sat = max(r, g, b) - min(r, g, b)
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if sat <= 40 and b >= r and lum < 210:
                t = min(255, int(b * 2.2))
                px[x, y] = (255, 255, 255, t)
            else:
                px[x, y] = (0, 0, 0, 0)

    bbox = img.getbbox()
    if bbox:
        pad = 6
        img = img.crop((
            max(0, bbox[0] - pad), max(0, bbox[1] - pad),
            min(w, bbox[2] + pad), min(h, bbox[3] + pad),
        ))
    img.save(path, optimize=True)
    print('o2', img.size)


def lighten_svg(fname, subs):
    path = os.path.join(BASE, fname)
    text = open(path, encoding='utf-8', errors='ignore').read()
    for old, new in subs.items():
        text = text.replace(old, new)

    def lighten_fill(m):
        h = m.group(1)
        if len(h) != 6:
            return m.group(0)
        r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
        if r + g + b < 280:
            r, g, b = min(255, r + 100), min(255, g + 100), min(255, b + 100)
            return f'fill="#{r:02x}{g:02x}{b:02x}"'
        return m.group(0)

    text = re.sub(r'fill="(#[0-9A-Fa-f]{6})"', lighten_fill, text)
    open(path, 'w', encoding='utf-8').write(text)
    print('updated', fname)


if __name__ == '__main__':
    process_db()
    process_nzz()
    process_o2()
    lighten_svg('webasto.svg', {'#333399': '#e8e8e8', '#ed1c24': '#f0f0f0'})
    lighten_svg('zollner.svg', {'#003E74': '#d5dbe1'})
    lighten_svg('acal-bfi.svg', {'#009DDB': '#d8d8d8', '#003E74': '#d5dbe1'})
