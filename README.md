# Welcome to your Expo app 👋

- `npx expo export`
- `npx expo serve`
- Ensure `"origin": "http://localhost:8081"` in the app.json matches the URL of the server from `npx expo serve`.
- Build the production app on iOS: `npx expo run:ios --configuration Release`

If you open in proxyman, the request will clearly have completed but the server function never resolves. On web, this works just fine. Even replaying the curl request from native works just fine.

```
curl 'http://localhost:8081/_flight/ios/ACTION_file:///Users/evanbacon/Documents/GitHub/lab/rsc-fetch-prod-issue/components/fetch-review-times.ts/fetchReviewTimes.txt' \
-X POST \
-H 'Host: localhost:8081' \
-H 'Pragma: no-cache' \
-H 'Accept: text/x-component' \
-H 'Expires: 0' \
-H 'Accept-Language: en-US,en;q=0.9' \
-H 'Cache-Control: no-cache' \
-H 'User-Agent: ReviewTimes/1 CFNetwork/1568.200.51 Darwin/24.0.0' \
-H 'Connection: keep-alive' \
-H 'expo-platform: ios' \
-H 'Content-Type: application/x-www-form-urlencoded' \
--data-raw '[]' \
--proxy http://localhost:9090
```

This leads me to believe that the issue is perhaps related to expo fetch not closing the stream properly in release builds.
