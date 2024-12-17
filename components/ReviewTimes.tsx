import "@/lib/localStorage";
import { fetchReviewTimes, ReviewTimes } from "./fetch-review-times";

import { ExtensionStorage } from "@bacons/apple-targets";

const storage = new ExtensionStorage("group.com.bacon.appreviewtimes");

// Format milliseconds to a human-readable hours/minutes/seconds string
export function formatTimestamp(millis: number) {
  const seconds = Math.floor(millis / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours === 0) {
    return `${minutes}m`;
  }
  return `${hours}h ${minutes}m`;
}

export function updateWidget(data: ReviewTimes) {
  console.log("widget data", data);
  if (process.env.EXPO_OS !== "ios") return;
  const json = {
    waitingForReview: formatTimestamp(data.reviewTimes.waitingForReview),
    inReview: formatTimestamp(data.reviewTimes.inReview),
    waitingForBetaReview: formatTimestamp(
      data.reviewTimes.waitingForBetaReview
    ),
    inBetaReview: formatTimestamp(data.reviewTimes.inBetaReview),
    buildProcessing: formatTimestamp(data.reviewTimes.buildProcessing),
    lastUpdated: data.lastUpdated.timestamp,
  };

  storage.set("reviewTimes", json);

  ExtensionStorage.reloadWidget();
}

export async function fetchReviewTimesCachedAsync(): Promise<ReviewTimes> {
  // return {
  //   lastUpdated: {
  //     raw: { date: "Dec 11", time: "12:00 am" },
  //     timestamp: "2024-12-11T06:00:00.000Z",
  //     unix: 1733896800000,
  //   },
  //   reviewTimes: {
  //     buildProcessing: 540000,
  //     inBetaReview: 960000,
  //     inReview: 3780000,
  //     waitingForBetaReview: 38640000,
  //     waitingForReview: 34500000,
  //   },
  // };
  // Cache for one day
  // const cacheTime = 24 * 60 * 60 * 1000;
  // const cacheKey = "reviewTimes";
  // const cache = localStorage.getItem(cacheKey);

  // if (cache) {
  //   const { data, timestamp } = JSON.parse(cache);

  //   if (Date.now() - timestamp < cacheTime) {
  //     updateWidget(data);
  //     return data;
  //   }
  // }

  const reviewTimes = await fetchReviewTimes();
  // localStorage.setItem(
  //   cacheKey,
  //   JSON.stringify({ data: reviewTimes, timestamp: Date.now() })
  // );

  updateWidget(reviewTimes);
  return reviewTimes;
}
