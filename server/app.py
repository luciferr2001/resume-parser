import fitz
import re
import os

from flask import Flask, jsonify, make_response, request

app = Flask(__name__)


class ATS:
    # List of Speical Characters to be excluded
    special_characters = [
        "\\",
        "&",
        "%",
        "#",
        "*",
        "(",
        ")",
        "[",
        "]",
        "{",
        "}",
        "<",
        ">",
        "'",
        '"',
        ":",
        ";",
        ",",
        "+",
        "-",
        "=",
        "|",
        "?",
        "!",
        "@",
        "$",
        "^",
        "'",
        ".",
    ]

    # Check if the file extension is pdf
    def is_pdf_file(self, file_path):
        _, file_extension = os.path.splitext(file_path)
        return file_extension.lower() == ".pdf"

    # Check if the file extension is pdf
    def getWordsFromPdf(self, resume_path: str):
        if not self.is_pdf_file(resume_path):
            raise ValueError("Invalid file format. Only PDF files are supported.")
        words = ""
        doc = fitz.open(resume_path)
        for page in doc:
            text = page.get_text()
            text = text.replace("\n", " ")
            text = re.sub(" +", " ", text)
            words += text.lower()
        for char in self.special_characters:
            words = words.replace(char, "")
        word_list = words.split(" ")
        slist = list(filter(None, word_list))
        return slist

    def searchInWordsList(self, words_to_be_searched: list, list_of_words: list):
        matching = []
        for search_term in words_to_be_searched:
            if search_term.lower() in list_of_words:
                matching.append(search_term)
        if not matching:
            return matching, False
        else:
            return matching, True


@app.route("/check")
def scan_pdf():
    ats = ATS()
    resume_path = "rutik.pdf"
    # Check if the file is a PDF before processing
    if ats.is_pdf_file(resume_path):
        words = ats.getWordsFromPdf(resume_path)
        words_to_be_searched = ["abcd"]
        match, isMatch = ats.searchInWordsList(words_to_be_searched, words)
        return make_response(jsonify(isMatch,match), 200)
    else:
        return make_response("Invalid file format. Only PDF files are supported.", 404)


