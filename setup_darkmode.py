import os

def build_dark_mode_component():
    """
    Gera um componente de Dark Mode perfeitamente otimizado para Next.js,
    baseado na lógica de localStorage e toggle de classes.
    """
    
    # Código do componente React (Seguro contra Hydration Errors)
    react_component = """'use client';

import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // 1. Verifica a preferência salva ou a preferência do sistema (Lógica do artigo)
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    // 2. Alterna a classe e salva no LocalStorage sem travar a interface
    const isDarkNow = document.documentElement.classList.contains('dark');
    
    if (isDarkNow) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  // 3. Renderiza o botão minimalista
  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 transition-colors duration-300"
      aria-label="Alternar tema"
    >
      <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200 transition-opacity">
        {isDarkMode ? 'L' : 'D'}
      </span>
    </button>
  );
}
"""

    # Garante que a pasta components exista
    os.makedirs('components', exist_ok=True)
    
    # Cria o arquivo do componente
    file_path = os.path.join('components', 'DarkModeToggle.jsx')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(react_component)
        
    print(f"✅ Sucesso: Componente de Dark Mode criado em '{file_path}'.")
    print("⚠️ Lembre-se: Para evitar o 'flicker' no primeiro carregamento em Next.js,")
    print("adicione um script inline no seu <head> ou use a biblioteca 'next-themes'.")

if __name__ == "__main__":
    print("Iniciando injeção do componente de Dark Mode...")
    build_dark_mode_component()
