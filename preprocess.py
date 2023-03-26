from sys import argv


def dedupe(pairs):
    seen = set()
    final = []
    dupes = []
    for (word, _def) in pairs:
        key = word.lower().strip()
        if key not in seen:
            seen.add(key)
            final.append((word, _def))
        else:
            dupes.append((word, _def))
    return (final, dupes)


def alphabetize(pairs):
    return sorted(pairs, key=lambda x: x[0])


def readWords(wordsPath="content.txt", sep=","):
    with open(wordsPath, "r", encoding="utf-8") as f:
        pairs = list(
            map(lambda x: tuple(x.split(sep, 1)), f.read().strip("\n").split("\n")))
        return pairs


def main():
    n = len(argv)
    if n < 2:
        print("Usage `python preprocess.py (filepath.py) [sep]`")
    filePath = argv[1]
    sep = "," if n < 3 else argv[2]
    pairs = readWords(filePath, sep)
    originalCount = len(pairs)
    (pairs, dupes) = dedupe(pairs)
    pairs = alphabetize(pairs)

    oldContent = ""

    with open(filePath, "r") as f:
        oldContent = f.read()

    with open(filePath, "w", encoding="utf-8") as f:
        try:
            f.write("\n".join(list(map(lambda x: sep.join(x), pairs))))
        except Exception as e:
            print(e)
            f.write(oldContent)

    print(f"""Summary:
  {len(dupes)} duplicates removed:
{'🍔'.join(list(map(lambda x: f'  - {x[0]}', dupes)))}
  Original count: {originalCount}
  New count: {originalCount - len(dupes)}""".replace("🍔", "\n"))


if __name__ == "__main__":
    main()
