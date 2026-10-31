# A, B, C, Deal

A daily word game in the style of the NYT games, played like blackjack with letter cards. Five hands a day, the same deal for everyone, with a share grid, streaks and a countdown to the next deal.

- Word length by hand: 3, 4, 5, 6, 7 letters. Cards dealt: 5, 6, 7, 8, 9 (you and the dealer). A fresh deal every hand, the same for everyone.
- Score = letter points, and the first letter counts ×1 to ×5 by hand.
- Every deal is checked: you always have at least one common word, and your best word beats the dealer's best by a little, so a perfect day is possible. About 3 days in 10 the dealer busts (has no word) on one hand.
- Before you play it shows how many common words your cards make; after the hand, what the best word was worth. Results and share show "X of Y possible points".
- Front page, intro, How to Play, Stats and results match The Daily 15. Stars by hands won: 3 = ⭐, 4 = ⭐⭐, 5 = ⭐⭐⭐. Streak = days in a row with all 5 hands finished.
- Fold gives up a hand. Draw and Swap are turned off (DRAW_SWAP=false in src.html).

- Version shows in the menu, How to Play and the stats sheet (v12 · Oct 30).
- `index.html` is the whole game (built from `source/` with `python3 source/build.py`). Words: ENABLE list (public domain) for checking your word; the dealer, word counts and "best word" use a common-word list (The Daily 15 list for 3-4 letters, plus frequent ENABLE words for 5-7 letters, with rude words removed).

## Usage

After agreeing to the terms, the website version (github.io or smaisle.app) sends an anonymous check-in to Firebase project `aislerun-88e79`, collection `abc_devices`, when the game opens and after each hand: version, opens, hands, wins, days finished, best day, streak, terms date, desk, plus two small per-day maps (`o` = opens, `h` = hands played; last 60 days). The Claude-link version doesn't check in. No Firestore rules change needed.

