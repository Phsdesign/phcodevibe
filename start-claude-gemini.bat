@echo off
setlocal
echo [VIBE CHECK] Limpando processos antigos na porta 3456...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3456 ^| findstr LISTENING') do taskkill /F /PID %%a 2>nul

echo [VIBE CHECK] Iniciando Claude Code via Router ORIGINAL (Gemini 3.1 Pro)...
echo DICA: Se "Engasgar", aguarde 60 segundos (Rate Limit do Gemini).
npx @musistudio/claude-code-router code

endlocal
