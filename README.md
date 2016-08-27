
## Memorizinator
A little memory game to help learn big ideas. (Feedback welcome)

1. Navigate to page. Timer starts (1.5 seconds / word in text).
2. Click circles in the proper order.
3. Game provides feedback (lower-left) about Win, Loss, Player Error.
4. Need a hint? (All are toggles)
   * _ShowIt_. Show the full text message.
   * _SayIt_. Audio of the text. [Only works in Chrome.]
   * _BoldIt_. The next correct word will be bolded.
5. Select another text (top-right) or _Restart_ game (bottom-right).

## D3 Force Simulation Notes
This game leverages the D3 Force Simulation (version 4) mechanics.  It incorporates:
* Multi-foci layout.
* Adding and subtracting nodes and links.
* Event handling (drag, double-click).
* Centered text within nodes (including a fix for vertical centering in Firefox).

## TODO D3
* Turn circles red when incorrect. ####
* Ability to unravel answer. ####

* Add an underscore-based hint system ("I h--- f----- t-- g--- f----.")
* Highlight node on mouseover? ####

* Better score tracking.
* Multiple choice or Pairings game option

* Check initial message. Keep it there until user overwrites or end of game. 
* Create Settings messages area.
