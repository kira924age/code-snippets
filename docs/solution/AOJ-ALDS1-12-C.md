# AOJ-ALDS1-12-C: Single Source Shortest Path II

## 問題

* [https://onlinejudge.u-aizu.ac.jp/problems/ALDS1_12_C](https://onlinejudge.u-aizu.ac.jp/problems/ALDS1_12_C)

## 解説

Dijkstra を貼るだけ.

## 実装例

### C++

* submission: [https://onlinejudge.u-aizu.ac.jp/status/users/kira924age/submissions/1/ALDS1_12_C/judge/6654820/C++11](https://onlinejudge.u-aizu.ac.jp/status/users/kira924age/submissions/1/ALDS1_12_C/judge/6654820/C++11)

```cpp
#include <algorithm>
#include <iostream>
#include <queue>
#include <vector>

using namespace std;

struct Edge {
  int dst;
  long long cost;
  Edge() {}
  Edge(int x, long long y) : dst(x), cost(y) {}
};

std::vector<long long> dijkstra(int sv, std::vector<std::vector<Edge>> &graph) {
  const long long LINF = 1000000000000000018;

  std::vector<long long> dist(graph.size(), LINF);
  dist[sv] = 0;

  typedef std::pair<long long, int> PLI;
  std::priority_queue<PLI, std::vector<PLI>, std::greater<PLI>> que;

  que.push(make_pair(0, sv));

  while (!que.empty()) {
    std::pair<long long, int> cur = que.top();
    que.pop();

    if (dist[cur.second] < cur.first) {
      continue;
    }

    for (int i = 0; i < graph[cur.second].size(); i++) {
      Edge edge = graph[cur.second][i];
      if (dist[cur.second] + edge.cost < dist[edge.dst]) {
        dist[edge.dst] = dist[cur.second] + edge.cost;
        que.push(make_pair(dist[edge.dst], edge.dst));
      }
    }
  }

  return dist;
}

int main() {
  std::cin.tie(0);
  std::ios::sync_with_stdio(false);

  int n;
  std::cin >> n;

  std::vector<std::vector<Edge>> graph(n);
  for (int i = 0; i < n; i++) {
    int u, k;
    std::cin >> u >> k;
    for (int j = 0; j < k; j++) {
      int v;
      long long c;
      std::cin >> v >> c;
      graph[u].push_back(Edge(v, c));
    }
  }

  std::vector<long long> dist = dijkstra(0, graph);
  for (int i = 0; i < n; i++) {
    std::cout << i << " " << dist[i] << "\n";
  }

  return 0;
}
```

### Python

* submission: [https://onlinejudge.u-aizu.ac.jp/status/users/kira924age/submissions/1/ALDS1_12_C/judge/6654683/Python3](https://onlinejudge.u-aizu.ac.jp/status/users/kira924age/submissions/1/ALDS1_12_C/judge/6654683/Python3)

```python
#!/usr/bin/env python3

import heapq


def dijkstra(start_vertex, graph):
    dist = [
        0 if i == start_vertex else float("inf") for i in range(len(graph))
    ]
    que = []
    heapq.heappush(que, (0, start_vertex))

    while que:
        cur_distance, cur_vertex = heapq.heappop(que)
        if dist[cur_vertex] < cur_distance:
            continue

        for nxt_vertex, cost in graph[cur_vertex]:
            if dist[cur_vertex] + cost < dist[nxt_vertex]:
                dist[nxt_vertex] = dist[cur_vertex] + cost
                heapq.heappush(que, (dist[nxt_vertex], nxt_vertex))

    return dist


def main():
    n = int(input())
    graph = [[] for _ in range(n)]
    for _ in range(n):
        x = [int(x) for x in input().split()]
        u, k = x[0], x[1]
        for i in range(k):
            v, c = x[i * 2 + 2:i * 2 + 4]
            graph[u].append((v, c))

    dist = dijkstra(0, graph)
    for k, v in enumerate(dist):
        print(k, v)


main()
```

### Go

* submission: [https://onlinejudge.u-aizu.ac.jp/status/users/kira924age/submissions/1/ALDS1_12_C/judge/6654297/Go](https://onlinejudge.u-aizu.ac.jp/status/users/kira924age/submissions/1/ALDS1_12_C/judge/6654297/Go)

```go
package main

import (
	"bufio"
	"container/heap"
	"fmt"
	"os"
	"strconv"
)

var sc = bufio.NewScanner(os.Stdin)
var wr = bufio.NewWriter(os.Stdout)

func out(x ...interface{}) {
	fmt.Fprint(wr, x...)
}

func next() string {
	sc.Scan()
	return sc.Text()
}

func nextInt() int {
	i, e := strconv.Atoi(next())
	if e != nil {
		panic(e)
	}
	return i
}

func nextInt64() int64 {
	i, e := strconv.ParseInt(next(), 10, 64)
	if e != nil {
		panic(e)
	}
	return i
}

type Edge struct {
	Dst  int
	Cost int64
}

type DijkstraNode struct {
	Distance int64
	Vertex   int
}

type DijkstraNodeHeap []DijkstraNode

func (h DijkstraNodeHeap) Len() int           { return len(h) }
func (h DijkstraNodeHeap) Less(i, j int) bool { return h[i].Distance < h[j].Distance }
func (h DijkstraNodeHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *DijkstraNodeHeap) Push(x interface{}) {
	*h = append(*h, x.(DijkstraNode))
}

func (h *DijkstraNodeHeap) Pop() interface{} {
	old := *h
	n := len(old)
	x := old[n-1]
	*h = old[0 : n-1]
	return x
}

func dijkstra(start int, graph [][]Edge) []int64 {
	const INF64 int64 = 1000000000000000018

	var n int = len(graph)

	var dist []int64 = make([]int64, n)
	for i := 0; i < n; i++ {
		dist[i] = INF64
	}
	dist[start] = 0

	h := &DijkstraNodeHeap{}
	heap.Init(h)

	heap.Push(h, DijkstraNode{Distance: 0, Vertex: start})

	for h.Len() > 0 {
		cur := heap.Pop(h).(DijkstraNode)
		if dist[cur.Vertex] < cur.Distance {
			continue
		}
		for _, v := range graph[cur.Vertex] {
			var next_vertex int = v.Dst
			var cost int64 = v.Cost

			if dist[cur.Vertex]+cost < dist[next_vertex] {
				dist[next_vertex] = dist[cur.Vertex] + cost
				heap.Push(h, DijkstraNode{Distance: dist[next_vertex], Vertex: next_vertex})
			}
		}
	}

	return dist
}

func main() {
	defer wr.Flush()
	sc.Buffer(make([]byte, 0), 1000000009)
	sc.Split(bufio.ScanWords)

	solve()
}

func solve() {
	n := nextInt()

	graph := make([][]Edge, n)
	for i := 0; i < n; i++ {
		graph[i] = make([]Edge, 0)
	}

	for i := 0; i < n; i++ {
		u := nextInt()
		k := nextInt()
		for j := 0; j < k; j++ {
			v := nextInt()
			c := nextInt64()
			graph[u] = append(graph[u], Edge{Dst: v, Cost: c})
		}
	}

	dist := dijkstra(0, graph)
	for i := 0; i < n; i++ {
		out(i, " ", dist[i], "\n")
	}
}
```

