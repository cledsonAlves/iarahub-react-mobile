import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, TouchableOpacity, Platform, StyleSheet, Modal, Text } from 'react-native';
import styled from 'styled-components/native';
import { Audio, Video } from 'expo-av';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider'; // Importação do Slider

const Container = styled.View`
  flex: 1;
  background-color: #FFFFFF;
`;

const ScrollContainer = styled.ScrollView`
  flex: 1;
  margin-bottom: ${Platform.OS === 'ios' ? '100px' : '90px'}; /* Aumentar a margem para acomodar o slider */
`;

const HeaderContainer = styled.View`
  padding: 16px;
  background-color: #F78C38;
`;

const HeaderText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #FFFFFF;
`;

const PodcastCard = styled.TouchableOpacity`
  background-color: #FFF;
  margin: 16px;
  border-radius: 12px;
  padding: 16px;
  elevation: 4;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

const PodcastTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const PodcastDescription = styled.Text`
  color: #666;
  margin-bottom: 12px;
`;

const PodcastSpeaker = styled.Text`
  color: #F78C38;
  font-weight: bold;
  margin-bottom: 8px;
`;

const ThumbnailImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const PlayerContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #F78C38;
  padding: 16px;
  flex-direction: column; /* Alterado para coluna */
  align-items: center;
  ${Platform.OS === 'ios' && `
    padding-bottom: 30px;
  `}
`;

const PlayerTopRow = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const PlayerTitle = styled.Text`
  color: #FFF;
  flex: 1;
  font-weight: bold;
  margin-left: 12px;
`;

const SliderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

const TimeText = styled.Text`
  color: #FFF;
  font-size: 12px;
  width: 40px;
  text-align: center;
`;

export default function PodcastScreen() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState(null);
  const [currentPodcast, setCurrentPodcast] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  
  const [position, setPosition] = useState(0); // Posição atual
  const [duration, setDuration] = useState(0); // Duração total
  const [isSeeking, setIsSeeking] = useState(false); // Controle de arraste

  useEffect(() => {
    fetchPodcasts();
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, []);

  const fetchPodcasts = async () => {
    try {
      const response = await fetch('https://bff-iarahub.vercel.app/api/podcast/getAllPodcast');
      const data = await response.json();
      setPodcasts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching podcasts:', error);
      setLoading(false);
    }
  };

  const handlePlayPodcast = async (podcast) => {
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      setCurrentPodcast(podcast);
      setPosition(0);
      setDuration(0);

      if (podcast.videoUrl) {
        setModalVisible(true);
      } else if (podcast.audioUrl) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: podcast.audioUrl },
          { shouldPlay: true },
          onPlaybackStatusUpdate
        );
        setSound(newSound);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing podcast:', error);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    if (!isSeeking) {
      setPosition(status.positionMillis);
    }
    setDuration(status.durationMillis || 0);
    setIsPlaying(status.isPlaying);
    if (status.didJustFinish) {
      setIsPlaying(false);
      setPosition(0);
    }
  };

  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const getFormattedTime = (millis) => {
    const totalSeconds = millis / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSlidingStart = () => {
    setIsSeeking(true);
  };

  const handleSlidingComplete = async (value) => {
    if (sound) {
      const seekPosition = value * duration;
      await sound.setPositionAsync(seekPosition);
      setPosition(seekPosition);
    }
    setIsSeeking(false);
  };

  if (loading) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#F78C38" />
      </Container>
    );
  }

  return (
    <Container>
      <ScrollContainer>
        <HeaderContainer>
          <HeaderText>Podcasts</HeaderText>
        </HeaderContainer>

        {podcasts.map((podcast) => (
          <PodcastCard
            key={podcast.id}
            onPress={() => handlePlayPodcast(podcast)}
          >
            {podcast.thumbnail && (
              <ThumbnailImage
                source={{ uri: podcast.thumbnail }}
                resizeMode="cover"
              />
            )}
            <PodcastTitle>{podcast.title}</PodcastTitle>
            <PodcastSpeaker>{podcast.speaker}</PodcastSpeaker>
            <PodcastDescription>{podcast.description}</PodcastDescription>
          </PodcastCard>
        ))}
      </ScrollContainer>

      {currentPodcast && !currentPodcast.videoUrl && (
        <PlayerContainer>
          <PlayerTopRow>
            <TouchableOpacity onPress={togglePlayPause}>
              <Icon 
                name={isPlaying ? "pause" : "play-arrow"} 
                size={32} 
                color="#FFF" 
              />
            </TouchableOpacity>
            <PlayerTitle numberOfLines={1}>
              {currentPodcast.title}
            </PlayerTitle>
          </PlayerTopRow>
          <SliderContainer>
            <TimeText>{getFormattedTime(position)}</TimeText>
            <Slider
              style={{ flex: 1, marginHorizontal: 10 }}
              minimumValue={0}
              maximumValue={1}
              value={duration ? position / duration : 0}
              minimumTrackTintColor="#FFF"
              maximumTrackTintColor="#CCCCCC"
              thumbTintColor="#FFF"
              onSlidingStart={handleSlidingStart}
              onSlidingComplete={handleSlidingComplete}
            />
            <TimeText>{getFormattedTime(duration)}</TimeText>
          </SliderContainer>
        </PlayerContainer>
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {currentPodcast?.videoUrl ? (
            <Video
              source={{ uri: currentPodcast.videoUrl }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="contain"
              shouldPlay
              style={styles.videoPlayer}
            />
          ) : (
            <Text style={styles.errorText}>Erro ao carregar o vídeo</Text>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Icon name="close" size={32} color="#FFF" />
          </TouchableOpacity>
        </View>
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  videoPlayer: {
    width: '100%',
    height: '70%',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 50,
    padding: 8,
  },
  errorText: {
    color: '#FFF',
    fontSize: 18,
  },
});
