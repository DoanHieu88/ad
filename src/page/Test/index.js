import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";

const AudioRecorder = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    if (mediaRecorder) {
      mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          // Gửi dữ liệu âm thanh tới API
          await sendAudioData(event.data);
        }
      };
      mediaRecorder.start(2000); // Ghi lại dữ liệu mỗi giây
    }

    return () => {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
    };
  }, [mediaRecorder]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setAudioStream(stream);
    const options = { mimeType: "audio/webm" }; // Sử dụng định dạng audio/webm
    const recorder = new MediaRecorder(stream, options);
    setMediaRecorder(recorder);
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
  };

  const playAudio = (audioData) => {
    const audioBlob = new Blob([audioData], { type: "audio/webm" });
    const audioUrl = URL.createObjectURL(audioBlob);
    setAudioURL(audioUrl);

    const audio = new Audio(audioUrl);
    audio.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  };

  const sendAudioData = async (audioData) => {
    console.log("audioData", audioData);
    const formData = new FormData();
    formData.append("file", audioData);
    formData.append("sn", "e7f66610c7bff429");
    formData.append("password", "Test@123");

    try {
      await fetch("http://192.168.96.1:8080/api/talk", {
        method: "POST",
        body: formData,
      });
      console.log("Audio sent successfully");
    } catch (error) {
      console.error("Error sending audio:", error);
    }
  };

  return (
    <Box>
      <h1>Audio Recorder</h1>
      <button onClick={startRecording} type="button" disabled={isRecording}>
        Start
      </button>
      <button onClick={stopRecording} type="button" disabled={!isRecording}>
        Stop
      </button>
      {audioURL && (
        <div>
          <h2>Recorded Audio:</h2>
          <audio controls src={audioURL}></audio>
        </div>
      )}
    </Box>
  );
};

export default AudioRecorder;
