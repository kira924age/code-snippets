# 巡回セールスマン問題

## 概要

隣接行列で表された重み付き有向グラフおよび始点となる頂点番号 (start_vertex) を引数として受け取り,
以下の条件を満たす最短経路の距離を返す.

* 頂点 start_vertex から出発し, 出発点へ戻る閉路である
* 各頂点をちょうど1度だけ通る

また, そのような経路が存在しない場合は何かしら大きな値を返す. (C++ の場合は $10^{18} + 18$, Python の場合は float("inf"))

## 計算量

頂点数を $n$ として,

* $O(n^2 2^n)$

## Snippet

### C++

```cpp
long long traveling_salesman_problem(int start_vertex, std::vector<std::vector<long long>> &G) {
  const long long LINF = 1000000000000000018;

  const int n = G[0].size();
  std::vector<std::vector<long long>> dp((1 << n), std::vector<long long>(n, LINF));

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
```

### Python

```python
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
```

## 解説

すでに訪れた頂点集合を $S$ (ただし出発点には訪れていないものとする),
頂点 start_vertex から出発して集合 $S$ に属する頂点を一度ずつめぐり頂点 $v$ に到達するときの辺の重みの総和の最小値を dp[S][v] とする.

頂点 $u$ から $v$ へのコストを dist[u][v] とすると以下のようにすると DP テーブルを正しく更新することができる.

* dp[{v}][v] = dist[start_vertex][v] (start_vertex $\neq$ v)
* dp[S $\cup$ {v}][v] = min(dp[S $\cup$ v][v], dp[S][u] + dist[u][v] | $u \in S, v \notin S$ )
  * 集合 $S$ に含まれていない頂点 $v$ を末尾に追加する
  * 追加の仕方は, 集合 $S$ に含まれている頂点 $u$ が末尾となるようなときを考えれば良い

求める答えは全ての頂点をめぐり, start_vertex に戻ってくるときの辺の重みの総和の最小値なので以下のようになる.

* dp[(1<<n) - 1][start_vertex]

## 検証

* [AOJ-DPL2-A: Traveling Salesman Problem](../solution/AOJ-DPL2-A.html)
* [ABC180-E: Traveling Salesman among Aerial Cities](../solution/ABC180-E.html)

## 参考文献

* [https://www.youtube.com/watch?v=r4ujcFBDBw4](https://www.youtube.com/watch?v=r4ujcFBDBw4)

