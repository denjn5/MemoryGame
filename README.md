# Memorizinator
A little memory game to help you learn big ideas. (Optimized for Chrome browswer. Feedback is welcome.)

## Simplest Game Plan
1) Navigate to page. Words from chosen text will pop in as bubbles.  Timer starts (1.5 seconds / word in text).
2) Double click the bubbles in the proper order.
3) Game provides feedback (lower-left) about Win, Loss, Error.
4) Need a hint? (All are toggles)
   * _ShowIt_. Show the full text message.
   * _SayIt_. Audio of the text. [Only works in Chrome.]
   * _BoldIt_. The next correct word will be bolded. [Does not repaint existing bubbles; so it takes 1 click to be active.]
5) Select another text (top-right) or _Restart_ game (bottom-right).

## TODO
* Provide player more feedback about wrong choices.
* Ability to unravel answer?
* Have colors mean something? (paragraphs?)
* Improve BoldIt (so it works "now")
* Add an underscore-based hint system ("I h--- f----- t-- g--- f----.")
* Pull in dropdown select from json.
* Highlight node on mouseover?
* Use small bar chart for timer?

# D3 Force Simulation Notes
* This game leverages the D3 Force Simulation (version 4) mechanics.  It incorporates:
  * Multi-foci
  * Adding and subtracting nodes.
  * Adding links.
  * Event handling
  * Centered text within nodes