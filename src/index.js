import fs from "fs";

global.dados = [];
global.words = [];
global.word_freqs = [];

// Function to read a file
function read_file(path_to_file) {
  fs.readFileSync(path_to_file, "utf-8")
    .split("")
    .forEach((w) => {
      global.dados.push(w);
    });
}

// Function to filter characters and normalize
function filter_chars_and_normalize() {
  // const regex = /[a-zA-Z0-9]/g;

  global.dados = global.dados.map((dado) => {
    if (/\w+/i.test(dado)) {
      return dado.toLowerCase();
    } else {
      return " ";
    }
  });
}

// Function to scan data for words
function scan() {
  var s = global.dados.join("");
  global.words = s.split(" ");
  global.words = global.words.filter((word) => word !== "");
}

// Function to remove stop words
function remove_stop_words() {
  let stopWords = fs.readFileSync("stop_words.txt", "utf-8");

  stopWords += ",a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";

  // remove virgulas
  stopWords = stopWords.split(",");

  let indexes = [];
  global.words.forEach((word, index) => {
    if (stopWords.includes(word)) {
      indexes.push(index);
    }
  });
  indexes.reverse().forEach((index) => {
    global.words.splice(index, 1);
  });
}

// Function to calculate word frequencies
function frequencies() {
  global.words.forEach((word) => {
    let keys = global.word_freqs.map((c) => {
      return c[0];
    });

    if (keys.includes(word)) {
      global.word_freqs[keys.indexOf(word)][1] += 1;
    } else {
      global.word_freqs.push([word, 1]);
    }
  });
}

// Function to sort word frequencies
function sort() {
  global.word_freqs.sort((a, b) => {
    return b[1] - a[1];
  });
}

// verifica se está em ambiente de teste
if (process.env.JEST_WORKER_ID === undefined) {
  if (!process.argv[2]) {
    console.log("Usage: npm run dev <path_to_file>");
    process.exit(1);
  }

  read_file(process.argv[2]);
  filter_chars_and_normalize();
  scan();
  remove_stop_words();
  frequencies();
  sort();

  let i = 0;
  global.word_freqs.forEach((word) => {
    if (i == 25) return;
    console.log(word[0], "-", word[1]);
    i++;
  });
}

export {
  read_file,
  filter_chars_and_normalize,
  scan,
  remove_stop_words,
  frequencies,
  sort,
};
