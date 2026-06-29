import { StyleSheet, Text, View } from 'react-native';

type AvatarProps = {
  name: string;
  color: string;
  size?: number;
  online?: boolean;
};

export function Avatar({ name, color, size = 48, online }: AvatarProps) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .slice(-2)
    .join('')
    .toUpperCase();

  return (
    <View style={{ width: size, height: size }}>
      <View
        style={[
          styles.circle,
          { width: size, height: size, borderRadius: size / 2, backgroundColor: color },
        ]}>
        <Text style={[styles.initials, { fontSize: size * 0.36 }]}>{initials}</Text>
      </View>
      {online && (
        <View
          style={[
            styles.badge,
            {
              width: size * 0.3,
              height: size * 0.3,
              borderRadius: size * 0.15,
              borderWidth: size * 0.045,
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: '#fff',
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    backgroundColor: '#2ECC71',
    borderColor: '#fff',
  },
});
