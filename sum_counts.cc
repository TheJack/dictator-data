#include <cstdio>
#include <string>

using namespace std;

int main(int argc, char* argv[]) {
  if (argc != 2) {
    fprintf(stderr, "Usage: %s <filename>", argv[0]);
    return -1;
  }
  string filename = argv[1];
  FILE* in = fopen(filename.c_str(), "r");
  FILE* out = fopen(("reduced-" + filename).c_str(), "w");
  string lastWord = "";
  long long lastCount = 0;
  char word[100];
  int year;
  int count;
  int unique;
  int lines = 0;
  while (fscanf(in, "%[^\t] %d %d %d\n", word, &year, &count, &unique) == 4) {
    ++lines % 1000000 == 0 && fprintf(stderr, ".");
    if (word == lastWord) {
      lastCount += count;
    } else {
      if (lastCount != 0) {
        fprintf(out, "%s\t%lld\n", lastWord.c_str(), lastCount);
      }
      lastCount = count;
      lastWord = word;
    }
  }
  fprintf(stderr, "\n");
}
