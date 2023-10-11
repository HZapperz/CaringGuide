// reviewForm.tsx

import { useState } from "react";

interface ReviewFormProps {
  resourceId: string;
  userId: string;
  onNewReview: (review: any) => void; // Callback to handle new reviews
}

const stopPropagation = (e: React.MouseEvent) => {
  e.stopPropagation();
};

const ReviewForm: React.FC<ReviewFormProps> = ({
  resourceId,
  userId,
  onNewReview,
}) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Mock the new review data as if it's coming from the API
    const mockNewReview = {
      id: Date.now().toString(), // Just a mock ID
      resourceId,
      userId,
      comment: reviewText,
      rating,
    };

    onNewReview(mockNewReview); // Trigger the callback with the mock data

    setReviewText("");
    setRating(1);

    /* Commented-out original API call logic
    const response = await fetch("/api/reviews/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resourceId,
        userId,
        comment: reviewText,
        rating,
      }),
    });
  
    const newReview = await response.json();
    onNewReview(newReview); // Trigger the callback with actual API response
    */
  };

  return (
    <div className="mt-4" onClick={stopPropagation}>
      <form onSubmit={handleSubmit}>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your review"
          className="w-full p-2 rounded border"
        />
        <div className="flex items-center mt-2">
          <label className="mr-2 text-xs">Rating:</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            min="1"
            max="5"
            className="w-16 p-1 rounded border"
          />
        </div>
        <button
          type="submit"
          className="mt-2 px-4 py-1 rounded bg-blue-500 text-white text-xs"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
