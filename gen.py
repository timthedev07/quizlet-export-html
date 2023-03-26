import webbrowser


def readWords(wordsPath="content.txt", sep=","):
    with open(wordsPath, "r", encoding="utf-8") as f:
        pairs = list(
            map(lambda x: tuple(x.split(sep, 1)), f.read().strip("\n").split("\n")))
        return pairs


def getSetTitle():
    return input("Title of the vocab set: ")


def genHTML(words, title):
    return f"""
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <style>
        :root {{
            --rad: 10px;
        }}

        body {{font-family: 'Trebuchet MS', sans-serif;}}

        table {{
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
            border-top-left-radius: var(--rad);
            border-top-right-radius: var(--rad);
            border-bottom: solid 3px rgb(9, 153, 123);
            font-size: 12px;
        }}

        td, th {{
            border-top: none;
            text-align: left;
            padding: 10px;
            border-bottom: solid 1px rgb(196, 196, 196);
        }}

        tr:nth-child(even) {{
            background-color: rgb(238, 238, 238);
        }}

        #header-row {{
            color: white;
            background-color: rgb(9, 153, 123);
        }}

        #header-row th:first-child {{
            border-top-left-radius: 10px;
        }}

        #header-row th:last-child {{
            border-top-right-radius: 10px;
        }}
    </style>
  </head>
  <body>
    <h1 style="text-align: center; margin-bottom: 7px; color: #2f2f2f; font-family: 'Times New Roman', serif;">{title}</h1>
    <h3 style="text-align: center; color: #6f6f6f; margin-top: 3px; margin-bottom: 32px; font-family: 'Times New Roman', serif;">Vocabulary Collection</h3>
    <table>
        <tr id="header-row">
            <th>Term</th>
            <th>Definition</th>
        </tr>
        {"🍔".join([f'<tr><td>{term}</td><td>{def_}</td></tr>' for (term, def_) in words])}
    </table>
  </body>
</html>
""".replace("🍔", "\n")


def main():
    setTitle = getSetTitle()
    words = readWords()

    htmlStr = genHTML(words, setTitle)

    with open("index.html", "w", encoding="utf-8") as f:
        f.write(htmlStr)

    chromePath = 'open -a /Applications/Google\ Chrome.app %s'
    webbrowser.get(chromePath).open("index.html")


if __name__ == "__main__":
    main()
