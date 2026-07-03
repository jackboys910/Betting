**Демо:** https://bettingtest.netlify.app/

## Или через локальный запуск

```bash
git clone https://github.com/jackboys910/Betting
cd Betting
pnpm install
pnpm dev
```

Приложение поднимется на http://localhost:5173. Данные API проксируются dev-сервером Vite (в проде - через `netlify.toml`), поэтому запросы работают без CORS проблем.
