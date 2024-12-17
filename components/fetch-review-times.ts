"use server";

export type ReviewTimes = {
  reviewTimes: {
    // Time in milliseconds
    waitingForReview: number;
    inReview: number;
    waitingForBetaReview: number;
    inBetaReview: number;
    buildProcessing: number;
  };
  lastUpdated: {
    raw: { date: string; time: string };
    timestamp: string;
    unix: number;
  };
};

export async function fetchReviewTimes(): Promise<ReviewTimes> {
  return {
    lastUpdated: {
      raw: { date: "Dec 11", time: "12:00 am" },
      timestamp: "2024-12-11T06:00:00.000Z",
      unix: 1733896800000,
    },
    reviewTimes: {
      buildProcessing: 540000,
      inBetaReview: 960000,
      inReview: 3780000,
      waitingForBetaReview: 38640000,
      waitingForReview: 34500000,
    },
  };
}
