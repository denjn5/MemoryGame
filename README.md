## Memorizinator
A little memory game to help learn big ideas. (Optimized for Chrome browser. Feedback welcome)

1. Navigate to page. Timer starts (1.5 seconds / word in text).
2. Double-click the circles in the proper order.
3. Game provides feedback (lower-left) about Win, Loss, Player Error.
4. Need a hint? (All are toggles)
   * _ShowIt_. Show the full text message.
   * _SayIt_. Audio of the text. [Only works in Chrome.]
   * _BoldIt_. The next correct word will be bolded. [You'll see it after the next move.]
5. Select another text (top-right) or _Restart_ game (bottom-right).


### D3 Force Simulation Notes
* This game leverages the D3 Force Simulation (version 4) mechanics.  It incorporates:
  * Multi-foci
  * Adding and subtracting nodes.
  * Adding links.
  * Event handling
  * Centered text within nodes

  
## TODO
* Provide player more feedback about wrong choices.
* Ability to unravel answer?
* Have colors mean something? (paragraphs?)
* Improve BoldIt (so it works "now")
* Add an underscore-based hint system ("I h--- f----- t-- g--- f----.")
* Pull in dropdown select from json.
* Highlight node on mouseover?
* Use small bar chart for timer?