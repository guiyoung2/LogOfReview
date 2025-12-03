import ReviewCard from "../components/review/ReviewCard";

const ReviewsPage = () => {
  return (
    <div>
      <ReviewCard
        id={1}
        title="우블랑 오마카세"
        category="Food"
        rating={5}
        images={["image1.jpg", "image2.jpg"]}
        content="기념일로 동탄에 고기 오마카세를 먹었어요."
      />
    </div>
  );
};

export default ReviewsPage;
