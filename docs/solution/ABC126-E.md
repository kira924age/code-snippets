# ABC126-E: 1 or 2

## 問題

* [https://atcoder.jp/contests/abc126/tasks/abc126_e](https://atcoder.jp/contests/abc126/tasks/abc126_e)

## 解説

$A_i$ は 1 or 2 なので偶奇が分かれば数字を当てることができる.

$A_{X_i} + A_{Y_i} + Z_i$ が偶数であることを知っているならば,
$A_{X_i} + A_{Y_i}$ の偶奇が分かるので $A_{X_i},  A_{Y_i}$ のうち一方が分かれば他方が分かる.

ここで $X_i$ と $Y_i$ にのみ辺が貼られているグラフを考えると,
同じ連結成分に属する頂点のうち1つでも値が分かれば, その連結成分の値は全て分かる.

よって, 連結成分の個数が答え.

## 実装例

### C++

* submission: [https://atcoder.jp/contests/abc126/submissions/27945784](https://atcoder.jp/contests/abc126/submissions/27945784)

```cpp
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

int main() {
  int N, M;
  std::cin >> N >> M;

  UnionFind uf_tree(N);

  while (M--) {
    int X, Y, Z;
    std::cin >> X >> Y >> Z;

    uf_tree.unite(X - 1, Y - 1);
  }

  std::cout << uf_tree.cnt << "\n";
  return 0;
}
```

### Python

* submission: [https://atcoder.jp/contests/abc126/submissions/27945811](https://atcoder.jp/contests/abc126/submissions/27945811)

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


N, M = map(int, input().split())

uf_tree = UnionFind(N)

for _ in range(M):
    X, Y, Z = map(int, input().split())
    uf_tree.unite(X - 1, Y - 1)

print(uf_tree.cnt)
```

