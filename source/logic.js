/* ---------- Deck, words and dealing (pure, shared with tests) ---------- */
const VALUES={A:1,B:3,C:3,D:2,E:1,F:4,G:2,H:4,I:1,J:8,K:5,L:1,M:3,N:1,O:1,P:3,Q:10,R:1,S:1,T:1,U:1,V:4,W:4,X:8,Y:4,Z:10};
const COUNTS={A:9,B:2,C:2,D:4,E:12,F:2,G:3,H:2,I:9,J:1,K:1,L:4,M:2,N:6,O:8,P:2,Q:1,R:6,S:4,T:6,U:4,V:2,W:2,X:1,Y:2,Z:1};
const LENGTHS=[3,4,5,6,7];
const MULT=[1,2,3,4,5]; /* the bonus spot's letter counts this many times, by hand */
/* The bonus spot moves around: from MOVE_FROM on, each hand puts it on a slot picked from the date (the same for everyone).
   Before that it was always the first letter, so past days score the way they did. */
const MOVE_FROM='2026-10-30';
function bonusSlots(date){return LENGTHS.map((len,h)=>date<MOVE_FROM||h===0?0:hashStr('bonus|'+date+'|'+h)%len)}
const SIZES=[5,6,7,8,9]; /* cards dealt (you and the dealer): one more each hand */
const HANDS=LENGTHS.length;
/* Draw and Swap cost more as hands are worth more: hand 1 is 2 and 1, hand 5 is 6 and 5. */
const DRAW_COST=[2,3,4,5,6],SWAP_COST=[1,2,3,4,5];
const EPOCH='2026-09-01';
/* Hold'em (Plus): shared cards in the middle (3 in hand 1, up to 7 in hand 5) plus 2 private cards each.
   In Hold'em, card arrays are [board..., your 2 cards] and a word must use at least one of your 2 cards.
   HOLE is 0 in the regular game, so every rule below works the same as before. */
let HOLE=0;
function usesHole(c,letters){return !HOLE||!fits(c,count(letters.slice(0,-HOLE).join('')))}

function unpack(obj){const all=[];for(const k in obj){const n=+k,s=obj[k];for(let i=0;i<s.length;i+=n)all.push(s.slice(i,i+n))}return all}
const ALL=new Set(unpack(WORDS_ALL));
const DEALER_LIST=unpack(WORDS_DEALER).filter(w=>w.length<=7).map(w=>[w,count(w)]);

function count(s){const c={};for(const ch of s)c[ch]=(c[ch]||0)+1;return c}
function fits(need,have){for(const k in need)if((have[k]||0)<need[k])return false;return true}
function score(word,h=0,b=0){if(!word)return 0;let s=0;for(const ch of word)s+=VALUES[ch]||0;return s+(MULT[h]-1)*(VALUES[word[b]]||0)}
function isWord(w){return w.length>=3&&ALL.has(w)}
/* Best common word for hand h (its length, and its multiplier on bonus slot b): highest score, then alphabetical. */
function best(letters,h,b=0){const len=LENGTHS[h];const have=count(letters.join(''));let bw='',bs=0;
  for(const [w,c] of DEALER_LIST){if(w.length!==len||!fits(c,have)||!usesHole(c,letters))continue;const s=score(w,h,b);if(s>bs||(s===bs&&w<bw)){bw=w;bs=s}}
  return {word:bw,score:bs}}
/* Is there any word at all (full list) of exactly len letters in these cards? */
const BY_LEN={};
function anyWord(letters,len){if(!BY_LEN[len])BY_LEN[len]=[...ALL].filter(w=>w.length===len).map(count);const have=count(letters.join(''));
  return BY_LEN[len].some(c=>fits(c,have)&&usesHole(c,letters))}
/* How many common words of exactly len letters these cards can make */
/* Points for every common word your cards can make this hand */
function wordScores(letters,h,b=0){const len=LENGTHS[h],have=count(letters.join('')),out=[];for(const [w,c] of DEALER_LIST)if(w.length===len&&fits(c,have)&&usesHole(c,letters))out.push(score(w,h,b));return out}
const MIN_WORDS=4,WIN_SHARE=0.5;
function countWords(letters,len){const have=count(letters.join(''));let n=0;for(const [w,c] of DEALER_LIST)if(w.length===len&&fits(c,have)&&usesHole(c,letters))n++;return n}
function removeLetters(cards,word){const left=cards.slice();for(const ch of word){const i=left.indexOf(ch);if(i>=0)left.splice(i,1)}return left}

/* Holiday Edition, like The Daily 15: on six holidays the dealer plays a festive word in every hand (3 to 7 letters),
   a different set each year, then the list starts over. On the birthdays (Jeff's kids) the dealer plays the name in hand 2. */
