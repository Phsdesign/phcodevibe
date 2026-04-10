import os
import re

directories = ['app', 'components']
count_files = 0

for directory in directories:
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.jsx'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                
                # REPLACEMENT 1: background: "#ffffff" -> background: "var(--bg)"
                content = content.replace('background: "#ffffff"', 'background: "var(--bg)"')
                content = content.replace("background: '#ffffff'", "background: 'var(--bg)'")
                content = content.replace('backgroundColor: "#ffffff"', 'backgroundColor: "var(--bg)"')
                content = content.replace('background: "#f5f5f5"', 'background: "var(--bg-secondary)"')
                content = content.replace("background: '#f5f5f5'", "background: 'var(--bg-secondary)'")

                # REPLACEMENT 2: explicit text colors to var(--text-primary)
                content = content.replace('color: "#0e1c29"', 'color: "var(--text-primary)"')
                content = content.replace("color: '#0e1c29'", "color: 'var(--text-primary)'")
                content = content.replace('color: "#000000"', 'color: "var(--text-primary)"')
                content = content.replace("color: '#000000'", "color: 'var(--text-primary)'")
                content = content.replace('color: "#000"', 'color: "var(--text-primary)"')

                # REPLACEMENT 3: Conditional ternary logic (Pricing.tsx)
                # isCenter ? "#ffffff" : "#000000" -> isCenter ? "var(--bg)" : "var(--text-primary)"
                content = content.replace('isCenter ? "#ffffff" : "#000000"', 'isCenter ? "var(--bg)" : "var(--text-primary)"')
                content = content.replace('isCenter ? "#000000" : "#ffffff"', 'isCenter ? "var(--text-primary)" : "var(--bg)"')

                # Fill and strokes for icons
                content = content.replace('fill="#000000"', 'fill="currentColor"')
                content = content.replace('stroke="#000000"', 'stroke="currentColor"')
                content = content.replace('fill="#0e1c29"', 'fill="currentColor"')
                
                if content != original_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    count_files += 1

print(f"✅ Arquivos atualizados com injeção segura: {count_files}")
