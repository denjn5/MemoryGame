## Memorizinator
A little memory game to help learn big ideas. (Feedback welcome)

1. Navigate to page. Timer starts (1.5 seconds / word in text).
2. Click the circles in the proper order.
3. Game provides feedback about Win, Loss, Player Error.
4. Need a hint? (All are toggles)
   * _ShowIt_. Show the full quote.
   * _ShowHint_. Show the full quote, but only 1st letter of each word.
   * _SayIt_. Audio of the quote. [Only works in Chrome.]
   * _BoldIt_. The next correct word will be bolded.
5. Select another quote (top-right) or _Restart_ game (bottom-right).


### D3 Force Simulation Notes
* This game leverages the D3 Force Simulation (version 4) mechanics.  It incorporates:
  * Multi-foci
  * Adding and subtracting nodes.
  * Adding links on the fly.
  * Event handling
  * Centered text within nodes (overcomes Firefox vertical-align problem)

  
## D3 TODO
* Turn circles red when incorrect.
* Ability to unravel answer.
* Multiple choice or Pairings game option

## GAME TODO
* Better score tracking.
* New option: Ignore punctuation for checking
* Make "typein" a full-fledged answer.
