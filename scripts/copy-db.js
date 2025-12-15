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

  // reviews 추출 및 id를 숫자로 변환
  const reviews = db.reviews.map((review) => ({
    ...review,
    id: Number(review.id),
    userId: Number(review.userId),
  }));

  const reviewsPath = join(__dirname, "../public/reviews.json");
  writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2), "utf-8");
  console.log(
    "✅ db.json의 reviews 데이터가 public/reviews.json으로 복사되었습니다."
  );

  // users 추출 및 id를 숫자로 변환
  const users = db.users.map((user) => ({
    ...user,
    id: Number(user.id),
  }));

  const usersPath = join(__dirname, "../public/users.json");
  writeFileSync(usersPath, JSON.stringify(users, null, 2), "utf-8");
  console.log(
    "✅ db.json의 users 데이터가 public/users.json으로 복사되었습니다."
  );

  // comments 추출 및 id, reviewId, userId를 숫자로 변환
  const comments = db.comments.map((comment) => ({
    ...comment,
    id: Number(comment.id),
    reviewId: Number(comment.reviewId),
    userId: Number(comment.userId),
  }));

  const commentsPath = join(__dirname, "../public/comments.json");
  writeFileSync(commentsPath, JSON.stringify(comments, null, 2), "utf-8");
  console.log(
    "✅ db.json의 comments 데이터가 public/comments.json으로 복사되었습니다."
  );
} catch (error) {
  console.error("❌ db.json 복사 실패:", error);
  process.exit(1);
}
