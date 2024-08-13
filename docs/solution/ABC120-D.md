# ABC120-D: Decayed Bridges

## 問題

* [https://atcoder.jp/contests/abc120/tasks/abc120_d](https://atcoder.jp/contests/abc120/tasks/abc120_d)

## 解説

操作を逆から見たときのことを考える.
最初は辺がないのでどの2点間も行き来ができないので不便さは $N(N-1) / 2$ となる.

ここで, 頂点 $a_i$ と $b_i$ の間に辺を張ったときに不便さがどのように変化するかを考える.
もしも, $a_i$ と $b_i$ が連結であるならば互いに行き来できる頂点の組の数は変わらないので不便さは変わらない.
連結でないならば, $a_i$ と同じ連結成分の頂点が $b_i$ と同じ連結成分の頂点とそれぞれ行き来できるようになる.

したがって, $a_i$ の連結成分のサイズを $S_a$, $b_i$ の連結成分のサイズを $S_b$ とすると不便さは $S_a S_b$ だけ減少する.

Union Find Tree を用いればこれらの操作を効率的に行える.

## 実装例

### C++

* submission: [https://atcoder.jp/contests/abc120/submissions/27958841](https://atcoder.jp/contests/abc120/submissions/27958841)

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

  std::vector<int> A(M), B(M);
  for (int i = 0; i < M; i++) {
    std::cin >> A[i] >> B[i];
    A[i]--, B[i]--;
  }

  UnionFind uf_tree(N);
  std::vector<long long> answers(M);
  long long inconvenience = (long long)N * (long long)(N - 1) / 2;
  for (int i = M - 1; i >= 0; i--) {
    answers[i] = inconvenience;

    if (!uf_tree.is_same_root(A[i], B[i])) {
      long long a_size = uf_tree.size(A[i]);
      long long b_size = uf_tree.size(B[i]);
      inconvenience -= a_size * b_size;
    }
    uf_tree.unite(A[i], B[i]);
  }

  for (long long ans : answers) {
    std::cout << ans << "\n";
  }

  return 0;
}
```

### Python

* submission: [https://atcoder.jp/contests/abc120/submissions/27959372](https://atcoder.jp/contests/abc120/submissions/27959372)

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
AB = [[int(x) - 1 for x in input().split()] for _ in range(M)]

uf_tree = UnionFind(N)

ans = [0 for _ in range(M)]
inconvenience = N * (N - 1) // 2
for i in range(M - 1, -1, -1):
    A, B = AB[i]
    ans[i] = inconvenience
    if not uf_tree.is_same_root(A, B):
        inconvenience -= uf_tree.size(A) * uf_tree.size(B)
        uf_tree.unite(A, B)

print("\n".join(map(str, ans)))
```

