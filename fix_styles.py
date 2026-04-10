import os

directories = ['app', 'components']
replacements = {
    'background: "#ffffff"': 'background: "var(--bg)"',
    'backgroundColor: "#ffffff"': 'backgroundColor: "var(--bg)"',
    'background: "#fff"': 'background: "var(--bg)"',
    'color: "#0e1c29"': 'color: "var(--text-primary)"',
    'color: "#000000"': 'color: "var(--text-primary)"',
    'color: "#000"': 'color: "var(--text-primary)"',
    'color: "#111"': 'color: "var(--text-primary)"',
    'background: "#f5f5f5"': 'background: "var(--bg-secondary)"',
    "background: '#ffffff'": "background: 'var(--bg)'",
    "background: '#fff'": "background: 'var(--bg)'",
    "color: '#0e1c29'": "color: 'var(--text-primary)'",
    "color: '#000000'": "color: 'var(--text-primary)'",
    "background: '#f5f5f5'": "background: 'var(--bg-secondary)'"
}

count_files = 0
count_replacements = 0

for directory in directories:
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.jsx'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                for old, new in replacements.items():
                    content = content.replace(old, new)
                
                if content != original_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    count_files += 1

print(f"✅ Atualizadas {count_files} arquivos com variáveis de cor dinâmicas.")
