import { Text, TextProps } from '../Themed';

export function Title(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono',  }]} />;
}
