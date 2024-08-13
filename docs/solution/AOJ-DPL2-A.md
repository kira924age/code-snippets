# AOJ-DPL2-A: Traveling Salesman Problem

## 問題

* [https://onlinejudge.u-aizu.ac.jp/problems/DPL_2_A](https://onlinejudge.u-aizu.ac.jp/problems/DPL_2_A)

## 解説

巡回セールスマン問題を解く.

## 実装例

### C++

* submission: [https://onlinejudge.u-aizu.ac.jp/status/users/kira924age/submissions/1/DPL_2_A/judge/5936929/C++11](https://onlinejudge.u-aizu.ac.jp/status/users/kira924age/submissions/1/DPL_2_A/judge/5936929/C++11)

```cpp
#include <iostream>
#include <vector>

long long
traveling_salesman_problem(const int start_vertex,
                           const std::vector<std::vector<long long>> &G) {
  const long long LINF = 1000000000000000018;

  const int n = G[0].size();
  std::vector<std::vector<long long>> dp((1 << n),
                                         std::vector<long long>(n, LINF));

  dp[0][start_vertex] = 0;

  for (int S = 0; S < (1 << n); S++) {
    for (int v = 0; v < n; v++) {
      for (int u = 0; u < n; u++) {
        if ((S >> u) & 1) {
          continue;
        }
        dp[S | (1 << u)][v] = std::min(dp[S | (1 << u)][v], dp[S][u] + G[u][v]);
      }
    }
  }

  return dp[(1 << n) - 1][start_vertex];
}

int main() {
  int n, m;
  std::cin >> n >> m;

  const long long LINF = 1000000000000000018;
  std::vector<std::vector<long long>> G(n, std::vector<long long>(n, LINF));

  for (int i = 0; i < m; i++) {
    long long s, t, d;
    std::cin >> s >> t >> d;
    G[s][t] = d;
  }

  long long ans = LINF;
  for (int sv = 0; sv < n; sv++) {
    ans = std::min(ans, traveling_salesman_problem(sv, G));
  }

  if (ans == LINF) {
    ans = -1;
  }

  std::cout << ans << "\n";

  return 0;
}
```

### Python

* submission: [https://onlinejudge.u-aizu.ac.jp/status/users/kira924age/submissions/1/DPL_2_A/judge/5936976/Python3](https://onlinejudge.u-aizu.ac.jp/status/users/kira924age/submissions/1/DPL_2_A/judge/5936976/Python3)

テストケースが弱いので開始頂点が 0 のときだけを考えればジャッジを通る.
Python だと開始頂点を全探索すると TLE となる.

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


n, m = map(int, input().split())
graph = [[float("inf")] * n for _ in range(n)]

for _ in range(m):
    s, t, d = map(int, input().split())
    graph[s][t] = d

ans = traveling_salesman_problem(0, graph)

if ans == float("inf"):
    ans = -1

print(ans)
```

