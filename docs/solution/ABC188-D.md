# ABC188-D: Snuke Prime

## 問題

* [https://atcoder.jp/contests/abc188/tasks/abc188_d](https://atcoder.jp/contests/abc188/tasks/abc188_d)

## 解説

$a_i$ 日目の始めに $+c_i$ 円, $b_i + 1$ 日目の始めに $-c_i$ 円だけ1日あたりに払う金額が増減すると考えると
区間 $[a_i, b_i]$ において, 始点と終点を区別する必要がなくなる.

$a_i, b_i + 1$ を座標圧縮して, 座標圧縮後の座標における1日あたりに支払う金額を累積和で求める.
座標を先頭から2つずつ見ていき, 1日あたりに支払う金額に元座標における座標の差を掛けた値を答えに足していけば良い.

## 実装例

### C++

* submission: [https://atcoder.jp/contests/abc188/submissions/26052124](https://atcoder.jp/contests/abc188/submissions/26052124)

```cpp
#include <algorithm>
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
  int N, C;
  std::cin >> N >> C;

  std::vector<int> a(N), b(N), c(N);
  std::vector<int> x(2 * N);
  for (int i = 0; i < N; i++) {
    std::cin >> a[i] >> b[i] >> c[i];
    x[i] = a[i];
    x[i + N] = b[i] + 1;
  }

  std::vector<int> shrink_x = shrink_coordinate(x);

  std::vector<long long> prefix_sum(2 * N + 1, 0);
  for (int i = 0; i < N; i++) {
    prefix_sum[shrink_x[i]] += c[i];
    prefix_sum[shrink_x[i + N]] -= c[i];
  }

  for (int i = 1; i <= 2 * N; i++) {
    prefix_sum[i] += prefix_sum[i - 1];
  }

  std::sort(x.begin(), x.end());
  x.erase(unique(x.begin(), x.end()), x.end());

  const int M = x.size();

  long long ans = 0;
  for (int i = 0; i < M - 1; i++) {
    long long cost = std::min(prefix_sum[i], (long long)C);
    long long days = x[i + 1] - x[i];

    ans += cost * days;
  }

  std::cout << ans << "\n";

  return 0;
}
```

### Python

* submission: [https://atcoder.jp/contests/abc188/submissions/26052148](https://atcoder.jp/contests/abc188/submissions/26052148)

```python
#!/usr/bin/env python3


def shrink_coordinate(a):
    b = sorted(list(set(a)))
    table = {v: k for k, v in enumerate(b)}

    return list(map(lambda x: table[x], a))


N, C = map(int, input().split())
abc = [[int(x) for x in input().split()] for _ in range(N)]

a = [x[0] for x in abc]
b = [x[1] for x in abc]
c = [x[2] for x in abc]

x = [0 for _ in range(2 * N)]
for i in range(N):
    x[i] = a[i]
    x[i + N] = b[i] + 1

shrink_x = shrink_coordinate(x)

prefix_sum = [0 for _ in range(2 * N + 1)]
for i in range(N):
    prefix_sum[shrink_x[i]] += c[i]
    prefix_sum[shrink_x[i + N]] -= c[i]

for i in range(1, 2 * N + 1):
    prefix_sum[i] += prefix_sum[i - 1]

x = sorted(set(x))
M = len(x)

ans = 0
for i in range(M - 1):
    cost = min(prefix_sum[i], C)
    days = x[i + 1] - x[i]
    ans += cost * days

print(ans)
```

