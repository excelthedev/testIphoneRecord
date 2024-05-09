class AudioProcessor extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
    const input = inputs[0];
    const output = outputs[0];
    for (let channel = 0; channel < input.length; channel++) {
      const inputChannel = input[channel];
      const outputChannel = output[channel];
      for (let i = 0; i < inputChannel.length; i++) {
        // Directly pass audio data from input to output for this example
        outputChannel[i] = inputChannel[i];
      }
    }
    return true; // Keep processor alive
  }
}

registerProcessor("audio-processor", AudioProcessor);
