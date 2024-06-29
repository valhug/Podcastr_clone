import { action, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import OpenAI from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const generateAudioAction = action({
  args: { input: v.string(), voice: v.string() },
  handler: async (_, {voice, input}) => {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice as SpeechCreateParams['voice'],
      input,
    });
    
    const buffer = await mp3.arrayBuffer();
    
    return buffer;;
    // do something with `data`
  },
});

export const readData = internalQuery({
  args: { a: v.number() },
  handler: async (ctx, args) => {
    // read from `ctx.db` here
  },
});