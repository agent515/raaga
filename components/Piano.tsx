import * as React from "react";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import { pianoWrapperStyle } from "./styles/Piano.styles";
import SoundPlayer from "@components/SoundPlayer";

const firstNote = MidiNumbers.fromNote("c3");
const lastNote = MidiNumbers.fromNote("f6");

const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: firstNote,
  lastNote: lastNote,
  keyboardConfig: KeyboardShortcuts.HOME_ROW
});

const noteRange = { first: firstNote, last: lastNote };

export default class extends React.PureComponent {
  player: any;

  state = {
    notes: undefined
  };

  render() {
    return (
      <div className={pianoWrapperStyle}>
        <SoundPlayer>
          {({ play, stop, loading }) => (
            <Piano
              noteRange={noteRange}
              onPlayNote={play}
              onStopNote={stop}
              keyboardShortcuts={keyboardShortcuts}
              playbackNotes={this.state.notes}
							disabled={loading}
            />
          )}
        </SoundPlayer>
      </div>
    );
  }
}
