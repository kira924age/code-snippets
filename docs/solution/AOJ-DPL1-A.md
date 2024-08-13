# AOJ-DPL1-A: Disjoint Set: Union Find Tree

## 問題

* [https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=DSL_1_A](https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=DSL_1_A)

## 解説

Union Find Tree を貼るだけ.

## 実装例

### C++

* submission: [https://judge.u-aizu.ac.jp/onlinejudge/review.jsp?rid=6131996](https://judge.u-aizu.ac.jp/onlinejudge/review.jsp?rid=6131996)

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
  int n, q;
  std::cin >> n >> q;

  UnionFind uf_tree(n);

  while (q--) {
    char com;
    int x, y;

    std::cin >> com >> x >> y;

    if (com == '0') {
      uf_tree.unite(x, y);
    }
    if (com == '1') {
      std::cout << (uf_tree.is_same_root(x, y) ? 1 : 0) << "\n";
    }
  }

  return 0;
}
```

### Python

* submission: [https://judge.u-aizu.ac.jp/onlinejudge/review.jsp?rid=6132001](https://judge.u-aizu.ac.jp/onlinejudge/review.jsp?rid=6132001)


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


n, q = map(int, input().split())

uf_tree = UnionFind(n)

for _ in range(q):
    com, x, y = map(int, input().split())

    if com == 0:
        uf_tree.unite(x, y)
    if com == 1:
        print(1 if uf_tree.is_same_root(x, y) else 0)
```

