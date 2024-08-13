# ABC113-C: ID

## 問題

* [https://atcoder.jp/contests/abc113/tasks/abc113_c](https://atcoder.jp/contests/abc113/tasks/abc113_c)

## 解説

全ての県について, その県に属する市の誕生した年をそれぞれ保持して,
誕生した年を座標圧縮する.

座標圧縮した結果得られる数列は, 県に属するそれぞれ市が何番目に誕生したかを表すものなので,
それらを先頭から順番に出力すれば良い.

## 実装例

### C++

* submission: [https://atcoder.jp/contests/abc113/submissions/26037341](https://atcoder.jp/contests/abc113/submissions/26037341)

```cpp
#include <algorithm>
#include <cstdio>
#include <iostream>
#include <vector>

template <class T> std::vector<int> shrink_coordinate(std::vector<T> &a) {
  std::vector<T> b = a;

  std::sort(b.begin(), b.end());
  b.erase(std::unique(b.begin(), b.end()), b.end());

  int N = a.size();

  std::vector<int> res(N);
  for (int i = 0; i < N; i++) {
    res[i] = std::lower_bound(b.begin(), b.end(), a[i]) - b.begin();
  }

  return res;
}

int main() {
  int N, M;
  std::cin >> N >> M;

  std::vector<std::vector<int>> X(N);

  std::vector<int> P(M), Y(M);
  for (int i = 0; i < M; i++) {
    std::cin >> P[i] >> Y[i];
    X[P[i] - 1].push_back(Y[i]);
  }

  std::vector<std::vector<int>> shrink_X(N);
  for (int i = 0; i < N; i++) {
    shrink_X[i] = shrink_coordinate(X[i]);
  }

  std::vector<int> idxs(N, 0);
  for (int i = 0; i < M; i++) {
    int p = P[i];
    int num = shrink_X[p - 1][idxs[p - 1]++] + 1;

    printf("%06d%06d\n", p, num);
  }

  return 0;
}
```

### Python

* submission: [https://atcoder.jp/contests/abc113/submissions/26037447](https://atcoder.jp/contests/abc113/submissions/26037447)

```python
#!/usr/bin/env python3


def shrink_coordinate(a):
    b = sorted(list(set(a)))
    table = {v: k for k, v in enumerate(b)}

    return list(map(lambda x: table[x], a))


N, M = list(map(int, input().split()))

X = [[] for _ in range(N)]
P = [0 for _ in range(M)]
Y = [0 for _ in range(M)]

for i in range(M):
    P[i], Y[i] = [int(x) for x in input().split()]
    X[P[i] - 1].append(Y[i])

shrink_X = [[] for _ in range(N)]
for i in range(N):
    shrink_X[i] = shrink_coordinate(X[i])

idx = [0 for _ in range(N)]

for i in range(M):
    p = P[i]
    num = shrink_X[p - 1][idx[p - 1]] + 1
    idx[p - 1] += 1
    print("{:06d}{:06d}".format(p, num))
```

