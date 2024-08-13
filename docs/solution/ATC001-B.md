# ATC001-B: Union Find

## 問題

* [https://atcoder.jp/contests/atc001/tasks/unionfind_a](https://atcoder.jp/contests/atc001/tasks/unionfind_a)

## 解説

Union Find Tree を貼るだけ.

## 実装例

### C++

* submission: [https://atcoder.jp/contests/atc001/submissions/27945497](https://atcoder.jp/contests/atc001/submissions/27945497)

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
  int N, Q;
  std::cin >> N >> Q;

  UnionFind uf_tree(N);

  while (Q--) {
    int P, A, B;
    std::cin >> P >> A >> B;

    if (P == 0) {
      uf_tree.unite(A, B);
    }
    if (P == 1) {
      std::cout << (uf_tree.is_same_root(A, B) ? "Yes" : "No") << "\n";
    }
  }

  return 0;
}
```

### Python

* submission: [https://atcoder.jp/contests/atc001/submissions/27945559](https://atcoder.jp/contests/atc001/submissions/27945559)

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


N, Q = map(int, input().split())

uf_tree = UnionFind(N)

for _ in range(Q):
    P, A, B = map(int, input().split())

    if P == 0:
        uf_tree.unite(A, B)
    if P == 1:
        print("Yes" if uf_tree.is_same_root(A, B) else "No")
```

