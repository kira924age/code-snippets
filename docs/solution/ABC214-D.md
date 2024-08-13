# ABC214-D: Sum of Maximum Weights

## 問題

* [https://atcoder.jp/contests/abc214/tasks/abc214_d](https://atcoder.jp/contests/abc214/tasks/abc214_d)

## 解説

辺を重み順にソートして, 小さい順に辺を張ることを考える.
与えられるグラフは木なので, 辺を張るとき2つの頂点は必ず非連結となっている.

辺の重みが小さい順に辺 $e_i = (u_i, v_i)$ を張るとき,
辺 $e_i$ の重み $w_i$ は現在のグラフにおける辺の重みの最大値となるので, 
$f(u, v) = w_i$ を満たす $(u, v)$ の組は
辺を追加する直前の $u_i$ を含むグラフの連結成分のサイズと$v_i$ を含むグラフの連結成分のサイズと掛けた値となる.

したがって, 辺の重みが小さい順に辺を張っていき Union Find Tree を使って連結成分のサイズを取得して答えを加算していけば良い.

## 実装例

### C++

* submission: [https://atcoder.jp/contests/abc214/submissions/28043827](https://atcoder.jp/contests/abc214/submissions/28043827)

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

struct UnionFind {
  std::vector<int> parent_or_size;
  int cnt;

  UnionFind(int n) : parent_or_size(n, -1), cnt(n) {}

  void unite(int x, int y) {
    x = find_root(x);
    y = find_root(y);
    if (x == y) {
      return;
    }
    if (-parent_or_size[x] < -parent_or_size[y]) {
      std::swap(x, y);
    }
    parent_or_size[x] += parent_or_size[y];
    parent_or_size[y] = x;
    cnt--;
  }
  bool is_same_root(int x, int y) { return find_root(x) == find_root(y); }
  int find_root(int x) {
    if (parent_or_size[x] < 0) {
      return x;
    }
    return parent_or_size[x] = find_root(parent_or_size[x]);
  }
  int size(int x) { return -parent_or_size[find_root(x)]; }
};

struct Edge {
  int u, v;
  long long w;
  Edge() {}
  Edge(int x, int y, long long z) : u(x), v(y), w(z) {}
};

bool comp(Edge &a, Edge &b) { return a.w < b.w; }

int main() {
  int N;
  std::cin >> N;

  std::vector<Edge> edges(N - 1);
  for (int i = 0; i < N - 1; i++) {
    int u, v, w;
    std::cin >> u >> v >> w;
    edges[i] = Edge(u - 1, v - 1, w);
  }

  std::sort(edges.begin(), edges.end(), comp);

  UnionFind uf_tree(N);

  long long ans = 0;
  for (int i = 0; i < N - 1; i++) {
    int u = edges[i].u;
    int v = edges[i].v;
    long long w = edges[i].w;
    ans += w * (long long)uf_tree.size(u) * (long long)uf_tree.size(v);
    uf_tree.unite(u, v);
  }

  std::cout << ans << "\n";

  return 0;
}
```

### Python

* submission: [https://atcoder.jp/contests/abc214/submissions/28043850](https://atcoder.jp/contests/abc214/submissions/28043850)

```python
#!/usr/bin/env python3


class UnionFind:
    def __init__(self, n):
        self.parent_or_size = [-1 for _ in range(n)]
        self.cnt = n

    def unite(self, x, y):
        x, y = self.find_root(x), self.find_root(y)
        if x == y:
            return
        if -self.parent_or_size[x] < -self.parent_or_size[y]:
            x, y = y, x
        self.parent_or_size[x] += self.parent_or_size[y]
        self.parent_or_size[y] = x
        self.cnt -= 1

    def is_same_root(self, x, y):
        return self.find_root(x) == self.find_root(y)

    def find_root(self, x):
        if self.parent_or_size[x] < 0:
            return x
        self.parent_or_size[x] = self.find_root(self.parent_or_size[x])
        return self.parent_or_size[x]

    def size(self, x):
        return -self.parent_or_size[self.find_root(x)]


N = int(input())
uvw = [[int(x) for x in input().split()] for _ in range(N - 1)]
uvw.sort(key=lambda x: x[2])

ans = 0
uf_tree = UnionFind(N)
for (u, v, w) in uvw:
    ans += w * uf_tree.size(u - 1) * uf_tree.size(v - 1)
    uf_tree.unite(u - 1, v - 1)

print(ans)
```

