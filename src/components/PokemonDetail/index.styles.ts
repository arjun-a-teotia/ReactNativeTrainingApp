import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    padding: 8,
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingItem: {
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  lightText: {
    color: '#909ca8',
  },
  ratingText: {
    width: '50%',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  ratingHeader: {
    fontWeight: 'bold',
  },
  imgContainer: {
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,1,0.4)',
  },
  detailsContainer: {
    paddingHorizontal: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default styles;
