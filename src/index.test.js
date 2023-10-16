import fs from "fs";
import { describe, expect, test, beforeEach } from "@jest/globals";
import {
  filter_chars_and_normalize,
  frequencies,
  read_file,
  remove_stop_words,
  scan,
  sort,
} from "./index";

beforeEach(() => {
  global.dados = [];
  global.wordsMock = [];
  global.word_freqsMock = [];
});

describe("testes unitarios", () => {
  test("deve abrir o arquivo e mudar a variavel global dados", () => {
    read_file("hino_do_vasco.txt");

    let expected = fs.readFileSync("hino_do_vasco.txt", "utf-8").split("");

    expect(global.dados).toMatchObject(expected);
  });
  test("deve filtrar caracteres não alfanumericos do array de dados", () => {
    read_file("test.txt");
    const expected = ["a", " ", " ", "9", "o", "i", " "];

    filter_chars_and_normalize();

    expect(global.dados).toMatchObject(expected);
  });
  test("deve popular o array words com palavras", () => {
    read_file("test.txt");
    filter_chars_and_normalize();
    const expected = ["a", "9oi"];

    scan();

    expect(global.words).toMatchObject(expected);
  });
  test("deve remover as stopWords do array de words", () => {
    read_file("stop_words.txt");
    filter_chars_and_normalize();
    scan();
    remove_stop_words();

    expect(global.words).toMatchObject([]);
  });
  test("deve popular o array word_freqs com as palavras e suas frequencias", () => {
    global.words = ["a", "b", "a", "c", "a", "b"];

    frequencies();

    const expected = [
      ["a", 3],
      ["b", 2],
      ["c", 1],
    ];

    expect(global.word_freqs).toMatchObject(expected);
  });
  test("deve ordenar o array word_freqs de acordo com as frequências", () => {
    global.word_freqs = [
      ["a", 1],
      ["c", 3],
      ["b", 2],
    ];

    sort();

    const expected = [
      ["c", 3],
      ["b", 2],
      ["a", 1],
    ];

    expect(global.word_freqs).toMatchObject(expected);
  });
});
