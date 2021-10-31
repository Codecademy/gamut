// key = language param to send to snippets service
// val = label in language selection drop down
export const languageOptions = {
  '': 'Select your language',
  cpp: 'C++',
  csharp: 'C#',
  golang: 'Go',
  javascript: 'JavaScript',
  php: 'PHP',
  python: 'Python 3',
  ruby: 'Ruby',
  scheme: 'Scheme',
};

export type languageOption = keyof typeof languageOptions;

export const validLanguages = Object.keys(languageOptions).filter(
  (option) => !!option
) as languageOption[];

const cpp = `#include <iostream>

int main() {
  std::cout << "Hello world!";
  return 0;
}`;

const csharp = `namespace HelloWorld {
  class Hello {
    static void Main(string[] args) {
      System.Console.WriteLine("Hello world!");
    }
  }
}`;

const golang = `package main

import "fmt"

func main() {
  fmt.Println("Hello world!")
}`;

const javascript = "console.log('Hello world!');";

const php = `<?php
  echo "Hello world!";
?>`;

const python = "print('Hello world!')";

const ruby = 'puts "Hello world!"';

const scheme = `(begin
  (display "Hello world!")
  (newline))`;

export const helloWorld: { [key in languageOption]?: string } = {
  cpp,
  csharp,
  golang,
  javascript,
  php,
  python,
  ruby,
  scheme,
};
