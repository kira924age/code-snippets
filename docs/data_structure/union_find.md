# Union Find Tree

## 概要

Union Find Tree はデータを互いに素な集合に分割して保持することで以下の2つの操作を効率的に行えるデータ構造.

* Union: 2つの集合を1つに統合する
* Find: 特定の要素がどの集合に属しているか求める

Union Find Tree は素集合データ構造 (disjoint-set data structure) とも呼ばれている.

## 計算量

* $O(\alpha(n))$

$\alpha$ はアッカーマン関数の逆関数.

## Snippet

### C++

```cpp
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
```

### Python

```python
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
```

## 解説

初期状態は頂点数が $n$ で辺がない状態のグラフとみなすことができる.
このグラフに対して以下のような操作ができる.

* `unite(x, y)` : 頂点 x と y が属する2つの集合を1つにマージする
* `is_same_root(x, y)` : 頂点 x と y が同じ集合に属するかを判定する
* `find_root(x)` : 頂点 x が属する集合の根 (代表元) を返す
* `size(x)` : 頂点 x が属する集合のサイズを返す
* `cnt` : グラフの連結成分の個数(集合の個数)

Union Find Tree には集合の結合はできても分割はできないという性質がある.

## 検証

* [AOJ-DPL1-A: Disjoint Set: Union Find Tree](../solution/AOJ-DPL1-A.html)
* [ATC001-B: Union Find](../solution/ATC001-B.html)
* [ABC120-D: Decayed Bridges](../solution/ABC120-D.html)
* [ABC126-E: 1 or 2](../solution/ABC126-E.html)
* [ABC157-D: Friend Suggestions](../solution/ABC157-D.html)
* [ABC177-D: Friends](../solution/ABC177-D.html)
* [ABC214-D: Sum of Maximum Weights](../solution/ABC214-D.html)
* [ABC217-D: Cutting Woods](../solution/ABC217-D.html)
* [ABC229-E: Graph Destruction](../solution/ABC229-E.html)
* [ICPC模擬国内予選2020-B: 爆発の連鎖](../solution/AOJ3202.html)
* [ICPC国内予選2020-B: 追跡調査](../solution/AOJ1641.html)

## 参考文献

* プログラミングコンテストチャレンジブック

