import tkinter as tk
from tkinter import filedialog, messagebox
from PIL import Image
import xml.etree.ElementTree as ET
import base64
import io

class PNGtoSVGApp:
    def __init__(self, root):
        self.root = root
        self.root.title("PNG to SVG Converter")

        self.svg_path = None
        self.png_path = None
        self.method = tk.StringVar(value="fast")

        # GUI elements
        tk.Button(root, text="Upload SVG", command=self.upload_svg).pack(pady=5)
        tk.Button(root, text="Upload PNG", command=self.upload_png).pack(pady=5)

        tk.Label(root, text="Conversion Method:").pack()
        tk.Radiobutton(root, text="Fast (Embed PNG)", variable=self.method, value="fast").pack()
        tk.Radiobutton(root, text="Slow (Trace Rects)", variable=self.method, value="slow").pack()

        tk.Button(root, text="Convert", command=self.convert).pack(pady=10)

    def upload_svg(self):
        self.svg_path = filedialog.askopenfilename(filetypes=[("SVG files", "*.svg")])
        if self.svg_path:
            messagebox.showinfo("SVG Selected", f"SVG loaded:\n{self.svg_path}")

    def upload_png(self):
        self.png_path = filedialog.askopenfilename(filetypes=[("PNG files", "*.png")])
        if self.png_path:
            messagebox.showinfo("PNG Selected", f"PNG loaded:\n{self.png_path}")

    def get_svg_dimensions(self, path):
        try:
            tree = ET.parse(path)
            root = tree.getroot()
            width = root.attrib.get("width", "100").replace("px", "")
            height = root.attrib.get("height", "100").replace("px", "")
            return int(float(width)), int(float(height))
        except Exception:
            raise ValueError("Could not read SVG dimensions.")

    def convert(self):
        if not self.svg_path or not self.png_path:
            messagebox.showwarning("Missing Files", "Upload both SVG and PNG first.")
            return

        try:
            width, height = self.get_svg_dimensions(self.svg_path)

            if self.method.get() == "fast":
                self.fast_convert(width, height)
            else:
                self.slow_convert(width, height)

        except Exception as e:
            messagebox.showerror("Error", f"Conversion failed:\n{e}")

    def fast_convert(self, width, height):
        img = Image.open(self.png_path).convert("RGBA").resize((width, height), Image.NEAREST)

        buffer = io.BytesIO()
        img.save(buffer, format="PNG")
        encoded = base64.b64encode(buffer.getvalue()).decode('utf-8')

        svg = f"""<?xml version="1.0" standalone="no"?>
<svg width="{width}" height="{height}" version="1.1"
     xmlns="http://www.w3.org/2000/svg">
  <image width="{width}" height="{height}"
         href="data:image/png;base64,{encoded}" />
</svg>"""

        with open("output.svg", "w", encoding="utf-8") as f:
            f.write(svg)

        messagebox.showinfo("Success", "Fast conversion complete. Saved as output.svg")

    def slow_convert(self, width, height):
        img = Image.open(self.png_path).convert("RGBA").resize((width, height), Image.NEAREST)
        pixels = img.load()
        svg_rects = []

        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                if a > 0:
                    fill = f"rgba({r},{g},{b},{a/255:.2f})"
                    rect = f'<rect x="{x}" y="{y}" width="1" height="1" fill="{fill}" />'
                    svg_rects.append(rect)

        svg = f"""<?xml version="1.0" standalone="no"?>
<svg width="{width}" height="{height}" version="1.1"
     xmlns="http://www.w3.org/2000/svg">
  {''.join(svg_rects)}
</svg>"""

        with open("output.svg", "w", encoding="utf-8") as f:
            f.write(svg)

        messagebox.showinfo("Success", "Slow conversion complete. Saved as output.svg")

if __name__ == "__main__":
    root = tk.Tk()
    app = PNGtoSVGApp(root)
    root.mainloop()