`owner.html` (sign in with Jeff's Google account) shows devices opened and played today, per-day opens/plays/finishes for 14 days, hands won %, streaks, versions and phone vs computer.

## Ideas for later

- Texas Hold'em mode: a few shared face-up cards in the middle plus a couple of private cards each, so you and the dealer race to the best word from the same pool. Jeff likes it; holding off for now (Oct 30).

## v12
- Cards are dealt one at a time at the start of each hand, you then the dealer.
- Every hand has at least 2 common words for you (hand 5: 2 when it can, at least 1).
- Difficulty 1-5 (Easy, Gentle, Medium, Tough, Hard) like The Daily 15: a careful robot plays each deal ahead of time. Shown on the results card.
- Check-in adds w, p and d maps (hands won, points, difficulty per finished day). The owner page's Last 14 days table shows Difficulty, Avg won, Avg pts, Best pts and 5/5 like The Daily 15.

## v13
- Fold opens a pop-up first (like the hint pop-up in The Daily 15): how many words are in your hand, hands won so far, and the star table.

## v14
- After you fold, the result shows a word you could have played and its points.
- ABC-Deal-invite.pdf: one-page friends and family invite with a QR code to smaisle.github.io/abcdeal.

## v15
- Play again (for fun) on the results card, like The Daily 15: replays the same deal, never saved, and does not count toward stats or streak.
- 💯 on the results card and in the share text when you score every possible point.

## v16
- Hands 1-4 have at least 4 common words (hand 5: at least 2). The dealer's word beats at least half of your words, but your best word always wins. A robot now wins about 3.3 hands a day instead of 4.6.
- Difficulty thresholds recalibrated: expected wins 4+ Easy, 3.5+ Gentle, 3+ Medium, 2.5+ Tough, less Hard.

## v17
- Intro and How to Play say the dealer gets the same cards for everyone too.

## v18
- Deal 'Em: a second daily deal played like Texas Hold'em (shared board plus 2 cards each; your word must use one of your cards). Plus in the app later; free for everyone on the website (hasPlus() is true unless window.ABC_APP says otherwise, like The Daily 15).
- Deal 'Em keeps its own day, results and streak (abch-day8, abch-hist). Check-ins count only the regular game.
- Shuffle in Deal 'Em mixes the shared board and always shows a new order. Deal 'Em cards shrink to fit short screens so they never cover the buttons.
- Deal numbers now start at No. 1 on Oct 29.

## v19
- Past deals for both games, like The Daily 15's past puzzles: every deal back to No. 1 with its difficulty and your result, from the front page or menu. Late plays count in stats (marked late) but not the streak. State per past day in abc-d_DATE / abch-d_DATE; difficulty cached in abc-diff / abch-diff.

## v20
- Cards shrink to fit the screen height in both games, so a two-row hand on a phone never covers the buttons.

## v21
- Results card fits short phones: See the table and Stats side by side, and a yellow nudge to play the other game today.
- Always the full name: the top bar says A, B, C, Deal or A, B, C, Deal 'Em, with No. and date under it.
- Each hand's result box shows both words and points, winner highlighted.
- Past deals renamed Archive; numbering starts Sept 1, 2026 (EPOCH), so the archive goes back to Sept 1.
- How to Play matches The Daily 15: rules page plus an Extras page.

## v22
- The "Now try A, B, C, Deal 'Em" button on the results card is now a promo tile: two little fanned cards (E, M), a "Today's second deal" kicker, the full name in the headline serif, "Played like Texas Hold'em", and a round › button.
- In Deal 'Em, the matching tile points back to A, B, C, Deal with an A, B, C fan.

## v23
- More from smAisle, linking A, B, C, Deal and The Daily 15:
  - Front page: a quiet "smAisle · See our other games ›" line under the links, opening smaisle.app.
  - Results card: once both of today's deals are done (and on archive plays and replays), the yellow tile links to The Daily 15.
  - Menu: a "More from smAisle" section with a Daily 15 tile.
- Taps are counted in abc-usage.x (d15_done, d15_menu, sm_cover) and sent with the check-in. The owner page has a "Taps to other smAisle games" table.
- In the future app, links go through window.ABC_APP.open(key) when it exists.

## v24
- Move cards once they're in your word, in both A, B, C, Deal and Deal 'Em:
  - Drag a card in your word left or right to move it.
  - Drag a card from your hand (or the board) onto your word to put it at that spot. When the word is full, dropping it on a card replaces that card.
  - Drag a card off your word to take it back. A plain tap still takes it back too.
- How to Play mentions dragging.

## v25
- Sound, like The Daily 15: soft card snaps when cards are dealt, flipped, placed or taken back; a riffle for Shuffle; a buzz for a word that isn't allowed; chimes for a win, a dealer bust and a push, a falling pair of notes for a loss, and a short fanfare when you finish the day.
- Sound: On/Off in the menu (saved as abc-sound). On by default.

## v26
- Play time: counted quietly while you're at the table on an unfinished hand (paused on other pages, between hands, and when the app is in the background). Never shown during play.
- The results card says "4 of 5 hands won in 3:42", and the share text adds "⏱ 3:42".
- Saved in history as t; sent in the check-in as a t map per day. The owner page's Last 14 days table has an Avg time column.

## v27
- Drag a card in your word onto another card and the two swap places (the card you're over lights up yellow). Drop it between two cards and it slides in there. Same for a hand card that's already in your word.

## v28
- Fill your word in any order. Every slot is a spot you can drop a card on: drag a card to an empty slot (say TH into the last two) and build from there. Drop on a filled slot to swap, or off the word to take it back. Tapping a card fills the first empty slot; tapping a card in the word takes it out and leaves the gap.
- Points so far count the first-letter multiplier only once the first slot is filled.
- Fixes swapping with the first card: the drop spot now comes from where the slots sat when the drag began.
- Sounds: bells (soft glass) for place, take back, not a word, win, dealer bust, push, fold and day done, picked from the sound board. Dealer wins keeps the falling pair. Card sounds unchanged.

## v29
- The Sound: On/Off toggle moved to the top-right corner of the menu, the same small chip as The Daily 15, and the Menu heading is left-aligned to match.

## v30
- Share text: the hands line now reads "4/5 hands won · ⏱ 3:42" on its own line under the squares, like The Daily 15's "12/15 words".
- Place sound is option 2 from the sound board: a plain card snap.

## v31
- Share text drops the colored squares. It now reads "4/5 won · ⏱ 3:42" under the title line.

## v32
- 💡 Hint, in the Fold pop-up (like The Daily 15's hint pop-up). It puts the next letter of a good word in its slot, keeping any right letters before it. The first hint of the day takes one star off; more hints that day are free.
- Results say "· 💡 hint used", the share adds 💡, and history saves hint:1 so stats and the archive count the lower stars.

## v33
- Hint lets you pick the slot: tap Get a hint, every slot glows, tap the one you want and it shows that slot's letter. The word it uses is the common word that best fits the letters you already have in place. Tapping a hand card cancels.

## v34
- 2 hints a day, each costs one star (up to 2 stars). While hints are left (and the hand has a word), the Fold button reads "💡 Hint 2" / "💡 Hint 1" and opens a Hint pop-up: Reveal a letter, with Fold this hand and No, keep playing below. Once both are used it's Fold again.
- Results show "💡 2 hints", the share shows one 💡 per hint, and history saves the hint count.

## v35
- One hint a day (was two), for one star. The button reads "💡 Hint" until you use it, then Fold.

## v36
- Hint pop-up trimmed to one line ("Reveal one letter for 1 ⭐") and three buttons, with bigger text and a darker backdrop.
- The hinted letter locks to its slot for the rest of the hand (yellow, with a 💡); Clear, taps and drags leave it in place.

## v37
- Back to 2 hints a day, each costing one star. Each hinted letter locks to its slot (h.locks).

## v38
- The bonus spot moves (from Oct 31, 2026). Each hand from 2 to 5 puts its ×2–×5 bonus on a slot picked from the date, the same for everyone (DAY.bonus, bonusSlots in logic.js). Hand 1 is ×1. Days before Oct 31 score and deal exactly as before.
- score(word,h,b), best(letters,h,b) and wordScores(letters,h,b) take the bonus slot. The dealer uses the same bonus spot.
- To keep the difficulty about the same, the deal filter lets you beat up to 60% of the dealer's words on those days (was 50%). Over a 30-day sim the average robot wins are 3.24, against 3.39 before; the bonus with the old 50% filter gave 3.03.
- The help and intro screens explain the bonus spot (the WALTZ example has ×5 on the Z).

## v39
- Fix: the result banner from one game (e.g. a hand 5 fold) stayed on screen after switching to the other game. loadDay now clears it.

## v40
- The moving bonus starts today (MOVE_FROM 2026-10-30). Any game for today saved by v39 or earlier is started fresh (S.dv), since some of today's hands are dealt differently now.

## v41
- Holiday Edition, like The Daily 15. On Halloween, Thanksgiving, Christmas, New Year's Eve, Valentine's Day and July 4 the dealer plays a festive word in every hand (BOO, MASK, GHOST, SPOOKY, PUMPKIN on Halloween 2026). There's a different set each year, and if a word's cards don't work out, the next one on the list is used. On the birthdays (Dec 6 TESS, Jun 12 LYLA) the dealer plays the name in hand 2.
- The header reads "🎃 Holiday Edition", and the share's first line gets the icon. Lists are in HOLI in logic.js.

## v42
- A quick second tap (under 0.45 s) on a card you just placed no longer takes it back.

## v43
- ☰ toggles the menu: it stays on top of the open menu, and a second tap goes back to what was open before. Tapping the dimmed area outside the menu also closes it, like The Daily 15 v1.78.

## v44
- The bonus spot stands out more (option C): a red "×N BONUS" tag, a red-outlined spot, and a red outline on the card placed there.

## v45
- The share's points line is clearer: "80 points (best possible: 81)", or "81 points, the most possible 💯".

## v46
- From Oct 31, 2026 (BUST_FROM) the dealer busts on about 1 day in 5, only in hand 2 or 3. Before that it was 3 days in 10, in hands 2 to 5. Today's and past deals are unchanged.

## v47
- New dealer-bust banner (option C): 💥, a red "Dealer busts!" title, the dealer's line reads "no word 0", and a note that the dealer couldn't spell N letters with its cards, so any word wins.

## v48
- Clock check on open (the spec is in /mnt/project-files/clock-check/README.md). A HEAD request to the page itself reads the server's Date header. If the phone's clock is off by 10+ minutes, CLOCK_SKEW corrects today(), the next-deal countdown and the daily rollover, and a toast says "Your phone's date is off, so this is today's real deal (No. N)". It never blocks play, and offline, file:// or the Claude copy fall back to the phone clock. If a game is already in progress on the wrong day, the correction waits until the next open.

## v49
- The dealer's common-word list is now open-licensed (ENABLE + 12dicts, public domain; built by the word-lists thread, see /mnt/project-files/word-lists). Deals already published are kept exactly as they were in FROZEN_DEALS (frozenDay() in logic.js), difficulty included. On those days the live "words possible" count can move by 1 or 2.

## v50
- Tapping a locked hint letter asks "🔓 Unlock?". Unlocking frees the card to move or take back, and the hint's star stays spent.

## v51
- The "N words possible" count under the cards now uses the whole dictionary, so every usable word counts (today's last hand shows 4: WHATNOT, ETHANOL, ANETHOL, TOWNLET). A hand with none says "no words possible".
- Hints still pick a common word first, and fall back to the full dictionary when no common word fits.

## Invite gate
On smaisle.github.io the page loads `https://smaisle.github.io/gate.js`, which asks for an invite code made on the smAisle stats page (this game's code, or an every-game code) and remembers it per browser. smaisle.app passes the code along as `?code=`, so it opens straight away. A soft lock only.

## v53
- Fix: on deals made before the word-list change (Sep 1 – Dec 26), the end-of-hand card could name a "best word" that loses to the dealer, because it searched only the new common list. It now includes the deal's own winning word (Oct 31, hand 2: DYER 12 beats MASK 11, not RELY 8). Hints aim for that word too.

## v54
- Today's game (Oct 31) starts over for anyone who already played it, so they can replay with the v53 best-word fix. `RESET_DAYS` in src.html lists days to reset; each saved game resets once.

## v55
- Deal 'Em's name now leads with "Deal 'Em": "A, B, C," is shown small in front of it, so the two games read apart. This applies to the header, the "Today's second deal" card, the cover button and the Archive tab. The share text keeps the full plain name.

## v56
- In hands 4 and 5 (6 and 7 letters), the count under the cards also says how many of the words are common, e.g. "14 words possible · 1 common".

## v57
- One name, two modes. The Classic header reads "A, B, C, Deal" with an outlined CLASSIC tag and "5-card poker style" underneath. Deal 'Em reads "A, B, C," with "Deal 'Em" in one black banner and "Texas Hold 'em style" underneath.
- The start buttons read Play Classic and Play Deal 'Em. The finish-screen card and the Archive tabs use the same names.

## v58
- The start screen's two buttons now look like the game headers: "A, B, C, Deal" with a CLASSIC tag and "5-card poker style", and "A, B, C," with the black "Deal 'Em" banner and "Texas Hold 'em style". The right side shows Play, Keep playing or Result.
