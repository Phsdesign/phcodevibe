import os

directories = ['app', 'components']
replacements = {
    '"#0e1c29"': '"var(--text-primary)"',
    '"#000000"': '"var(--text-primary)"',
    "'#0e1c29'": "'var(--text-primary)'",
    "'#000000'": "'var(--text-primary)'",
    '"#fff"': '"var(--bg)"',
    "'#fff'": "'var(--bg)'"
}

# Pricing specific edge cases where we invert white/black based on Center
# Actually, replacing "#000000" with "var(--text-primary)" covers: color: isCenter ? "#ffffff" : "var(--text-primary)"

count_files = 0
for directory in directories:
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.jsx'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original_content = content
                for old, new in replacements.items():
                    # only replace inside style objects or inline conditionals if they are isolated.
                    # this is slightly dangerous, so let's be careful.
                    # actually replacing exact strings `"#000000"` will perfectly match inline react `color: "#000000"` or conditional `isCenter ? "#000000" : ...`
                    content = content.replace(old, new)
                
                if content != original_content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    count_files += 1

print(f"✅ Atualizadas {count_files} arquivos removendo as variaveis absolutas sobressalentes.")
