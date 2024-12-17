import AppReview from "@/components/AppReviewTimes";

import { fetchReviewTimes } from "@/components/fetch-review-times";

export { ErrorBoundary } from "expo-router";

export default function HomeScreen() {
  return <AppReview fetchReviewTimes={fetchReviewTimes} />;
}
