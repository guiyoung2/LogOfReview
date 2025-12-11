import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// db.json 읽기
const dbPath = join(__dirname, "../db.json");
const publicPath = join(__dirname, "../public/reviews.json");

try {
  const dbContent = readFileSync(dbPath, "utf-8");
  const db = JSON.parse(dbContent);

  // reviews 추출해서 public에 복사
  const reviewsPath = join(__dirname, "../public/reviews.json");
  writeFileSync(reviewsPath, JSON.stringify(db.reviews, null, 2), "utf-8");
  console.log(
    "✅ db.json의 reviews 데이터가 public/reviews.json으로 복사되었습니다."
  );

  // users 추출해서 public에 복사 (로그인용)
  const usersPath = join(__dirname, "../public/users.json");
  writeFileSync(usersPath, JSON.stringify(db.users, null, 2), "utf-8");
  console.log(
    "✅ db.json의 users 데이터가 public/users.json으로 복사되었습니다."
  );
} catch (error) {
  console.error("❌ db.json 복사 실패:", error);
  process.exit(1);
}
