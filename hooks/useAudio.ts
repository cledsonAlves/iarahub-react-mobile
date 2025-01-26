import { useEffect, useState } from "react";

export function useAudio() {
    const [sound, setSound] = useState(null);
    
    useEffect(() => {
      return sound ? () => sound.unloadAsync() : undefined;
    }, [sound]);
  
    return {
      sound,
      setSound,
      playAudio: async (uri: any) => {
        const { sound: newSound } = await Audio.Sound.createAsync({ uri });
        setSound(newSound);
        await newSound.playAsync();
      }
    };
  }