import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { ReviewTimes } from "./fetch-review-times";

function ReviewTimesComp({
  fetchReviewTimes,
}: {
  fetchReviewTimes: () => Promise<ReviewTimes>;
}) {
  const [data, setData] = useState<ReviewTimes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviewTimes()
      .then((response) => {
        alert("Done loading");
        setData(response);
        setLoading(false);
      })
      .catch((err) => {
        alert("Error loading: " + err);
        throw err;
        setError(err);
        setLoading(false);
      });
  }, [fetchReviewTimes]);

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const defaultReviewItems = [
    {
      label: "Build Processing",
      value: data?.reviewTimes.buildProcessing,
    },
    {
      label: "Waiting for Review",
      value: data?.reviewTimes.waitingForReview,
    },
    {
      label: "In Review",
      value: data?.reviewTimes.inReview,
    },
  ];

  const betaReviewItems = [
    {
      label: "Waiting for Beta Review",
      value: data?.reviewTimes.waitingForBetaReview,
    },
    {
      label: "In Beta Review",
      value: data?.reviewTimes.inBetaReview,
    },
  ];

  if (loading || !data)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  if (error)
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error loading data</Text>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Review Times</Text>
        <View style={styles.grid}>
          {defaultReviewItems.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.iconContainer}></View>
              <Text style={styles.cardLabel}>{item.label}</Text>
              <Text style={styles.cardValue}>
                {formatTime(item.value || 0)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Beta Review Times</Text>
        <View style={styles.grid}>
          {betaReviewItems.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.iconContainer}></View>
              <Text style={styles.cardLabel}>{item.label}</Text>
              <Text style={styles.cardValue}>
                {formatTime(item.value || 0)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Last Updated: {data?.lastUpdated.raw.date}{" "}
          {data?.lastUpdated.raw.time}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#E0E0E0",
    borderRadius: 24,
    padding: 8,
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 14,
    color: "#4A4A4A",
    textAlign: "center",
  },
  cardValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  footerText: {
    marginLeft: 8,
    fontSize: 12,
    color: "#4A4A4A",
  },
});

export default ReviewTimesComp;
