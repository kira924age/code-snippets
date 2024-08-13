# AtCoder Beginner Contest 157-D: Friend Suggestions

## 問題

* [https://atcoder.jp/contests/abc157/tasks/abc157_d](https://atcoder.jp/contests/abc157/tasks/abc157_d)

## 解説


問題文から以下のことが分かる.

* 自分自身は友達の候補ではない
* すでに友達の場合は友達の候補ではない
* ブロック関係にある場合は友達の候補ではない

したがって求める答えは友達関係をグラフで表したときの頂点 $i$ を含む連結成分の大きさから以下の値を引けば良い.

* 自分自身
* 友達関係のグラフにおいて $i$ と直接つながっている頂点の数
* ブロック関係のグラフにおいて $i$ と直接つながっていてかつ友達関係のグラフにおいて連結である頂点の数

頂点 $i$ と友達関係かつブロック関係の場合において二重で引かないように `set` 等を使って除外する id が重複しないように注意する必要がある.

## 実装例

### C++

* submission: [https://atcoder.jp/contests/abc157/submissions/27946468](https://atcoder.jp/contests/abc157/submissions/27946468)

```cpp
#include <iostream>
#include <set>
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
  int N, M, K;
  std::cin >> N >> M >> K;

  std::vector<std::vector<int>> friends(N, std::vector<int>());

  UnionFind uf_tree(N);
  for (int i = 0; i < M; i++) {
    int A, B;
    std::cin >> A >> B;
    A--, B--;
    uf_tree.unite(A, B);
    friends[A].push_back(B);
    friends[B].push_back(A);
  }

  std::vector<std::vector<int>> blocks(N, std::vector<int>());
  for (int i = 0; i < K; i++) {
    int C, D;
    std::cin >> C >> D;
    C--, D--;
    blocks[C].push_back(D);
    blocks[D].push_back(C);
  }

  for (int i = 0; i < N; i++) {
    std::set<int> exclude_ids;
    for (int friend_id : friends[i]) {
      exclude_ids.insert(friend_id);
    }
    for (int block_id : blocks[i]) {
      if (uf_tree.is_same_root(i, block_id)) {
        exclude_ids.insert(block_id);
      }
    }
    int ans = uf_tree.size(i) - 1 - exclude_ids.size();
    std::cout << ans << (i == N - 1 ? "\n" : " ");
  }

  return 0;
}
```

### Python

* submission: [https://atcoder.jp/contests/abc157/submissions/27946646](https://atcoder.jp/contests/abc157/submissions/27946646)

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


N, M, K = map(int, input().split())

uf_tree = UnionFind(N)

friends = [[] for _ in range(N)]
for _ in range(M):
    A, B = map(int, input().split())
    friends[A - 1].append(B - 1)
    friends[B - 1].append(A - 1)
    uf_tree.unite(A - 1, B - 1)

blocks = [[] for _ in range(N)]
for _ in range(K):
    C, D = map(int, input().split())
    blocks[C - 1].append(D - 1)
    blocks[D - 1].append(C - 1)

ans = [0 for _ in range(N)]
for i in range(N):
    exclude_ids = set()
    for friend_id in friends[i]:
        exclude_ids.add(friend_id)
    for block_id in blocks[i]:
        if uf_tree.is_same_root(i, block_id):
            exclude_ids.add(block_id)

    ans[i] = uf_tree.size(i) - 1 - len(exclude_ids)

print(*ans)
```

