# AOJ-NTL1-A: 素因数分解

## 問題

* [https://onlinejudge.u-aizu.ac.jp/problems/NTL_1_A](https://onlinejudge.u-aizu.ac.jp/problems/NTL_1_A)

## 解説

素因数分解をする.

## 実装例

### C++

* submission: [https://onlinejudge.u-aizu.ac.jp/solutions/problem/NTL_1_A/review/5919109/kira924age/C++11](https://onlinejudge.u-aizu.ac.jp/solutions/problem/NTL_1_A/review/5919109/kira924age/C++11)

```cpp
#include <iostream>
#include <map>

std::map<long long, int> prime_factor(long long n) {
  std::map<long long, int> res;
  for (long long x = 2; x * x <= n; x++) {
    while (n % x == 0) {
      ++res[x];
      n /= x;
    }
  }
  if (n != 1) {
    res[n] = 1;
  }
  return res;
}

int main() {
  std::cin.tie(0);
  std::ios_base::sync_with_stdio(false);

  int n;
  std::cin >> n;

  std::map<long long, int> prime_factors = prime_factor(n);

  std::cout << n << ":";

  for (auto it = prime_factors.begin(); it != prime_factors.end(); it++) {
    long long prime = it->first;
    int e = it->second;
    for (int i = 0; i < e; i++) {
      std::cout << " " << prime;
    }
  }
  std::cout << "\n";

  return 0;
}
```

### Python

* submission: [https://onlinejudge.u-aizu.ac.jp/status/users/kira924age/submissions/1/NTL_1_A/judge/5919115/Python3](https://onlinejudge.u-aizu.ac.jp/status/users/kira924age/submissions/1/NTL_1_A/judge/5919115/Python3)

```python
#!/usr/bin/env python3


def prime_factor(n):
    res, x = {}, 2
    while x * x <= n:
        while n % x == 0:
            res[x] = res.get(x, 0) + 1
            n //= x
        x += 1
    if n != 1:
        res[n] = 1

    return res


n = int(input())
prime_factors = prime_factor(n)

print("{:d}:".format(n), end="")
for p, e in prime_factors.items():
    for i in range(e):
        print(" {:d}".format(p), end="")

print()
```