const HOLI={'10-31':[['BOO','BAT','HEX','OWL','FOG'],['MASK','HOWL','DARK','TOMB','MOON'],['GHOST','WITCH','SKULL','SCARY','CANDY'],['SPOOKY','ZOMBIE','GOBLIN','CANDLE','SPIDER'],['PUMPKIN','HAUNTED','COSTUME','VAMPIRE','PHANTOM']],
  thanks:[['PIE','YAM','OAT','HAM','COB'],['CORN','FALL','HOME','FOOD','LEAF'],['GRAVY','FEAST','BREAD','SAUCE','ACORN'],['TURKEY','GOBBLE','AUTUMN','DINNER','GATHER'],['HARVEST','PILGRIM','STUFFED','BLESSED']],
  '12-25':[['ELF','JOY','FIR','TOY','NOG'],['NOEL','SNOW','GIFT','STAR','BELL'],['SANTA','HOLLY','MERRY','CAROL','COCOA'],['JINGLE','SLEIGH','TINSEL','WREATH','RIBBON'],['SNOWMAN','MITTENS','PRESENT','CHIMNEY','GARLAND']],
  '12-31':[['POP','NEW','EVE','HAT','YAY'],['GALA','HORN','KISS','BASH','DROP'],['PARTY','TOAST','CHEER','FRESH','CLOCK'],['CHEERS','HOORAY','SPARKS','TOASTS','DANCES'],['SPARKLE','BALLOON','GLITTER','RESOLVE']],
  '02-14':[['HUG','PET','COO','WOO'],['LOVE','KISS','ROSE','DATE','DEAR'],['HEART','CUPID','ROSES','SWEET','ADORE'],['ADMIRE','SWEETS','CUDDLE','LOVING','CHARMS'],['DARLING','ROMANCE','FLOWERS','SWEETIE','FOREVER']],
  '07-04':[['USA','POP','FUN','SUN','HOT'],['FLAG','STAR','BOOM','FIRE','BAND'],['EAGLE','STARS','GRILL','SPARK','PROUD'],['PARADE','ROCKET','SPARKS','BANNER','PICNIC'],['FREEDOM','LIBERTY','STRIPES','PATRIOT','HOTDOGS']]};
const BDAY={'12-06':'TESS','06-12':'LYLA'};
const HOLI_ICON={'10-31':'🎃',thanks:'🦃','12-25':'🎄','12-31':'🎉','02-14':'❤️','07-04':'🎆'};
/* {label, icon, words:[one per hand, or null]} for a holiday or birthday, else null */
function holiday(date){const y=+date.slice(0,4),md=date.slice(5);
  if(BDAY[md])return{label:'Birthday Edition',icon:'🎂',words:[null,[BDAY[md]],null,null,null]};
  /* Thanksgiving is the 4th Thursday of November */
  const nov1=new Date(y,10,1).getDay(),tg='11-'+String(1+(4-nov1+7)%7+21).padStart(2,'0'),k=md===tg?'thanks':md,L=HOLI[k];
  if(!L||date<'2026-10-31')return null;
  /* words[h] is this year's word first, then the rest of the list in case its cards don't work out */
  return{label:'Holiday Edition',icon:HOLI_ICON[k],words:L.map(a=>{const i=((y-2026)%a.length+a.length)%a.length;return a.slice(i).concat(a.slice(0,i))})}}
