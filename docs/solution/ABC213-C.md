# ABC213-C: Reorder Cards

## 問題

* [https://atcoder.jp/contests/abc213/tasks/abc213_c](https://atcoder.jp/contests/abc213/tasks/abc213_c)

## 解説

行と列それぞれの座標について座標圧縮をする.

## 実装例

### C++

* submission: [https://atcoder.jp/contests/abc213/submissions/26050755](https://atcoder.jp/contests/abc213/submissions/26050755)

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
  int H, W, N;
  std::cin >> H >> W >> N;

  std::vector<int> A(N), B(N);
  for (int i = 0; i < N; i++) {
    std::cin >> A[i] >> B[i];
  }

  std::vector<int> C, D;
  C = shrink_coordinate(A);
  D = shrink_coordinate(B);

  for (int i = 0; i < N; i++) {
    std::cout << C[i] + 1 << " " << D[i] + 1 << "\n";
  }

  return 0;
}
```

### Python

* submission: [https://atcoder.jp/contests/abc213/submissions/26050793](https://atcoder.jp/contests/abc213/submissions/26050793)

```python
#!/usr/bin/env python3


def shrink_coordinate(a):
    b = sorted(list(set(a)))
    table = {v: k for k, v in enumerate(b)}

    return list(map(lambda x: table[x], a))


H, W, N = map(int, input().split())

A = [0 for _ in range(N)]
B = [0 for _ in range(N)]

for i in range(N):
    A[i], B[i] = map(int, input().split())

C = shrink_coordinate(A)
D = shrink_coordinate(B)

for i in range(N):
    print(C[i] + 1, D[i] + 1)
```

