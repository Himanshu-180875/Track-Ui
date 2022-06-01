import React, { useContext } from "react";
import { Input, Button,Text } from "react-native-elements";
import { StyleSheet } from "react-native";
import { Context as LocationContext } from "../context/locationContext";
import useSaveTrack from "../hooks/useSaveTrack";

const TrackForm = () => {
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    nameChange,
  } = useContext(LocationContext);
  const [saveTrack] = useSaveTrack()
  console.log(locations.length);
  return (
    <>
      <Input
        value={name}
        onChangeText={nameChange}
        style={styles.spacer}
        placeholder="Enter Name"
      />
      {recording ? (
        <Button style={styles.spacer} title="Stop" onPress={stopRecording} />
      ) : (
        <Button
          style={styles.spacer}
          title="Start Recording"
          onPress={startRecording}
        />
      )}
        <Text style={styles.spacer}></Text>
      {!recording && locations.length ? (
        <Button title="Save Recording" onPress={saveTrack} />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  spacer: {
    margin: 15,
  },

});

export default TrackForm;
