/* beesfud - a reddit-like parody of BuzzFeed.
  Copyright (C) 2016 Connor Hudson

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>. */

var choice = function(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}

var capitalize = function(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

var word = function(num){
  return choice(['dogs', 'people', 'shoes', choice(['other ', '']) +'tumblr users', 'smart people', 'disney movies', 'super bowl snacks', 'gifts', 'demonstrators', 'books', 'valentines', 'touchdowns', 'puppies', 'actors', 'actresses', 'cars', 'celebrities', 'little kids', 'disney princesses', 'villains', 'classic movies', 'TV shows']);
}

var punc = function(num){
  return choice(['.','!','']);
}

var reasons = function(num){
  var s = num + ' reasons why ';
  s += word() + ' ';
  s += 'are ' + choice(['annoying', 'horrible', 'awesome', 'insane', 'superlative', 'funny', 'wrong', 'right', 'the worst', 'the best']);
  s += punc();
  return s;
}

var humanity = function(num){
  return 'These ' + num + ' ' + word() + ' will restore your faith in humanity' + punc();
}

var tears = function(num){
  return 'These ' + num + ' ' + word() + ' will ' + choice(['make you cry', 'bring you to tears']) + punc();
}

var quiz = function(num){
  return "QUIZ! Which one of these " + num + " " + word() + " describes " + choice(['you', 'your friends', 'your social life', 'your family', 'your parents', 'your music taste']) + '?';
}

var mostAbout = function(num){
  return 'The ' + num + choice([choice([' best',' worst']), choice([' most annoying', ' most horrible', ' most awesome', ' most insane', ' funniest', ' wrongest', ' rightest', ' best'])]) + ' things about ' +word();
}

var feed = function(){
  var num = Math.floor(Math.random()*59) + 2;
  var pick = Math.floor(Math.random() * 5);
  var final = [reasons, humanity, tears, quiz, mostAbout][pick](num);
  final = capitalize(final);
  if (pick != 4 && pick != 3){
    final += ' (You Won\'t Believe Number ' + Math.floor(Math.random() * (num-2)+1) + '!)'
  }
  return final;
}

module.exports = {
  capitalize: capitalize,
  word: word,
  punc: punc,
  reasons: reasons,
  humanity: humanity,
  tears: tears,
  quiz: quiz,
  mostAbout: mostAbout,
  feed: feed
};
