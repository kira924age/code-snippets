# ABC229-E: Graph Destruction

## 問題

* [https://atcoder.jp/contests/abc229/tasks/abc229_e](https://atcoder.jp/contests/abc229/tasks/abc229_e)

## 解説

操作を逆から見たときのことを考える.
最初は必ず頂点が1つもない状態なので連結成分の個数は 0.

何もない状態から頂点 $N, N-1, N-2$ ... が順番に追加され, 存在する頂点の間に辺が張られていく.

各状態における連結成分の個数は Union Find Tree を使えば効率的に求めることができる.

## 実装例

### C++

* submission: [https://atcoder.jp/contests/abc229/submissions/27975768](https://atcoder.jp/contests/abc229/submissions/27975768)

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

  std::vector<std::vector<int>> graph(N);
  for (int i = 0; i < M; i++) {
    int A, B;
    std::cin >> A >> B;
    A--, B--;
    graph[A].push_back(B);
    graph[B].push_back(A);
  }

  UnionFind uf_tree(N);
  std::vector<int> answers(N, 0);
  for (int i = N - 1; i >= 1; i--) {
    for (int v : graph[i]) {
      if (v > i) {
        uf_tree.unite(i, v);
      }
    }
    answers[i - 1] = uf_tree.cnt - i;
  }

  for (int ans : answers) {
    std::cout << ans << "\n";
  }

  return 0;
}
```

### Python

* submission: [https://atcoder.jp/contests/abc229/submissions/27975867](https://atcoder.jp/contests/abc229/submissions/27975867)

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

graph = [[] for _ in range(N)]
for _ in range(M):
    A, B = map(int, input().split())
    graph[A - 1].append(B - 1)
    graph[B - 1].append(A - 1)

uf_tree = UnionFind(N)

answers = [0 for _ in range(N)]
for i in range(N - 1, 0, -1):
    for nxt_v in graph[i]:
        if nxt_v > i:
            uf_tree.unite(nxt_v, i)

    answers[i - 1] = uf_tree.cnt - i

print("\n".join(map(str, answers)))
```

