# ABC217-D: Cutting Woods

## 問題

* [https://atcoder.jp/contests/abc217/tasks/abc217_d](https://atcoder.jp/contests/abc217/tasks/abc217_d)

## 解説

操作を逆から見ると木材を切断するクエリは木材を結合するクエリとみなすことができる.

木材を全て切り終わったときの状態を初期状態として Union Find Tree で集合を管理しながらクエリに答えれば良い.

## 実装例

### C++

* submission: [https://atcoder.jp/contests/abc217/submissions/27977146](https://atcoder.jp/contests/abc217/submissions/27977146)

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

using namespace std;

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
  int L, Q;
  std::cin >> L >> Q;

  std::vector<int> c(Q), x(Q);
  std::vector<int> cuts;

  cuts.push_back(0);
  for (int i = 0; i < Q; i++) {
    std::cin >> c[i] >> x[i];
    if (c[i] == 1) {
      cuts.push_back(x[i]);
    }
  }
  cuts.push_back(L);

  int siz = cuts.size();
  UnionFind uf_tree(siz - 1);

  sort(cuts.begin(), cuts.end());
  for (int i = 0; i < siz - 1; i++) {
    uf_tree.parent_or_size[i] = -(cuts[i + 1] - cuts[i]);
  }

  vector<int> ans;
  for (int i = Q - 1; i >= 0; i--) {
    int idx = std::lower_bound(cuts.begin(), cuts.end(), x[i]) - cuts.begin();

    if (c[i] == 1) {
      uf_tree.unite(idx, idx - 1);
    }
    if (c[i] == 2) {
      ans.push_back(uf_tree.size(idx - 1));
    }
  }

  reverse(ans.begin(), ans.end());
  for (int a : ans) {
    cout << a << "\n";
  }

  return 0;
}
```

### Python

* submission: [https://atcoder.jp/contests/abc217/submissions/27977330](https://atcoder.jp/contests/abc217/submissions/27977330)

```python
#!/usr/bin/env python3

import bisect


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


L, Q = map(int, input().split())
cx = [[int(x) for x in input().split()] for _ in range(Q)]

cuts = []
for (c, x) in cx:
    if c == 1:
        cuts.append(x)

cuts = sorted([0] + cuts + [L])

siz = len(cuts) - 1
uf_tree = UnionFind(siz)

for i in range(siz):
    uf_tree.parent_or_size[i] = -(cuts[i + 1] - cuts[i])

ans = []
for c, x in cx[::-1]:
    idx = bisect.bisect_left(cuts, x)
    if c == 1:
        uf_tree.unite(idx - 1, idx)
    if c == 2:
        ans.append(uf_tree.size(idx - 1))

print("\n".join(map(str, ans[::-1])))
```

