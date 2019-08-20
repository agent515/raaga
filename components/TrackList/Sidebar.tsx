import * as styles from "./TrackList.styles";
import React, { useRef, memo } from "react";
import { promisifyWorker } from "@utils/promisifyWorker";
import { Button } from "@components/Button";
import sampleMidis from "../../midi.json";
import { IMidiJSON } from "@typings/midi";

let midiParseWorker;
if (IN_BROWSER) {
  const MidiParse = require("@workers/midiParse.worker");
  midiParseWorker = new MidiParse();
}

function Sidebar({ onMidiLoad }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const loadFile = async e => {
    const file = e.target.files[0];
    const midi: IMidiJSON = await promisifyWorker(midiParseWorker, {
      filePath: file,
      name: file.name
    });
    onMidiLoad(midi);
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.value = "";
    }
  };

  const selectSample = async ({ label, url }) => {
    const midi = await promisifyWorker(midiParseWorker, {
      filePath: url,
      name: label
    });
    onMidiLoad(midi);
  };

  return (
    <div className={styles.sidebar}>
      <label htmlFor="upload-midi">
        <Button icon="upload">Browse in Computer</Button>
      </label>
      <input
        onChange={loadFile}
        ref={inputRef}
        hidden
        type="file"
        name="photo"
        id="upload-midi"
        accept=".mid"
      />
      <div className={styles.sampleTitle}>Samples</div>
      {sampleMidis.map(sampleMidi => {
        return (
          <div
            key={sampleMidi.label}
            onClick={() => selectSample(sampleMidi)}
            className={styles.sample}
          >
            {sampleMidi.label.toLowerCase()}
          </div>
        );
      })}
    </div>
  );
}

export default memo(Sidebar);
