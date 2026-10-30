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
