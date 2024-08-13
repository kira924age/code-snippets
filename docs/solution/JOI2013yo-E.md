# JOI 2012-2013 予選 問題5: 魚の生息範囲 (Fish)

## 問題

* [https://atcoder.jp/contests/joi2013yo/tasks/joi2013yo_e](https://atcoder.jp/contests/joi2013yo/tasks/joi2013yo_e)

## 解説

x, y, d 座標それぞれについて座標圧縮をして, 領域ごとに存在する魚の種類を数える.
直方体の領域をそれぞれ調べていき, 魚の種類が $K$ 種類以上であれば答えに体積を足せば良い.

## 実装例

### C++

* submission: [https://atcoder.jp/contests/joi2013yo/submissions/26053504](https://atcoder.jp/contests/joi2013yo/submissions/26053504)

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
  int N, K;
  std::cin >> N >> K;

  std::vector<int> x(2 * N), y(2 * N), d(2 * N);
  for (int i = 0; i < N; i++) {
    int x1, y1, d1, x2, y2, d2;
    std::cin >> x1 >> y1 >> d1 >> x2 >> y2 >> d2;
    x[i] = x1;
    x[i + N] = x2;
    y[i] = y1;
    y[i + N] = y2;
    d[i] = d1;
    d[i + N] = d2;
  }

  std::vector<int> shrink_x = shrink_coordinate(x);
  std::vector<int> shrink_y = shrink_coordinate(y);
  std::vector<int> shrink_d = shrink_coordinate(d);

  int cnt[110][110][110] = {0};
  for (int i = 0; i < N; i++) {
    int shrink_x1 = shrink_x[i];
    int shrink_x2 = shrink_x[i + N];
    int shrink_y1 = shrink_y[i];
    int shrink_y2 = shrink_y[i + N];
    int shrink_d1 = shrink_d[i];
    int shrink_d2 = shrink_d[i + N];
    for (int x = shrink_x1; x < shrink_x2; x++) {
      for (int y = shrink_y1; y < shrink_y2; y++) {
        for (int d = shrink_d1; d < shrink_d2; d++) {
          cnt[x][y][d]++;
        }
      }
    }
  }

  sort(x.begin(), x.end());
  x.erase(unique(x.begin(), x.end()), x.end());
  sort(y.begin(), y.end());
  y.erase(unique(y.begin(), y.end()), y.end());
  sort(d.begin(), d.end());
  d.erase(unique(d.begin(), d.end()), d.end());

  long long ans = 0;
  for (int sx = 0; sx < (int)x.size() - 1; sx++) {
    for (int sy = 0; sy < (int)y.size() - 1; sy++) {
      for (int sd = 0; sd < (int)d.size() - 1; sd++) {
        if (cnt[sx][sy][sd] < K) {
          continue;
        }

        long long x1 = x[sx];
        long long x2 = x[sx + 1];
        long long y1 = y[sy];
        long long y2 = y[sy + 1];
        long long d1 = d[sd];
        long long d2 = d[sd + 1];

        ans += (x2 - x1) * (y2 - y1) * (d2 - d1);
      }
    }
  }

  std::cout << ans << "\n";

  return 0;
}
```

### Python

* submission: [https://atcoder.jp/contests/joi2013yo/submissions/26053738](https://atcoder.jp/contests/joi2013yo/submissions/26053738)

```python
#!/usr/bin/env python3


def shrink_coordinate(a):
    b = sorted(list(set(a)))
    table = {v: k for k, v in enumerate(b)}

    return list(map(lambda x: table[x], a))


N, K = map(int, input().split())

data = [[int(x) for x in input().split()] for _ in range(N)]

x1 = [x[0] for x in data]
y1 = [x[1] for x in data]
d1 = [x[2] for x in data]
x2 = [x[3] for x in data]
y2 = [x[4] for x in data]
d2 = [x[5] for x in data]

shrink_x = shrink_coordinate(x1 + x2)
shrink_y = shrink_coordinate(y1 + y2)
shrink_d = shrink_coordinate(d1 + d2)

cnt = [[[0 for _ in range(101)] for _ in range(101)] for _ in range(101)]

for i in range(N):
    shrink_x1, shrink_x2 = shrink_x[i], shrink_x[i + N]
    shrink_y1, shrink_y2 = shrink_y[i], shrink_y[i + N]
    shrink_d1, shrink_d2 = shrink_d[i], shrink_d[i + N]

    for x in range(shrink_x1, shrink_x2):
        for y in range(shrink_y1, shrink_y2):
            for d in range(shrink_d1, shrink_d2):
                cnt[x][y][d] += 1

x = sorted(set(x1 + x2))
y = sorted(set(y1 + y2))
d = sorted(set(d1 + d2))

ans = 0
for _x in range(len(x) - 1):
    for _y in range(len(y) - 1):
        for _d in range(len(d) - 1):
            if cnt[_x][_y][_d] < K:
                continue

            x1, x2 = x[_x], x[_x + 1]
            y1, y2 = y[_y], y[_y + 1]
            d1, d2 = d[_d], d[_d + 1]

            ans += (x2 - x1) * (y2 - y1) * (d2 - d1)

print(ans)
```

## 参考文献

* [https://www.ioi-jp.org/joi/2012/2013-yo/2013-yo-t5/review/2013-yo-t5-review.html](https://www.ioi-jp.org/joi/2012/2013-yo/2013-yo-t5/review/2013-yo-t5-review.html)

