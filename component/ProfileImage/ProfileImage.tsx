import React, { useState, useMemo } from "react";
import { View, Text, Image, StyleSheet, ImageStyle, ViewStyle, TextStyle } from "react-native";

interface InitialsAvatarProps {
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  size?: number;
  textColor?: string;
  fontSize?: number;
  style?: ViewStyle;
  alt?: string; // not used in RN
}

const COLORS = [
  "#FF5733", "#33B5E5", "#AA66CC", "#99CC00",
  "#FFBB33", "#FF4444", "#0099CC", "#9933CC"
];

function getColorFromInitials(initials: string) {
  let hash = 0;
  for (let i = 0; i < initials.length; i++) {
    hash = initials.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % COLORS.length;
  return COLORS[index];
}

export const ProfileImage: React.FC<InitialsAvatarProps> = ({
  firstName = "",
  lastName = "",
  imageUrl,
  size = 40,
  textColor = "#fff",
  fontSize,
  style = {},
}) => {
  const [imageError, setImageError] = useState(false);

  const initials = `${firstName.trim()[0] || ""}${lastName.trim()[0] || ""}`.toUpperCase();
  const showFallback = !imageUrl || imageError;

  const backgroundColor = useMemo(
    () => getColorFromInitials(initials || "?"),
    [initials]
  );

  const containerStyle: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: showFallback ? backgroundColor : "transparent",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    ...style,
  };

  const textStyle: TextStyle = {
    color: textColor,
    fontSize: fontSize || size * 0.4,
    fontWeight: "bold",
    textTransform: "uppercase",
  };

  const imageStyle: ImageStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    resizeMode: "cover",
  };

  return (
    <View style={containerStyle}>
      {!showFallback ? (
        <Image
          source={{ uri: imageUrl }}
          style={imageStyle}
          onError={() => setImageError(true)}
        />
      ) : (
        <Text style={textStyle}>{initials || "?"}</Text>
      )}
    </View>
  );
};
