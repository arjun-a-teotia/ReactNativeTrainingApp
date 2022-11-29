import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  fullContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logoutBtnContainer: {
    width: '50%',
  },
  logoutText: {
    fontSize: 18,
    color: 'steelblue',
    alignSelf: 'center',
  },
});

export default styles;
