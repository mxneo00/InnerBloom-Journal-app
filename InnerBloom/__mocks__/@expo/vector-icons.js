const React = require('react');
const { View } = require('react-native');

const createIconMock = () => {
  return function MockIcon(props) {
    return React.createElement(View, { testID: props.name, ...props });
  };
};

module.exports = {
  Ionicons: createIconMock(),
  MaterialIcons: createIconMock(),
  FontAwesome: createIconMock(),
  Feather: createIconMock(),
  MaterialCommunityIcons: createIconMock(),
  AntDesign: createIconMock(),
  Entypo: createIconMock(),
};
