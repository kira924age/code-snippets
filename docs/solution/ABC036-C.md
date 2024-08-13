# ABC036-C: 座圧

## 問題

* [https://atcoder.jp/contests/abc036/tasks/abc036_c](https://atcoder.jp/contests/abc036/tasks/abc036_c)

## 解説

与えられた数列 $a$ を座標圧縮した結果をそのまま表示すれば良い.

計算量は与えられた数列の長さを $n$ として $O(n\log{n})$.

## 実装例

### C++

* submission: [https://atcoder.jp/contests/abc036/submissions/26035909](https://atcoder.jp/contests/abc036/submissions/26035909)

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
  int N;
  std::cin >> N;

  std::vector<int> a(N);
  for (int i = 0; i < N; i++) {
    std::cin >> a[i];
  }

  std::vector<int> b = shrink_coordinate(a);
  for (int i = 0; i < N; i++) {
    std::cout << b[i] << "\n";
  }

  return 0;
}
```

### Python

* submission: [https://atcoder.jp/contests/abc036/submissions/26037500](https://atcoder.jp/contests/abc036/submissions/26037500)

```python
#!/usr/bin/env python3


def shrink_coordinate(a):
    b = sorted(list(set(a)))
    table = {v: k for k, v in enumerate(b)}

    return list(map(lambda x: table[x], a))


N = int(input())
a = [int(input()) for _ in range(N)]

b = shrink_coordinate(a)
print("\n".join(map(str, b)))
```

