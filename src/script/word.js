import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_DIR = path.join(__dirname, "../");
const LOCALES_DIR = path.join(__dirname, "../../messages/");
const EN_LOCALE_PATH = path.join(LOCALES_DIR, "en.json");

// Читаем существующие переводы
let translations = {};
if (fs.existsSync(EN_LOCALE_PATH)) {
  translations = JSON.parse(fs.readFileSync(EN_LOCALE_PATH, "utf8"));
}

// Функция поиска `t("...")`
const extractKeys = (code) => {
  const matches = code.match(/t\(["'`](.*?)["'`]\)/g) || [];
  return matches.map((m) => m.match(/t\(["'`](.*?)["'`]\)/)[1]);
};

// Рекурсивно ищем файлы с переводами
const scanDir = (dir) => {
  fs.readdirSync(dir, { encoding: "utf8" }).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith(".js") || file.endsWith(".jsx")) {
      const content = fs.readFileSync(fullPath, "utf8");
      const keys = extractKeys(content);
      keys.forEach((key) => {
        const [section, field] = key.split(".");
        if (!translations[section]) translations[section] = {};
        if (!translations[section][field]) translations[section][field] = key;
      });
    }
  });
};

// Запускаем сканирование
scanDir(COMPONENTS_DIR);

// Записываем JSON с переводами
fs.writeFileSync(EN_LOCALE_PATH, JSON.stringify(translations, null, 2), "utf8");
