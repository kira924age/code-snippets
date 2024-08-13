# ABC177-D: Friends

## 問題

* [https://atcoder.jp/contests/abc177/tasks/abc177_d](https://atcoder.jp/contests/abc177/tasks/abc177_d)

## 解説

最大の連結成分の大きさが答え.

## 実装例

### C++

* submission: [https://atcoder.jp/contests/abc177/submissions/27981758](https://atcoder.jp/contests/abc177/submissions/27981758)

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
  for (int i = 0; i < M; i++) {
    int A, B;
    std::cin >> A >> B;
    uf_tree.unite(A - 1, B - 1);
  }

  int ans = 0;
  for (int i = 0; i < N; i++) {
    ans = std::max(ans, uf_tree.size(i));
  }

  std::cout << ans << "\n";

  return 0;
}
```

### Python

* submission: [https://atcoder.jp/contests/abc177/submissions/27981829](https://atcoder.jp/contests/abc177/submissions/27981829)

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
    A, B = map(int, input().split())
    uf_tree.unite(A - 1, B - 1)

print(max([uf_tree.size(i) for i in range(N)]))
```

