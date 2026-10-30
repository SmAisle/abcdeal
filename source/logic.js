/* ---------- Deck, words and dealing (pure, shared with tests) ---------- */
const VALUES={A:1,B:3,C:3,D:2,E:1,F:4,G:2,H:4,I:1,J:8,K:5,L:1,M:3,N:1,O:1,P:3,Q:10,R:1,S:1,T:1,U:1,V:4,W:4,X:8,Y:4,Z:10};
const COUNTS={A:9,B:2,C:2,D:4,E:12,F:2,G:3,H:2,I:9,J:1,K:1,L:4,M:2,N:6,O:8,P:2,Q:1,R:6,S:4,T:6,U:4,V:2,W:2,X:1,Y:2,Z:1};
const LENGTHS=[3,4,5,6,7];
const MULT=[1,2,3,4,5]; /* first letter of the word counts this many times, by hand */
const SIZES=[5,6,7,8,9]; /* cards dealt (you and the dealer): one more each hand */
const HANDS=LENGTHS.length;
/* Draw and Swap cost more as hands are worth more: hand 1 is 2 and 1, hand 5 is 6 and 5. */
const DRAW_COST=[2,3,4,5,6],SWAP_COST=[1,2,3,4,5];
const EPOCH='2026-10-30';

function unpack(obj){const all=[];for(const k in obj){const n=+k,s=obj[k];for(let i=0;i<s.length;i+=n)all.push(s.slice(i,i+n))}return all}
const ALL=new Set(unpack(WORDS_ALL));
const DEALER_LIST=unpack(WORDS_DEALER).filter(w=>w.length<=7).map(w=>[w,count(w)]);

function count(s){const c={};for(const ch of s)c[ch]=(c[ch]||0)+1;return c}
function fits(need,have){for(const k in need)if((have[k]||0)<need[k])return false;return true}
function score(word,h=0){if(!word)return 0;let s=0;for(const ch of word)s+=VALUES[ch]||0;return s+(MULT[h]-1)*(VALUES[word[0]]||0)}
function isWord(w){return w.length>=3&&ALL.has(w)}
/* Best common word for hand h (its length and first-letter multiplier): highest score, then alphabetical. */
function best(letters,h){const len=LENGTHS[h];const have=count(letters.join(''));let bw='',bs=0;
  for(const [w,c] of DEALER_LIST){if(w.length!==len||!fits(c,have))continue;const s=score(w,h);if(s>bs||(s===bs&&w<bw)){bw=w;bs=s}}
  return {word:bw,score:bs}}
/* Is there any word at all (full list) of exactly len letters in these cards? */
const BY_LEN={};
function anyWord(letters,len){if(!BY_LEN[len])BY_LEN[len]=[...ALL].filter(w=>w.length===len).map(count);const have=count(letters.join(''));
  return BY_LEN[len].some(c=>fits(c,have))}
/* How many common words of exactly len letters these cards can make */
function countWords(letters,len){const have=count(letters.join(''));let n=0;for(const [w,c] of DEALER_LIST)if(w.length===len&&fits(c,have))n++;return n}
function removeLetters(cards,word){const left=cards.slice();for(const ch of word){const i=left.indexOf(ch);if(i>=0)left.splice(i,1)}return left}

function hashStr(s){let h=1779033703^s.length;for(let i=0;i<s.length;i++){h=Math.imul(h^s.charCodeAt(i),3432918353);h=h<<13|h>>>19}return h>>>0}
function rng(seed){let a=seed>>>0;return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function freshDeck(r){const d=[];for(const k in COUNTS)for(let i=0;i<COUNTS[k];i++)d.push(k);
  for(let i=d.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[d[i],d[j]]=[d[j],d[i]]}return d}

/* A fresh deal every hand, the same for everyone that day. Each deal is checked before it is used:
   you always have at least one common word, and your best word beats the dealer's best by a little
   (so a perfect day is possible but takes the best word). About 3 days in 10 the dealer busts on one
   hand (hands 2-5), meaning it has no word at all. */
function dealDay(date){const bustHand=hashStr('bust|'+date)%10<3?1+hashStr('which|'+date)%4:-1;
  const day={you:[],dealer:[],yourBest:[],dealerBest:[],drawCard:[],swapCard:[]};
  for(let h=0;h<HANDS;h++){const r=rng(hashStr('abcdeal3|'+date+'|'+h)),n=SIZES[h];let pick=null;
    for(let tries=0;tries<4000&&!pick;tries++){const deck=freshDeck(r),you=deck.slice(0,n),dealer=deck.slice(n,2*n);
      const y=best(you,h);if(!y.word)continue;const d=best(dealer,h);
      if(h===bustHand){if(d.word||anyWord(dealer,LENGTHS[h]))continue}
      else{if(!d.word)continue;const gap=y.score-d.score;if(gap<1||gap>4+2*h)continue}
      pick={you,dealer,y,d,draw:deck[2*n],swap:deck[2*n+1]}}
    if(!pick){const deck=freshDeck(r);pick={you:deck.slice(0,n),dealer:deck.slice(n,2*n),draw:deck[2*n],swap:deck[2*n+1]};pick.y=best(pick.you,h);pick.d=best(pick.dealer,h)}
    day.you.push(pick.you);day.dealer.push(pick.dealer);day.yourBest.push(pick.y);day.dealerBest.push(pick.d);day.drawCard.push(pick.draw);day.swapCard.push(pick.swap)}
  day.bestTotal=day.yourBest.reduce((a,b)=>a+b.score,0);return day}

function dayNumber(date){return Math.round((Date.parse(date)-Date.parse(EPOCH))/864e5)+1}
if(typeof module!=='undefined')module.exports={VALUES,SIZES,LENGTHS,MULT,score,isWord,best,dealDay,dayNumber,removeLetters,HANDS};
