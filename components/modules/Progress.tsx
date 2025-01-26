// components/modules/Progress.tsx
import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProgressRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 16px;
  margin-bottom: 16px;
`;

const ProgressItem = styled.View`
  align-items: center;
`;

const ProgressCircle = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #4a90e2;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

interface ProgressTrackerProps {
  progress?: string;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress }) => {
  return (
    <ProgressRow>
      {[1, 2, 3].map((item) => (
        <ProgressItem key={item}>
          <ProgressCircle>
            <Icon
              name={item === 1 ? "star" : item === 2 ? "waves" : "computer"}
              size={24}
              color="white"
            />
          </ProgressCircle>
        </ProgressItem>
      ))}
    </ProgressRow>
  );
};