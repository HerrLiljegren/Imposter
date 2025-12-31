import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { Player } from '../types';

interface PeekCardProps {
  player: Player;
  secretWord: string;
  onPeekComplete: () => void;
}

export const PeekCard: React.FC<PeekCardProps> = ({ player, secretWord, onPeekComplete }) => {
  const [identityVisibilityStatus, setIdentityVisibilityStatus] = useState(false);

  const handlePressIn = () => {
    setIdentityVisibilityStatus(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handlePressOut = () => {
    setIdentityVisibilityStatus(false);
  };

  const getRoleContent = () => {
    if (player.assignedRole === 'Imposter') {
      return (
        <View style={styles.roleContainer}>
          <Text style={[styles.roleText, styles.imposterText]}>
            You are the
          </Text>
          <Text style={[styles.roleText, styles.imposterText, styles.largeBold]}>
            IMPOSTER
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.roleContainer}>
          <Text style={styles.roleText}>Secret Word:</Text>
          <Text style={[styles.roleText, styles.wordText]}>{secretWord}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {!identityVisibilityStatus && (
        <BlurView intensity={100} style={styles.blurOverlay}>
          <Text style={styles.overlayText}>HIDDEN</Text>
        </BlurView>
      )}
      
      <Pressable
        style={styles.peekButton}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {identityVisibilityStatus ? (
          getRoleContent()
        ) : (
          <Text style={styles.instructionText}>HOLD TO PEEK</Text>
        )}
      </Pressable>

      {identityVisibilityStatus && (
        <Pressable style={styles.continueButton} onPress={onPeekComplete}>
          <Text style={styles.continueButtonText}>Continue →</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2238',
    justifyContent: 'center',
    alignItems: 'center',
  },
  peekButton: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  overlayText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    letterSpacing: 4,
  },
  roleContainer: {
    alignItems: 'center',
    padding: 40,
  },
  roleText: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 8,
  },
  wordText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 20,
  },
  imposterText: {
    color: '#FF6B6B',
  },
  largeBold: {
    fontSize: 56,
    fontWeight: 'bold',
    marginTop: 20,
  },
  instructionText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    letterSpacing: 2,
  },
  continueButton: {
    position: 'absolute',
    bottom: 60,
    backgroundColor: '#FFD700',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
  },
  continueButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A2238',
  },
});