function hashStr(s){let h=1779033703^s.length;for(let i=0;i<s.length;i++){h=Math.imul(h^s.charCodeAt(i),3432918353);h=h<<13|h>>>19}return h>>>0}
function rng(seed){let a=seed>>>0;return()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function freshDeck(r){const d=[];for(const k in COUNTS)for(let i=0;i<COUNTS[k];i++)d.push(k);
  for(let i=d.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[d[i],d[j]]=[d[j],d[i]]}return d}

/* A fresh deal every hand, the same for everyone that day. Each deal is checked before it is used:
   you have at least 4 common words in hands 1-4 and 2 in hand 5, your best word always beats the dealer's,
   but the dealer's word beats at least half of your words (so you have choices, and the dealer wins often). About 3 days in 10 the dealer busts on one hand (hands 2-5); from BUST_FROM, about 1 day in 5 (hands 2-3), meaning it has no word at all. */
/* Your cards and the dealer's from a shuffled deck: n each, or in Hold'em a shared board of n-2 plus 2 each */
function split(deck,n){if(!HOLE)return [deck.slice(0,n),deck.slice(n,2*n)];const b=n-HOLE,board=deck.slice(0,b);return [board.concat(deck.slice(b,b+HOLE)),board.concat(deck.slice(b+HOLE,b+2*HOLE))]}
/* A moving bonus spreads scores out, so from MOVE_FROM the dealer may beat a little less of your hand (60%, not 50%): about the same difficulty as before */
/* From BUST_FROM the dealer busts less often (about 1 day in 5) and only in hands 2 or 3, so the big hands are always a real fight */
const BUST_FROM='2026-10-31';
function dealDay(date){const share=date<MOVE_FROM?WIN_SHARE:0.6,hol=holiday(date);
  const bustHand=date<BUST_FROM?(hashStr('bust|'+date)%10<3?1+hashStr('which|'+date)%4:-1):(hashStr('bust|'+date)%10<2?1+hashStr('which|'+date)%2:-1);
  const day={you:[],dealer:[],yourBest:[],dealerBest:[],drawCard:[],swapCard:[],bonus:bonusSlots(date),holiday:hol};
  for(let h=0;h<HANDS;h++){const tws=hol&&hol.words[h],b=day.bonus[h],r=rng(hashStr((HOLE?'abcholdem|':'abcdeal3|')+date+'|'+h)),n=SIZES[h];let pick=null;
    for(let tries=0;tries<4000&&!pick;tries++){const tw=tws&&tws[Math.floor(tries/800)%tws.length];const deck=freshDeck(r);let [you,dealer]=split(deck,n);
      if(tw&&!(()=>{/* the dealer's cards hold the festive word plus random fill */
        const ws=tw.split('');let left=deck.slice(HOLE||n,2*n).concat(deck.slice(2*n+2));for(const ch of ws){const i=left.indexOf(ch);if(i<0)return false;left.splice(i,1)}
        const dl=ws.concat(left.slice(0,n-ws.length));for(let i=dl.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[dl[i],dl[j]]=[dl[j],dl[i]]}
        if(HOLE){const bd=dl.slice(0,n-HOLE);you=bd.concat(deck.slice(0,HOLE));dealer=bd.concat(dl.slice(n-HOLE));if(!usesHole(count(tw),dealer))return false}
        else dealer=dl;return true})())continue;
      const y=best(you,h,b);if(!y.word)continue;const ys=wordScores(you,h,b),late=tries>=2000;
      if(ys.length<(h<HANDS-1?(late?3:MIN_WORDS):(late?1:2)))continue;const d=tw?{word:tw,score:score(tw,h,b)}:best(dealer,h,b);
      if(h===bustHand&&!tws){if(d.word||anyWord(dealer,LENGTHS[h]))continue}
      else{if(!d.word)continue;const win=ys.filter(x=>x>d.score).length;if(win<1||(!late&&win>Math.max(1,Math.floor(ys.length*share))))continue}
      pick={you,dealer,y,d,draw:deck[2*n],swap:deck[2*n+1]}}
    if(!pick){const deck=freshDeck(r),[you,dealer]=split(deck,n);pick={you,dealer,draw:deck[2*n],swap:deck[2*n+1]};pick.y=best(pick.you,h,b);pick.d=best(pick.dealer,h,b)}
    day.you.push(pick.you);day.dealer.push(pick.dealer);day.yourBest.push(pick.y);day.dealerBest.push(pick.d);day.drawCard.push(pick.draw);day.swapCard.push(pick.swap)}
  day.bestTotal=day.yourBest.reduce((a,b)=>a+b.score,0);return day}

/* Difficulty 1-5, like The Daily 15: a careful robot plays each hand with a word from the better half
   of the common words it can make. Expected hands won: 4+ = 1, 3.5+ = 2, 3+ = 3, 2.5+ = 4, less = 5. */
const DIFFW=['','Easy','Gentle','Medium','Tough','Hard'];
function expectedWins(day){let E=0;for(let h=0;h<HANDS;h++){const have=count(day.you[h].join(''));
    const ws=DEALER_LIST.filter(([w,c])=>w.length===LENGTHS[h]&&fits(c,have)&&usesHole(c,day.you[h])).map(([w])=>score(w,h,day.bonus[h])).sort((a,b)=>b-a);
    const top=ws.slice(0,Math.ceil(ws.length/2)),d=day.dealerBest[h];if(top.length)E+=top.filter(x=>!d.word||x>d.score).length/top.length}
  return E}
function difficulty(day){const e=expectedWins(day);return e>=4?1:e>=3.5?2:e>=3?3:e>=2.5?4:5}
function dayNumber(date){return Math.round((Date.parse(date)-Date.parse(EPOCH))/864e5)+1}
if(typeof module!=='undefined')module.exports={split,wordScores,countWords,setHole:v=>{HOLE=v},difficulty,expectedWins,DIFFW,VALUES,SIZES,LENGTHS,MULT,score,bonusSlots,holiday,isWord,best,dealDay,dayNumber,removeLetters,HANDS};
