# ABC180-E: Traveling Salesman among Aerial Cities

## 問題

* [https://atcoder.jp/contests/abc180/tasks/abc180_e](https://atcoder.jp/contests/abc180/tasks/abc180_e)

## 解説

都市間の移動コストは三角不等式を満たすので, 巡回セールスマン問題を普通に解けばよい.

## 実装例

### C++

* submission: [https://atcoder.jp/contests/abc180/submissions/26676133](https://atcoder.jp/contests/abc180/submissions/26676133)

```cpp
#include <iostream>
#include <vector>

long long traveling_salesman_problem(int start_vertex,
                                     std::vector<std::vector<long long>> &G) {
  const long long LINF = 1000000000000000018;

  const int n = G[0].size();
  std::vector<std::vector<long long>> dp((1 << n),
                                         std::vector<long long>(n, LINF));

  for (int v = 0; v < n; v++) {
    if (v == start_vertex) {
      continue;
    }
    dp[1 << v][v] = G[start_vertex][v];
  }

  for (int S = 0; S < (1 << n); S++) {
    for (int v = 0; v < n; v++) {
      if ((S >> v) & 1) {
        continue;
      }
      for (int u = 0; u < n; u++) {
        if (!((S >> u) & 1)) {
          continue;
        }
        dp[S | (1 << v)][v] = std::min(dp[S | (1 << v)][v], dp[S][u] + G[u][v]);
      }
    }
  }

  return dp[(1 << n) - 1][start_vertex];
}

int main() {
  std::cin.tie(0);
  std::ios_base::sync_with_stdio(false);

  int N;
  std::cin >> N;

  std::vector<int> X(N), Y(N), Z(N);
  for (int i = 0; i < N; i++) {
    std::cin >> X[i] >> Y[i] >> Z[i];
  }

  std::vector<std::vector<long long>> dist(N, std::vector<long long>(N, 0));
  for (int i = 0; i < N; i++) {
    for (int j = 0; j < N; j++) {
      int a = X[i], b = Y[i], c = Z[i];
      int p = X[j], q = Y[j], r = Z[j];
      dist[i][j] = abs(p - a) + abs(q - b) + std::max(0, r - c);
    }
  }

  std::cout << traveling_salesman_problem(0, dist) << "\n";

  return 0;
}
```

### Python

* submission: [https://atcoder.jp/contests/abc180/submissions/26676216](https://atcoder.jp/contests/abc180/submissions/26676216)

```python
#!/usr/bin/env python3


def traveling_salesman_problem(start_vertex, graph):
    n = len(graph)
    dp = [[float("inf")] * n for _ in range(1 << n)]

    for v in range(n):
        if v == start_vertex:
            continue
        dp[1 << v][v] = graph[start_vertex][v]

    for bit in range(1 << n):
        for v in range(n):
            if (bit >> v) & 1:
                continue
            for u in range(n):
                if not ((bit >> u) & 1):
                    continue
                dp[bit | (1 << v)][v] = min(dp[bit | (1 << v)][v],
                                            dp[bit][u] + graph[u][v])

    return dp[(1 << n) - 1][start_vertex]


N = int(input())

XYZ = [[int(x) for x in input().split()] for _ in range(N)]
X = [xyz[0] for xyz in XYZ]
Y = [xyz[1] for xyz in XYZ]
Z = [xyz[2] for xyz in XYZ]

dist = [[0] * N for _ in range(N)]
for i in range(N):
    for j in range(N):
        a, b, c = X[i], Y[i], Z[i]
        p, q, r = X[j], Y[j], Z[j]

        dist[i][j] = abs(p - a) + abs(q - b) + max(0, r - c)

print(traveling_salesman_problem(0, dist))
```

## 参考文献

* [https://atcoder.jp/contests/abc180/editorial/154](https://atcoder.jp/contests/abc180/editorial/154)

